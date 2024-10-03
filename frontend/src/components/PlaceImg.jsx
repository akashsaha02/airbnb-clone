const PlaceImg = ({ place, index = 0, className }) => {
    if (!place.photos?.length) {
        return "";
    }
    className += 'w-full object-cover aspect-w-16 aspect-h-9 shadow shadow-gray-300';

    return (
        // <img className={className} src={'http://localhost:3000/uploads/' + place.photos[index]} alt="" />
        <img className={className} src={place.photos[index]} alt="" />
    );
};

export default PlaceImg;
