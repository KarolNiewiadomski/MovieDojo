import Hero from "./components/Hero";
import HomeCards from "../components/HomeCards";
import ProductListings from "../components/ProductListings";
import LoadMoreProducts from "../components/LoadMoreProducts";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <ProductListings />
      <LoadMoreProducts />
    </>
  );
};

export default HomePage;
