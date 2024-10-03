import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';


const PlacesPage = () => {

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + ' ...';
        }
        return text;
    };
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)

        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center max-w-lg  mx-auto mt-8" >
                <Link
                    to={'/account/places/new'}
                    className="bg-red-500 flex items-center justify-center border-2 border-gray-400  gap-1 p-4 text-white px-6 py-2 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new Place
                </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto'>
                {places.length > 0 && places.map((place) => (
                    <Link to={"/account/places/" + place._id} key={place._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-6 w-full sm:w-auto overflow-hidden">
                    <PlaceImg place={place} />

                        <div className="p-5">
                            <h5 className="mb-2 text-xl font-bold tracking-tight">{place.title}</h5>
                            <p className="mb-3 font-sm text-gray-700">{truncateText(place.description, 5)}</p>
                            <Link to={"/account/places/" + place._id} className="px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 ">
                                $ {place.price}
                            </Link>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default PlacesPage