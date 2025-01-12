import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeCards from "./components/HomeCards";
import ProductListings from "./components/ProductListings";
import ViewMoreProducts from "./components/ViewMoreProducts";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeCards />
      <ProductListings />
      <ViewMoreProducts />
    </>
  );
};

export default App;
