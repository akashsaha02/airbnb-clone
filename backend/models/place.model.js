import mongoose from "mongoose";
import { Schema } from "mongoose";


const placeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photos: [{
        type: String,
        required: true,
    }]
    ,
    description: {
        type: String,
    },
    perks: [{
        type: String,
    }],
    extraInfo: {
        type: String,
    },
    checkIn: {
        type: String,
    },
    checkOut: {
        type: String,
    },
    maxGuests: {
        type: Number,
    },
    price: {
        type: Number,
    },
}, {
    timestamps: true
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
