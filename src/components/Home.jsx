import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { email, setEmail } = useContext(UserContext); // Access email and setter
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (!email && savedEmail) {
      setEmail(savedEmail); // Sync context with localStorage
    } else if (!email && !savedEmail) {
      navigate("/login"); // Redirect to login if no email
    }
  }, [email, setEmail, navigate]); // Dependencies ensure effect runs when email changes

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "#f0f8ff",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2
        className="text-4xl font-bold text-center"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Hi <span style={{ color: "#ff7e67" }}>Mate</span>, how can we help you
        today?
      </h2>
    </div>
  );
}

export default Home;
