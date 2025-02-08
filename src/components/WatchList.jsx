import { useWatchList } from "./UseWatchList";
import { useState } from "react";
import StarRating from "./StarRating";

// Remove from watchlist
const WatchList = () => {
  const { watchList, removeFromWatchList: removeFromWatchListFromHook } =
    useWatchList();

  // Setting order to the list with rating
  const [orderedList, setOrderedList] = useState(
    watchList.map((movie) => ({ ...movie, rating: 0 }))
  );

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  //Start of allowing the items to be dragged
  const handleDragStart = (index, event) => {
    setDraggedItemIndex(index);
    event.dataTransfer.effectAllowed = "move";
  };

  //Rearranges items while dragging
  const handleDragOver = (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedList = [...orderedList];
    const draggedItem = updatedList[draggedItemIndex];
    updatedList.splice(draggedItemIndex, 1); // Remove dragged item
    updatedList.splice(index, 0, draggedItem); // Insert at new index

    setDraggedItemIndex(index);
    setOrderedList(updatedList);
  };

  // Resets dragged item index after dropping
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  // Enables rating of movies inside of watchlist
  const handleRateMovie = (id, rating) => {
    setOrderedList((prevList) =>
      prevList.map((movie) => (movie.id === id ? { ...movie, rating } : movie))
    );
  };

  // Responsible for selecting the correct movie to be romved
  const confirmRemoveFromWatchList = (id) => {
    setSelectedMovieId(id);
    setIsModalOpen(true);
  };

  // Removes a movie from the watchlist
  const removeFromWatchList = () => {
    setOrderedList((prevList) =>
      prevList.filter((movie) => movie.id !== selectedMovieId)
    );
    removeFromWatchListFromHook(selectedMovieId);
    setIsModalOpen(false);
    setSelectedMovieId(null);
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Your Watchlist
        </h2>

        {/* Display message if watchlist is empty */}
        {orderedList.length === 0 ? (
          <p className="text-center text-gray-500">Your Watchlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {orderedList
              .filter((movie) => movie && (movie.title || movie.name))
              .map((movie, index) => (
                <div
                  key={movie.id}
                  draggable
                  onDragStart={(e) => handleDragStart(index, e)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleDragOver(index, e);
                  }}
                  onDragEnd={handleDragEnd}
                  className={`rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 gap-y-4 max-lg:max-w-lg max-lg:mx-auto transition-all duration-300 ${
                    draggedItemIndex === index
                      ? "opacity-100 shadow-xl z-20 transform scale-110 border-4 border-blue-500"
                      : "hover:cursor-grab"
                  }`}
                  style={{
                    transform:
                      draggedItemIndex === index ? "scale(1.1)" : "none",
                    zIndex: draggedItemIndex === index ? 20 : 1,
                  }}
                >
                  {/* Drag handle icon */}
                  <div className="col-span-12 lg:col-span-1 flex items-center justify-center">
                    <div
                      className="drag-handle hover:cursor-grab"
                      title="Drag to reorder"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-400 hover:text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 9h.01M12 9h.01M16 9h.01M8 15h.01M12 15h.01M16 15h.01"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Movie Poster */}
                  <div className="col-span-12 lg:col-span-2 img box">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
                    />
                  </div>

                  {/* Movie Details and Rating */}
                  <div className="col-span-12 lg:col-span-9 detail w-full lg:pl-3">
                    <div className="flex items-center justify-between w-full mb-4">
                      <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                        {movie.title || movie.name}
                      </h5>

                      {/* Remove movie button */}
                      <button
                        className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                        onClick={() => confirmRemoveFromWatchList(movie.id)}
                      >
                        {/* Trash Icon */}
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                            cx="17"
                            cy="17"
                            r="17"
                          />
                          <path
                            className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                            stroke="#EF4444"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-700 mb-4">{movie.overview}</p>
                    <StarRating
                      className="text-lg"
                      rating={movie.rating}
                      onRate={(newRating) =>
                        handleRateMovie(movie.id, newRating)
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Modal for movie removal  */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={removeFromWatchList}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WatchList;
