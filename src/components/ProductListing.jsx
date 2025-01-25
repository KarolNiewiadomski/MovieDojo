/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

const ProductListing = ({ movie, onAddToWatchList }) => {
  return (
    <div className="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          alt={movie.title || movie.name}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="aspect-square w-full object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <p className="text-sm text-white">{movie.overview}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">
          {movie.title || movie.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-yellow-400">
            <FaStar className="inline text-lg mb-1 mr-2" />
            {movie.vote_average.toFixed(1)}
          </span>
          {/* Add to WatchList button */}
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            onClick={() => onAddToWatchList(movie)} // Trigger the add to watch list action
          >
            Add to WatchList
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
