import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 text-8xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page dose not exist</p>
      <Link
        to="/"
        className="text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage;
