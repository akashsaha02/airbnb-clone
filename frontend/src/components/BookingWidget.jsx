import { useContext, useEffect, useState } from "react"
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import axios from "axios"
import { Navigate } from "react-router"
import { UserContext } from './../UserContext';

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0])
    const [checkOut, setCheckOut] = useState(new Date().toISOString().split('T')[0])

    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [redirect, setRedirect] = useState('')

    const {user}=useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0
    let price = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(checkOut, checkIn)
        price = numberOfNights * place.price
    }

    async function bookThisPlace() {
        const bookingData = {
            place: place._id,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phoneNumber,
            price
        }

        const response = await axios.post('/bookings', bookingData)
        console.log(response);
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white py-4 px-6 rounded-2xl shadow-lg">
            <h2 className="text-md">
                <span className="text-2xl font-bold">${place.price}</span> night
            </h2>
            <div className="grid grid-cols-2 border-2 border-gray-300 rounded-lg my-2">
                <div className="border-r-2 border-gray-300 px-4 py-2">
                    <span className="text-sm font-semibold block">CHECK-IN</span>
                    <input type="date" name="" id=""
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>
                <div className="px-4 py-2">
                    <span className="text-sm font-semibold block">CHECK-OUT</span>
                    <input type="date" name="" id=""
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>
                <div className="col-span-2 border-t-2 border-gray-300 px-4 py-2">
                    <span className="text-sm font-semibold block">GUESTS</span>
                    <input type="number" name="" id=""
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                    />
                </div>
                {
                    numberOfNights > 0 && (
                        <div className="col-span-2">
                            <div className="border-t-2 border-gray-300 px-4 py-2">
                                <span className="text-sm font-semibold block">NAME</span>
                                <input type="text" name="" id=""
                                    value={name}
                                    placeholder="Enter your name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="border-t-2 border-gray-300 px-4 py-2">
                                <span className="text-sm font-semibold block">Phone Number</span>
                                <input type="tel" name="" id=""
                                    value={phoneNumber}
                                    placeholder="Enter your phone number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                    )
                }

            </div>
            <button className="primary text-lg "
                onClick={bookThisPlace}
            >
                Book Now
                {numberOfNights > 0 && <span className="font-semibold px-2"
                >${price}</span>}
            </button>
        </div>

    )
}

export default BookingWidget
