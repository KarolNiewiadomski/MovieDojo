import React, { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import LoadMore from "./LoadMore";

const ProductListings = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDk5MjViODM5YzY1NWFmNjdkYmM4M2E5ZWRlM2E4ZSIsIm5iZiI6MTczNzExNzc2Mi41MTcsInN1YiI6IjY3OGE1MDQyZGJmZTUwYWEzZDFkMjBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._oWQGe8RqlAQgmjgi3l29XECs82HURcf8trR5Hoauq4`,
    },
  };

  useEffect(() => {
    fetch("//api.themoviedb.org/3/trending/all/week?language=en-US", options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const visibleMovies = movies.slice(0, visibleCount);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Currently Trending
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {visibleMovies.map((movie) => (
            <ProductListing key={movie.id} movie={movie} />
          ))}
        </div>
        {visibleCount < movies.length && <LoadMore handleClick={loadMore} />}
      </div>
    </div>
  );
};

export default ProductListings;
