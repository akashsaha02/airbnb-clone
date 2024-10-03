import { Navigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Perks from '../components/Perks';
import axios from 'axios';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';

const PlacesFormPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false)

    useEffect(() => {
        if (id) {
            axios.get('/places/' + id).then(({ data }) => {
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setPrice(data.price)
            })
        } else return;
    }, [id])

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-2'>{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }
    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }
    async function addNewPlace(e) {
        e.preventDefault()
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        }
        if (id) {
            await axios.put('/places/' + id, placeData)
            setRedirectToPlacesList(true)
        }
        else {
            await axios.post('/places', placeData)
            setRedirectToPlacesList(true)
        }
    }
    if (redirectToPlacesList) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div className="max-w-6xl mx-auto">
            <AccountNav />
            <form className="flex flex-col gap-2 mt-6" >
                {/* Title Box */}
                <div>
                    {preInput('Title', 'Title for your place. Should be catchy as in an advertisement')}
                    <input type="text" placeholder="Title i.e, My Lovely Appertment" className="border-2 border-gray-400 p-2 rounded-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {/* Address Box */}
                <div>
                    {preInput('Address', 'Address to this place')}
                    <input type="text" placeholder="Address i.e, 221B Baker Street" className="border-2 border-gray-400 p-2 rounded-lg"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                {/* Photos Box */}
                <div>
                    {preInput('Photos', 'More = Better')}
                    {/* URL Add photo button */}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                </div>
                {/* Description Box */}
                <div>
                    {preInput('Description', 'Description of this place')}
                    <textarea className='border-gray-400'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {/* Perk Box */}
                <div>
                    {preInput('Perks', 'Select all the perks of your place')}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                </div>
                {/* Extra Info Box */}
                <div>
                    {preInput('Extra Information', 'House rules, etc')}
                    <textarea className='border-gray-400'
                        value={extraInfo}
                        onChange={(e) => setExtraInfo(e.target.value)}
                    />
                </div>
                {/* Check in & out times */}
                <div>
                    {preInput('Check in & out times', 'Add check in and out times. Remember to have some time time window for cleaning the room between guests.')}
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2'>
                        <div className='mt-2'>
                            <h3>Check In time</h3>
                            <input type="text" className='border-gray-400' placeholder='14:00'
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <h3>Check Out time</h3>
                            <input type="text" className='border-gray-400' placeholder='12:00'
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <h3>Max Guest</h3>
                            <input type="number" className='border-gray-400' placeholder='4'
                                value={maxGuests}
                                onChange={(e) => setMaxGuests(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <h3>Price</h3>
                            <input type="number" className='border-gray-400' placeholder='4'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* TODO:Add Price for rent */}

                {/* Add Place button */}
                <button className="primary" onClick={addNewPlace}>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage
