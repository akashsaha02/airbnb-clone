import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import PhotosWidget from "../components/PhotosWidget"
import AddressLink from "../components/AddressLink"

const SinglePlacePage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState({})

    useEffect(() => {
        if (id) {
            axios.get('/places/' + id).then(({ data }) => {
                setPlace(data)
            })
        }
        else return;
    }, [id])


    return (
        <div className="bg-gray-50 -mx-8 ">
            <div className="py-6 px-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold">{place.title}</h1>
                <AddressLink>{place.address}</AddressLink>
                <PhotosWidget place={place} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 my-6">
                    <div className="lg:col-span-2">
                        <div>
                            <h2 className="font-semibold text-2xl py-2">Description</h2>
                            <p className="text-sm">{place.description}</p>
                        </div>
                        <div>

                        </div>
                        <div className="border-2 border-black my-6 p-4 rounded-2xl">
                            <p className="">Check In: {place.checkIn}</p>
                            <p className="">Check Out: {place.checkOut}</p>
                            <p className="">Max Guests: {place.maxGuests}</p>
                        </div>

                    </div>
                    <div className="col-span-1 md:mt-12">
                        <BookingWidget place={place} />
                        <h2 className="font-semibold text-2xl py-2">Perks</h2>
                        <div className="grid grid-cols-2  gap-2">
                            {place.perks?.map((perk, index) => (

                                <div key={index} className='flex ite rounded-xl border-2 border-gray-400 p-4 mt-2'>
                                    <span>{perk}</span>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePlacePage
