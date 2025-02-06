"use client";
import { useState } from "react";
import { signIn } from "@/service";
import { useRouter } from "next/navigation";


const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();



  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signIn(email, password);
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6">
      <form
        onSubmit={handleSignIn}
        className="relative w-full max-w-md p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/80 rounded-2xl shadow-xl text-white transform transition-transform duration-500 hover:scale-105 backdrop-blur-md"
      >
        {/* Decorative Glow */}
        <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 pointer-events-none"></div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-6">
          Sign In
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-transform transform hover:scale-105"
        >
          Sign In
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-center text-red-400 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignIn;
