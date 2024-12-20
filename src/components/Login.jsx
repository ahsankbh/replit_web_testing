// src/components/Login.jsx
import React, { useState } from "react";
import logo from "../assets/images/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(
      !validateEmail(e.target.value) ||
        (e.target.value.trim() === "" && e.target.value !== ""),
    );
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(
      !validatePassword(e.target.value) ||
        (e.target.value.trim() === "" && e.target.value !== ""),
    );
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform additional validation or API calls here if needed
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await fetch(
          "https://40ba4806-fabd-42c1-b9ab-f6cfa1447955-00-v6bom5jytel1.pike.replit.dev:3000/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          },
        );

        if (response.ok) {
          console.log("Login successful!");
          // Redirect to the user's dashboard or home page
          // Example: window.location.href = "/dashboard";
        } else {
          const error = await response.json();
          console.error("Login failed:", error.error);
          // Display error message to the user
          alert(error.error || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Display error message to the user
        alert("An unexpected error occurred. Please try again later.");
      }
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
            Login
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                name="password"
                required
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  passwordError ? "border-red-500" : ""
                }`}
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters long, contain at least
                one uppercase letter, one lowercase letter, and one number.
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
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7v2a3 3 0 006 0v-2h2V7a3 3 0 00-6 0v2H7V7a5 5 0 0110 0v2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>

            <div className="text-sm">
              <a
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
