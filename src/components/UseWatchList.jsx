import { useContext } from "react";
import { WatchListContext } from "./WatchListContext";

//Access to watchlist global state
export const useWatchList = () => useContext(WatchListContext);
