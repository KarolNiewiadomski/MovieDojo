/* eslint-disable react/prop-types */

const LoadMore = ({ handleClick }) => {
  return (
    <section className="m-auto max-w-lg my-8 px-44">
      <button
        onClick={handleClick}
        className="block bg-gray-800 text-white text-center py-4 rounded-xl hover:bg-gray-900 px-6"
      >
        Load More
      </button>
    </section>
  );
};
export default LoadMore;
