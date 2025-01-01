import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./UserContext"; // Import UserProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UserProvider>
			{" "}
			{/* Wrap App with UserProvider */}
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserProvider>
	</React.StrictMode>,
);
