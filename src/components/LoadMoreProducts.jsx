// eslint-disable-next-line react/prop-types
const LoadMoreProducts = ({ onClick }) => {
  return (
    <section className="m-auto max-w-lg my-8 px-44">
      <button
        onClick={onClick}
        className="block bg-black text-white text-center py-4 rounded-xl hover:bg-gray-700 px-6"
      >
        Load More
      </button>
    </section>
  );
};

export default LoadMoreProducts;
