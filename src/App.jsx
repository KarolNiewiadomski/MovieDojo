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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/Movies" element={<MoviePage />} />
      <Route path="/TV Shows" element={<TvSeriesPage />} />
      {/* <Route index element={<WishList />} /> */}
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
