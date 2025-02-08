/* eslint-disable react/prop-types */

import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faLightStar } from "@fortawesome/free-regular-svg-icons";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRate }) => {
  const handleStarClick = (index) => {
    onRate(index + 1); // Stars are 1-indexed
  };

  return (
    <div className="text-lg flex space-x-1">
      {Array(5)
        .fill(0) // Fill an array with 5 empty elements
        .map((_, index) => (
          <FaStar
            key={index}
            icon={index < rating ? faSolidStar : faLightStar}
            onClick={() => handleStarClick(index)} // Set the new rating when clicked
            className={` text-9xl cursor-pointer  text-lg ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
    </div>
  );
};

export default StarRating;
