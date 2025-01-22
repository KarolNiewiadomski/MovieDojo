/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import LoadMore from "./LoadMore";
import { API_KEY, API_URL } from "../api/Constant";
import WatchList from "./WatchList"; // Import the WatchList component

const TvSeriesListings = () => {
  const [TvSeries, setTvSeries] = useState([]);
  const [TopRatedTvSeries, setTopRatedTvSeries] = useState([]);
  const [RecommendedTvSeries, setRecommendedTvSeries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [error, setError] = useState(null);
  const [watchList, setWatchList] = useState([]); // State to store the watch list

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const fetchTvSeries = async (url, setState) => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setState(data.results || []);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load TvSeries. Please try again later.");
      }
    };

    fetchTvSeries(`${API_URL}3/trending/tv/day?language=en-US`, setTvSeries);
    fetchTvSeries(
      `${API_URL}3/tv/top_rated?language=en-US&page=1`,
      setTopRatedTvSeries
    );
    fetchTvSeries(
      `${API_URL}3/tv/1/recommendations?language=en-US&page=1`,
      setRecommendedTvSeries
    );
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  const handleAddToWatchList = (tvSeries) => {
    setWatchList((prevList) => [...prevList, tvSeries]); // Add selected TV series to the watch list
  };

  const SeriesGrid = ({ title, TvSeries }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {TvSeries.length === 0 ? (
        <div className="text-center text-gray-600">Loading TvSeries...</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {TvSeries.slice(0, visibleCount).map((movie) => (
            <ProductListing
              key={movie.id}
              movie={movie}
              onAddToWatchList={handleAddToWatchList} // Pass the function to add to watch list
            />
          ))}
        </div>
      )}
      {visibleCount < TvSeries.length && <LoadMore handleClick={loadMore} />}
    </div>
  );

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white">
      {[TvSeries, TopRatedTvSeries, RecommendedTvSeries].map(
        (seriesSet, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <SeriesGrid
              title={
                index === 0
                  ? "Trending TV Series"
                  : index === 1
                  ? "Top Rated TV Series"
                  : "Recommended TV Series"
              }
              TvSeries={seriesSet}
            />
          </div>
        )
      )}
      {/* Add a watch list section */}
      <WatchList watchList={watchList} />
    </div>
  );
};

export default TvSeriesListings;
