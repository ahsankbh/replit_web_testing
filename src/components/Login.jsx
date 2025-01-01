import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import logo from "../assets/images/logo.png";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Create Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [open, setOpen] = useState(false); // State for Snackbar message
  const navigate = useNavigate();
  const { setEmail: setUserEmail } = useContext(UserContext); // Use setEmail from UserContext

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(
      !validateEmail(e.target.value) ||
        (e.target.value.trim() === "" && e.target.value !== "")
    );
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(
      !validatePassword(e.target.value) ||
        (e.target.value.trim() === "" && e.target.value !== "")
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

    if (validateEmail(email) && validatePassword(password)) {
      setIsLoading(true); // Show loading indicator

      try {
        const response = await fetch(
          "https://40ba4806-fabd-42c1-b9ab-f6cfa1447955-00-v6bom5jytel1.pike.replit.dev:3000/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email); // Update context
          setEmail(''); // Clear email field
          setPassword(''); // Clear password field
          localStorage.setItem("userEmail", data.email); // Save to localStorage
          setOpen(true); // Show success snackbar
          setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds to allow snackbar to show
        } else {
          const error = await response.json();
          console.error("Login failed:", error.error);
          alert(error.error || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    } else {
      console.log("Please correct the errors in the form.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Container for logo and form */}
      <div className="flex items-center justify-between w-full max-w-4xl">
        {/* Logo on the left */}
        <div className="flex justify-center items-center w-2/4"> {/* Increased width of logo container */}
          <img src={logo} alt="Logo" className="w-80 h-80" /> {/* Increased size of logo */}
        </div>

        {/* Form on the right */}
        <div className="flex justify-center items-center w-2/4"> {/* Reduced width of form container */}
          <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                <div className="mt-1.5">
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
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Sign in"
                  )}
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
      </div>

      {/* Snackbar for Success Message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login Successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
