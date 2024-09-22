import React from "react";

const NovelleEmporiumLogo = () => {
  return (
    <div className="flex items-center">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="25" r="24" fill="url(#gradient)" />
        <path d="M15 20L25 35L35 20H15Z" fill="white" />
        <defs>
          <linearGradient
            id="gradient"
            x1="0"
            y1="0"
            x2="50"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4A0E4E" />
            <stop offset="1" stopColor="#FFD700" />
          </linearGradient>
        </defs>
      </svg>
      <div className="ml-2">
        <h1 className="text-3xl font-serif text-purple-900">Nūtana</h1>
        <h2 className="text-xl font-sans text-yellow-500">EMPORIUM</h2>
      </div>
    </div>
  );
};

export default NovelleEmporiumLogo;
