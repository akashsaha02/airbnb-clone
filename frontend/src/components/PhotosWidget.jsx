import { useState } from 'react'
const PhotosWidget = ({ place }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white text-black">
                <div className="p-8 bg-white max-w-7xl mx-auto">

                    <h2 className="text-2xl">Photos of <span className="font-semibold">{place.title}</span></h2>
                    <a className="font-semibold underline block my-2 mb-4" target="_blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
                    <button
                        className="flex gap-1 items-center px-4 py-2 font-semibold rounded-full text-sm bg-white text-black shadow-sm shadow-gray-700 fixed top-10 right-10"
                        onClick={() => setShowAllPhotos(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                        Close
                    </button>

                    <div className="grid gap-4">
                        {place.photos?.length > 0 && place.photos.map((photo, index) => (
                            // <img key={index} className="w-full h-full object-cover rounded-xl shadow shadow-gray-300" src={'http://localhost:3000/uploads/' + photo} alt="" />
                            <img key={index} className="w-full h-full object-cover rounded-xl shadow shadow-gray-300" src={photo} alt="" />
                        ))}
                    </div>

                </div>

            </div>
        )
    }
    return (
        <div className="relative grid grid-1 sm:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr] gap-2 rounded-2xl overflow-hidden">
            {place.photos?.[0] && (
                <div>
                    {/* <img onClick={() => setShowAllPhotos(true)} className=" w-full object-cover aspect-square" src={'http://localhost:3000/uploads/' + place.photos[0]} alt="" /> */}
                    <img onClick={() => setShowAllPhotos(true)} className="w-full object-cover aspect-square h-full" src={place.photos[0]} alt="" />
                </div>
            )}

            <div className=" hidden sm:grid gap-2">
                {place.photos?.[1] && (
                    <div>
                        <img onClick={() => setShowAllPhotos(true)} className="w-full object-cover aspect-square" src={place.photos[1]} alt="" />
                    </div>
                )}
                {place.photos?.[2] && (
                    <div>
                        <img onClick={() => setShowAllPhotos(true)} className="w-full object-cover aspect-square " src={place.photos[2]} alt="" />
                    </div>
                )}

            </div>
            <div className=" hidden lg:grid gap-2 overflow-hidden">
                {place.photos?.[3] && (
                    <div>
                        <img onClick={() => setShowAllPhotos(true)} className="w-full object-cover aspect-square" src={place.photos[3]} alt="" />
                    </div>
                )}
                {place.photos?.[4] && (
                    <div>
                        <img onClick={() => setShowAllPhotos(true)} className="w-full object-cover aspect-square" src={place.photos[4]} alt="" />
                    </div>
                )}
            </div>
            <button
                className="absolute flex gap-1 items-center px-4 py-2 font-semibold rounded-lg text-sm bg-white shadow-sm shadow-gray-700  bottom-2 right-2"
                onClick={() => setShowAllPhotos(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                </svg>

                More Photos
            </button>
        </div>
    )
}

export default PhotosWidget
