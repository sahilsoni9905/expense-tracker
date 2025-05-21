import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldOff } from "lucide-react";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl border border-gray-100 rounded-2xl w-full max-w-md p-8 md:p-10 text-center">
        <div className="flex justify-center mb-4">
          <ShieldOff size={48} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You must be logged In to view this page.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition font-medium"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
