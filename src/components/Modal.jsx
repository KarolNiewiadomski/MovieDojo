/* eslint-disable react/prop-types */
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

export default function Modal({ closeModal, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = (password) => { // Checks for special signs in passowrd (required)
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/; 
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => { // Checks if email contins @
    return email.includes("@");
  };

  const handleSignIn = (e) => { // Handles sign in
    e.preventDefault(); 

    if (!validateEmail(email)) { //message in emails doesn't contain @
      setErrorMessage("Email must contain an '@' symbol.");
      return;
    }

    if (!validatePassword(password)) {  //check for 8 letter password
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one special character."
      );
      return;
    }

    // Clears error message
    setErrorMessage("");

    // Saves user data to local storage
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Signed in successfully!");
    if (onSignIn) {
      onSignIn(email); // Pass the email inital back to the Navbar
    }
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={closeModal} // Modal closes when clicking away
    >
      <div
        className="flex min-h-64 flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg shadow-lg sm:max-w-sm sm:w-full"
        onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing the modal
      >
        <div className="relative sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={closeModal}
            className="absolute right-0 text-black hover:text-black"
          >
            <FaXmark />
          </button>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errorMessage && (
            <div className="mb-4 text-sm text-red-600">{errorMessage}</div>
          )}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long and contain at
                  least one special character.
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
