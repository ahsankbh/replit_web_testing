import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success or error
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.value.trim() === "");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(e.target.value !== password);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.trim() &&
      validateEmail(email) &&
      validatePassword(password) &&
      confirmPassword === password
    ) {
      try {
        setSubmitting(true);

        const response = await fetch(
          "https://40ba4806-fabd-42c1-b9ab-f6cfa1447955-00-v6bom5jytel1.pike.replit.dev:3000/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          }
        );

        if (response.ok) {
          setEmail(''); // Clear email field
          setPassword(''); // Clear password field
          setName('');
          setConfirmPassword('')
          setSnackbarSeverity("success");
          setSnackbarMessage("Signup successful!");
          setSnackbarOpen(true);

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (response.status === 409) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Email already exists. Please use a different email.");
          setSnackbarOpen(true);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("An error occurred during signup. Please try again.");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Unable to connect to the server. Please try again later.");
        setSnackbarOpen(true);
      } finally {
        setSubmitting(false);
      }
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please correct the errors in the form.");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Container for logo and form */}
      <div className="flex items-center justify-between w-full max-w-4xl">
        {/* Logo on the left */}
        <div className="flex justify-center items-center w-2/4 mr-10"> {/* Increased width of logo container */}
          <img src={logo} alt="Logo" className="w-80 h-80" /> {/* Increased size of logo */}
        </div>

        {/* Form on the right */}
        <div className="flex justify-center items-center w-2/4"> {/* Reduced width of form container */}
          <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1.5">
                  <input
                    id="name"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      nameError ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none`}
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
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
                <div className="mt-1.5">
                  <input
                    id="email"
                    type="email"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      emailError ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">Please enter a valid email.</p>
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
                <div className="mt-1.5">
                  <input
                    id="password"
                    type="password"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none`}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">
                    Password must be at least 8 characters long, contain an uppercase letter, and a
                    number.
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
                <div className="mt-1.5">
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      confirmPasswordError ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  disabled={submitting}
                >
                  {submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                {/* Sign In Link */}
                <div className="mt-1 text-right">
                  <div className="text-sm">
                    <a
                      href="/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Already Registered? Signin!
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
