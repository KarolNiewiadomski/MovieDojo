import { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import LoadMore from "./LoadMore";
import { API_KEY } from "../api/constant";
import { API_URL } from "../api/constant";

const ProductListings = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [error, setError] = useState(null);

  // Fetch trending movies when the component mounts
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    // Fetch trending movies from the API
    fetch(`${API_URL}/3/trending/all/week?language=en-US`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []); // Store the movie list in state
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movies. Please try again later."); // Handle fetch error
      });
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to load more movies by 8 onclick
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  // Get movies that should be displayed
  const visibleMovies = movies.slice(0, visibleCount);

  // Display error message if an error occurs
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Currently Trending
        </h2>

        {/* Show loading message if movies are not yet available */}
        {movies.length === 0 ? (
          <div className="text-center text-gray-600">Loading movies...</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {visibleMovies.map((movie) => (
              <ProductListing key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        {/* Show Load More button if there are more movies to display */}
        {visibleCount < movies.length && <LoadMore handleClick={loadMore} />}
      </div>
    </div>
  );
};

export default ProductListings;
