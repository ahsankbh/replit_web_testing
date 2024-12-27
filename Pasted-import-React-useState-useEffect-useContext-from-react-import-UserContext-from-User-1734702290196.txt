import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

function Home() {
  const [userData, setUserData] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `https://40ba4806-fabd-42c1-b9ab-f6cfa1447955-00-v6bom5jytel1.pike.replit.dev:3000/home?email=${userId}`,
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        {userData ? (
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Welcome, {userData.name}!
            </h2>
            <div className="mt-8 space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userData.name}
                  />
                </div>
              </div>
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
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userData.email}
                  />
                </div>
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
                    type="text"
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userData.password}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="created_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Created On
                </label>
                <div className="mt-1">
                  <input
                    id="created_at"
                    type="text"
                    readOnly
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userData.created_at}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
