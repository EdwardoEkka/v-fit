"use client";
import React, { useState } from "react";
import { signUp } from "@/service";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      alert("Sign-up successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSignUp}
        className="relative w-full max-w-md p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/80 rounded-2xl shadow-xl text-white transform transition-transform duration-500 hover:scale-105 backdrop-blur-md"
      >
        {/* Decorative Glow */}
        <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 pointer-events-none"></div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-6">
          Sign Up
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-center text-red-400 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
