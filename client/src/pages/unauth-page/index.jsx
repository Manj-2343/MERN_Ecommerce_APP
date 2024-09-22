import React from "react";
import { Link } from "react-router-dom";

function UnauthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-center text-gray-600 py-2 ">
          You don't have permission to view this page.
        </p>
        <Link
          to={"/"}
          className="text-center py-2 px-4 w-full bg-gradient-to-l from-orange-600 to-red-600 hover:bg-gradient-to-r from-orange-600 to-red-600 text-white transition-colors duration-300 text-white font-semibold  rounded-lg transition-colors duration-300"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default UnauthPage;
