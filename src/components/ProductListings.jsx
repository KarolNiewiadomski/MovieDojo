import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
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
          Popular Movies & TV Shows
        </h2>

        <div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {visibleMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
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
                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                      Add to WatchList
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < movies.length && <LoadMore handleClick={loadMore} />}
        </div>
      </div>
    </div>
  );
};

export default ProductListings;
