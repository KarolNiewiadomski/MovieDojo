import { useContext } from "react";
import { WatchListContext } from "./WatchListContext";

export const useWatchList = () => useContext(WatchListContext);
