import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import PhotosWidget from '../components/PhotosWidget'
import AddressLink from '../components/AddressLink'
import { format, differenceInCalendarDays } from 'date-fns'

const SingleBookingPage = () => {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  useEffect(() => {
    if (id) {
      axios.get(`/bookings`).then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id)
        if (foundBooking) setBooking(foundBooking)
      })
    }
  }, [id])

  if (!booking) return ""



  return (
    <div className='max-w-7xl mx-auto mb-8'>
      <h1 className="text-3xl font-bold">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 mb-4 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold pb-2">Booking Details</h2>
          <div className='py-2 flex gap-4 items-center font-semibold'>
            <div className="flex gap-2 items-center text-gray-800 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>


              {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
            </div>
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
        </div>
        <div className='bg-red-500 p-6 text-white rounded-2xl'>
          <div>Total Price</div>
          <div className='text-3xl'>${booking.price}</div>
        </div>

      </div>
      <PhotosWidget place={booking.place} />
    </div>
  )
}

export default SingleBookingPage