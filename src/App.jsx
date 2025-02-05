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
import { Helmet } from "react-helmet";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/movies" element={<MoviePage />} />
      <Route path="/tv-shows" element={<TvSeriesPage />} />
      <Route path="/watchlist" element={<WatchList />} />
    </Route>
  )
);

const App = () => {
  return (
    <WatchListProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movie Dojo</title>
        <link rel="Movie Dojo" href="https://movie-dojo.netlify.app/" />
        <meta name="Movie Dojo" content="Final Project" />
      </Helmet>
      <RouterProvider router={router} />
    </WatchListProvider>
  );
};

export default App;
