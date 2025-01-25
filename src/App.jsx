import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MoviePage from "./pages/MoviePage";
import TvSeriesPage from "./pages/TvSeriesPage";
import WatchList from "./pages/WatchListPage";
import { WatchListProvider } from "./components/WatchListProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/Movies" element={<MoviePage />} />
      <Route path="/TV Shows" element={<TvSeriesPage />} />
      <Route path="/WatchList" element={<WatchList />} />
    </Route>
  )
);

const App = () => {
  return (
    <WatchListProvider>
      <RouterProvider router={router} />
    </WatchListProvider>
  );
};

export default App;
