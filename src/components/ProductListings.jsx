import { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import LoadMore from "./LoadMore";
import { API_KEY } from "../api/constant";
import { API_URL } from "../api/constant";

const ProductListings = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(`${API_URL}/3/trending/all/week?language=en-US`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movies. Please try again later.");
      });
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const visibleMovies = movies.slice(0, visibleCount);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Currently Trending
        </h2>

        {movies.length === 0 ? (
          <div className="text-center text-gray-600">Loading movies...</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {visibleMovies.map((movie) => (
              <ProductListing key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        {visibleCount < movies.length && <LoadMore handleClick={loadMore} />}
      </div>
    </div>
  );
};

export default ProductListings;
