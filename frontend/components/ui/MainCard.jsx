import React from "react";
import { Button } from "@/components/ui/button";

const MainCard = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-blue-100 to-white p-8 relative">
      <button 
        className="absolute top-6 right-6 bg-gradient-to-r from-blue-400 to-teal-300 text-white px-5 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
      >
        Action
      </button>
      <main className="p-10 w-full h-full max-w-6xl bg-white shadow-xl rounded-3xl border border-gray-300 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Dashboard</h1>
        <div 
          className="bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl p-8 border border-gray-300 hover:shadow-4xl transition-shadow duration-300 w-1/2"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Card Title</h2>
          <p className="text-gray-600">This is a well-designed card component with a clean and bright look.</p>
        </div>
      </main>
    </div>
  );
};

export default MainCard;
