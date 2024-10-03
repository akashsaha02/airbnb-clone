import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import Place from './models/place.model.js';
import Booking from './models/booking.model.js';
import cloudinary from 'cloudinary';
import { get } from 'http';
// Load environment variables from a .env file into process.env
dotenv.config();

const app = express();

// Set up bcrypt for password hashing
const bcryptSalt = bcrypt.genSaltSync(10);

// Parse JSON bodies for this app. This is a built-in middleware function in Express.
app.use(cookieParser());
app.use(express.json());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

// Allow cross-origin requests
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Configure Cloudinary with your credentials
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);




function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

app.get('/test', (req, res) => {
    res.json('Hello World!');
});

// Register User
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
});

// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Find the user with the given email
    const userDoc = await User.findOne({ email });
    // If the user exists and the password is correct
    if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
        jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie('token', token).json({ success: true, name: userDoc.name, email: userDoc.email, id: userDoc._id });
            }
        });
    } else {
        res.json({ success: false });
    }
});

// Get user profile
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        // Verify the token and get the user
        jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
            if (err) {
                res.json({ success: false, message: 'Invalid token' });
            } else {
                const { name, email, _id } = await User.findById(userData.id);
                res.json({ success: true, name, email, _id });
            }
        });
    } else {
        res.json({ success: false });
    }
});

// Logout user
app.post('/logout', (req, res) => {
    res.clearCookie('token').json({ success: true });
});

// --------------- Upload Photo --------------------

// upload by link
app.post('/upload-by-link', async (req, res) => {
    // Get the image link from the request body
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';      // Generate a unique name for the image
    const destPath = path.join(uploadsDir, newName);    // Path to save the image

    // try {
    //     await imageDownloader.image({
    //         url: link,
    //         dest: destPath
    //     });
    //     res.json(newName);
    // } catch (error) {
    //     console.error('Image download failed:', error);
    //     res.status(500).json({ success: false, message: 'Image download failed', error: error.message });
    // }

    try {
        // Download the image
        await imageDownloader.image({
            url: link,
            dest: destPath
        });

        // Upload the image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(destPath, {
            folder: 'uploads'
        });

        // Delete the local file after upload
        fs.unlinkSync(destPath);

        // Return the Cloudinary URL
        res.json(result.secure_url);
    } catch (error) {
        console.error('Image download or upload failed:', error);
        res.status(500).json({ success: false, message: 'Image download or upload failed', error: error.message });
    }
});

const photosMiddleware = multer({ dest: 'uploads' });

// upload by file

// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const { path, originalname } = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path + '.' + ext;
//         fs.renameSync(path, newPath)
//         uploadedFiles.push(newPath.replace('uploads\\', ''));
//     }
//     res.json(uploadedFiles);
// });

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path } = req.files[i];
        try {
            const result = await cloudinary.v2.uploader.upload(path, {
                folder: 'uploads'
            });
            uploadedFiles.push(result.secure_url);
            // Optionally, delete the local file after upload
            fs.unlinkSync(path);
        } catch (error) {
            console.error('Cloudinary upload failed:', error);
            res.status(500).json({ success: false, message: 'Cloudinary upload failed', error: error.message });
            return;
        }
    }
    res.json(uploadedFiles);
});

// --------------- Places --------------------

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
        if (err) console.log(err);
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests, price
        });
        res.json(placeDoc);
    })
});

app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
        if (err) console.log(err);
        const places = await Place.find({ owner: userData.id });
        res.json(places);
    })
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.json(place);
});

app.put('/places/:id', async (req, res) => {
    const { id } = req.params;
    const { title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    const placeDoc = await Place.findByIdAndUpdate(id, {
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    });
    res.json(placeDoc);
});

app.get('/places', async (req, res) => {
    const places = await Place.find()
    res.json(places);
});

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phoneNumber, price } = req.body;
    const bookingDoc = await Booking.create({
        place,
        user: userData.id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone: phoneNumber,
        price
    })
    res.json(bookingDoc)
});



app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({ user: userData.id.toString() }).populate('place'));
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// mongodb+srv://akashsaha:akashsaha1313@cluster0.7twfqyh.mongodb.net/