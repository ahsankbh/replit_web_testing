import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "react-loading-skeleton"; // Import the loading skeleton component

// Replace with your logo file name

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [submitting, setSubmitting] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.value.trim() === "" && e.target.value !== "");
  };

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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(
      e.target.value !== password ||
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

    // Ensure front-end validations pass
    if (
      name.trim() !== "" &&
      validateEmail(email) &&
      validatePassword(password) &&
      confirmPassword === password
    ) {
      try {
        setSubmitting(true); // Set loading state to true
        // Send data to backend API for signup
        const response = await fetch(
          "https://40ba4806-fabd-42c1-b9ab-f6cfa1447955-00-v6bom5jytel1.pike.replit.dev:3000/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }), // Send the name
          },
        );

        if (response.ok) {
          console.log("Signup successful!");
          // After a short delay, redirect to login page
          setTimeout(() => {
            navigate("/login");
          }, 1000); // Adjust the delay as needed
        } else if (response.status === 409) {
          const error = await response.json();
          console.error("Error:", error.error);
          alert("Email already exists. Please use a different email.");
        } else {
          const error = await response.json();
          console.error("Error:", error.error);
          alert("An error occurred during signup. Please try again.");
        }
        setSubmitting(false); // Set loading state to false after the response
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Unable to connect to the server. Please try again later.");
        setSubmitting(false); // Set loading state to false after the catch block
      }
    } else {
      console.log("Please correct the errors in the form.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className={`appearance-none block w-full px-3 py-2 border ${
                nameError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              value={name}
              onChange={handleNameChange}
            />
            {nameError && (
              <p className="text-red-500 text-xs mt-1">Please enter a name.</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className={`appearance-none block w-full px-3 py-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email.
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className={`appearance-none block w-full px-3 py-2 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters long, contain an
                uppercase letter, and a number.
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className={`appearance-none block w-full px-3 py-2 border ${
                confirmPasswordError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            disabled={submitting} // Disable button while submitting
          >
            {submitting ? ( // Show loading indicator when submitting
              <LoadingSkeleton width={100} height={30} /> // Adjust size as needed
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
