import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
    const [places, setPlaces] = useState([]);
    
    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-full mx-auto'>
                {places.length > 0 && places.map((place) => (
                    <Link to={"/place/" + place._id} key={place._id} className="max-w-sm mt-6 w-full sm:w-auto">
                        <div>
                            <img className="rounded-xl w-full object-cover aspect-square" src={place.photos[0]} alt="" />
                        </div>
                        <div className='px-2 pt-2'>
                            <h3 className='font-bold truncate'>{place.address}</h3>
                            <h2 className='text-sm text-gray-600 my-1'>{place.title}</h2>
                            <div className=''>
                                <span className='font-bold'>${place.price}</span> per night
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default IndexPage;