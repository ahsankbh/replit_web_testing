// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import logo from "../assets/images/logo.png"; // Replace with your logo file name

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(
      !validateEmail(e.target.value) ||
        (e.target.value.trim() === "" && e.target.value !== ""),
    );
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform additional validation or API calls here if needed
    if (validateEmail(email)) {
      console.log("Form submitted successfully");
      // Reset errors
      setEmailError(false);
    } else {
      console.log("Please correct the errors in the form.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                name="email"
                required
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  emailError ? "border-red-500" : ""
                }`}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email.
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 00.586.829l5 5a1 1 0 001.414 0l5-5a1 1 0 00-.586-.829V7a1 1 0 10-2 0v2a1 1 0 001 1h-6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
