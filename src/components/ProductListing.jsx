/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { useWatchList } from "./UseWatchList";
import { useState, useEffect } from "react";

const ProductListing = ({ movie }) => {
  const { addToWatchList } = useWatchList();
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // Check if the user is signed in by looking for a user in localStorage
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user");
      setIsUserSignedIn(!!user); // Set to true if user exists in localStorage
    };
    checkUser();
    window.addEventListener("storage", checkUser); // Listen for changes to localStorage
    return () => window.removeEventListener("storage", checkUser); // Clean up
  }, []);

  const handleAddToWatchList = () => {
    if (!isUserSignedIn) {
      // Removed the alert
      console.log("You must sign in to add movies to your watchlist.");
    } else {
      addToWatchList(movie);
      // Removed the alert
      console.log("Movie added to your watchlist!");
    }
  };

  const renderButton = () => {
    return (
      <button
        className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
          isUserSignedIn
            ? "bg-indigo-600 hover:bg-indigo-500"
            : "bg-gray-600 cursor-not-allowed opacity-50"
        }`}
        onClick={handleAddToWatchList}
        disabled={!isUserSignedIn} // Disable the button if not signed in
      >
        {isUserSignedIn ? "Add to WatchList" : "Sign in to Add to WatchList"}
      </button>
    );
  };

  if (!movie) {
    return <div className="text-white">Movie data is unavailable.</div>;
  }

  return (
    <div className="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {/* Movie Image and Overview */}
      <div className="relative">
        {movie.poster_path ? (
          <img
            alt={movie.title || movie.name || "Movie Poster"}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="aspect-square w-full object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
        ) : (
          <div className="aspect-square w-full bg-gray-600 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <p className="text-sm text-white">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-lg font-bold text-white">
          {movie.title || movie.name || "Untitled"}
        </h3>
        <div className="flex items-center justify-between mt-3 mt-auto">
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
