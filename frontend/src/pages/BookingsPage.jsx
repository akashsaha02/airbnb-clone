import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from "axios"
import PlaceImg from "../components/PlaceImg"
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from "react-router-dom"

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, []);




    return (
        <div className="">
            <div>
                <AccountNav />

                <div className="text-center max-w-lg mx-auto mt-8">
                    <h1 className="text-3xl font-bold">Bookings</h1>
                </div>
                <div className="">
                    {bookings?.length > 0 ? bookings.map((booking) => (
                        <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex gap-4 bg-gray-100 rounded-xl overflow-hidden mt-4 items-center">
                            <div className="w-96">
                                <PlaceImg place={booking.place} index={1} className={"rounded-none aspect-w-16 aspect-h-9 shadow shadow-gray-300"} />
                            </div>
                            <div className="p-3 grow mr-3">
                                <h2 className="text-2xl font-semibold pb-2">{booking.place.title} </h2>

                                {/* Check In & Check Out Dates */}
                                <div className='py-2 flex gap-4 items-center font-semibold text-gray-800'>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>

                                        <div>
                                            {format(new Date(booking.checkIn), 'dd MMM yyyy')}
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>

                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>

                                        <div>
                                            {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center text-gray-800 font-semibold mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>


                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                                </div>
                                <div className="flex items-center mt-2 gap-2 text-xl font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>

                                    Total Price: ${booking.price}
                                </div>
                            </div>


                        </Link>
                    )
                    ) : (<p className="text-center mt-6">No bookings yet</p>)}
                </div>
            </div>
        </div>
    )
}

export default BookingsPage
