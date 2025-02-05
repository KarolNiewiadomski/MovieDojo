/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { useWatchList } from "./UseWatchList";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductListing = ({ movie }) => {
  const { addToWatchList } = useWatchList();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToWatchList = () => {
    addToWatchList(movie);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const renderButton = () => (
    <motion.button
      className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
      onClick={handleAddToWatchList}
      animate={{
        backgroundColor: isAnimating ? "#22c55e" : "#4f46e5",
      }}
      transition={{ duration: 1 }}
    >
      Add to WatchList
    </motion.button>
  );

  if (!movie) {
    return <div className="text-white">Movie data is unavailable.</div>;
  }

  return (
    <div
      className="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col lg:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Image and Overview */}
      <div className="relative overflow-hidden h-full">
        {movie.poster_path ? (
          <img
            alt={movie.title || movie.name || "Movie Poster"}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}

        {/* Animated Overview */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 bg-black bg-opacity-80 text-white p-4 text-sm"
        >
          <p>{movie.overview || "No description available."}</p>
        </motion.div>
      </div>

      {/* Movie Info */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-base font-bold text-white">
          {movie.title || movie.name || "Untitled"}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-2.5">
          <span className="text-sm font-medium text-yellow-400">
            <FaStar className="inline text-lg mb-1 mr-2" />
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
          {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
