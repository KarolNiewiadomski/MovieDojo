/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import LoadMore from "./LoadMore";
import { API_KEY, API_URL } from "../api/constant";

const TvSeriesListing = () => {
  const [TvSeries, setTvSeries] = useState([]);
  const [TopRatedTvSeries, setTopRatedTvSeries] = useState([]);
  const [RecommendedTvSeries, setRecommendedTvSeries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [error, setError] = useState(null);

  // Fetch TV series data when component mounts
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    // Fetchs data from API and update state
    const fetchTvSeries = async (url, setState) => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setState(data.results || []); // Update state with fetched results
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load TvSeries. Please try again later.");
      }
    };

    // Fetch different categories of TV series
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

  // load more items function (add 8 more items on each click)
  const loadMore = () => setVisibleCount((prev) => prev + 8);

  // Component for displaying TV series in a grid format
  const SeriesGrid = ({ name, TvSeries }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {name}
      </h2>
      {TvSeries.length === 0 ? (
        <div className="text-center text-gray-600">Loading TvSeries...</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {TvSeries.slice(0, visibleCount).map((movie) => (
            <ProductListing key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {/* Show 'Load More' button if there are more items to display */}
      {visibleCount < TvSeries.length && <LoadMore handleClick={loadMore} />}
    </div>
  );

  // Display error message if fetching fails
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white">
      {/* Loop through different TV series categories and render them */}
      {[TvSeries, TopRatedTvSeries, RecommendedTvSeries].map(
        (seriesSet, id) => (
          <div key={id} className={id % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <SeriesGrid
              name={
                id === 0
                  ? "Trending TV Series"
                  : id === 1
                  ? "Top Rated TV Series"
                  : "Recommended TV Series"
              }
              TvSeries={seriesSet}
            />
          </div>
        )
      )}
    </div>
  );
};

export default TvSeriesListing;
