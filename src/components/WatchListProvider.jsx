/* eslint-disable react/prop-types */

import { useState } from "react";
import { WatchListContext } from "./WatchListContext";

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (item) => {
    setWatchList((prevList) => {
      if (prevList.some((movie) => movie.id === item.id)) return prevList;
      return [...prevList, item];
    });
  };

  const removeFromWatchList = (itemId) => {
    setWatchList((prevList) => prevList.filter((movie) => movie.id !== itemId));
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
