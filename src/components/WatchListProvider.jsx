/* eslint-disable react/prop-types */

// Enables global watchlist state
import { useState } from "react";
import { WatchListContext } from "./WatchListContext";

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  // Function to add a movie to the watchlist
  const addToWatchList = (item) => {
    setWatchList((prevList) => {
      if (prevList.some((movie) => movie.id === item.id)) return prevList;
      return [...prevList, item];
    });
  };

  // Function to remove a movie from the watchlist
  const removeFromWatchList = (itemId) => {
    setWatchList((prevList) => prevList.filter((movie) => movie.id !== itemId));
  };

  return (
    // Provides the watchlist state and functions to the entire application
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
