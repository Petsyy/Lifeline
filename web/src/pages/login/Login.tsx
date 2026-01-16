import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    alert(`Logged in as: ${username}`);
    setUsername('');
    setPassword('');
  };

  return (
    // Added 'pt-24' here. 
    // Since we are using justify-center, adding top padding pushes the mathematical center point downwards.
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 relative overflow-hidden bg-gray-900">
      
      {/* --- Background Layers --- */}
      
      {/* Blurred Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: "url('/src/assets/Bg.svg')" }}
      ></div>

      {/* Dark Overlay Layer */}
      <div className="absolute inset-0 bg-[#080C16] opacity-80"></div>

      {/* --- Content Layers --- */}

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <img 
          src="/src/assets/logo.svg" 
          alt="LifeLine Logo" 
          className="h-10 w-auto" 
        />
      </div>

      {/* Login Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-md w-full bg-[#080C16] bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-800"
      >
        <h2 className="text-2xl text-gray-100 font-semibold mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-8 text-center">Login to access Dashboard</p>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-gray-300 font-medium text-sm">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className="w-full bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-300 font-medium text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
        >
          Login
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
            Contact your administrator if you need access
        </p>
      </form>
    </div>
  );
};

export default Login;