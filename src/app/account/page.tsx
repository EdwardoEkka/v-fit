"use client";
import withAuth from "../auth/withAuth";
import { useUserStore } from "@/stores/globalStore";
import { signOutUser } from "@/service";
import { MainNav } from "@/components/common/nav/main-navbar";
import Footer from "@/components/common/footer/footer";

const App = () => {
  const { user, setUser } = useUserStore();

  return (
    <div>
      <MainNav />
      <div className="min-h-screen flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-700/80 backdrop-blur-md">
          {/* Decorative Glow */}
          <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 pointer-events-none"></div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
            User Profile
          </h1>

          {/* User Info */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-gray-200">
              {user?.displayName || "Guest User"}
            </p>
            <p className="text-lg font-medium text-gray-200">
              {user?.uid}
            </p>
            <p className="text-sm text-gray-400">
              {user?.email || "No Email Provided"}
            </p>
          </div>

          {/* Log Out Button */}
          <button
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:brightness-110 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            onClick={() => {
              signOutUser();
              setUser(null);
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(App);
