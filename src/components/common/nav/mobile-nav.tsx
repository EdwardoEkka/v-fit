import React, { useState } from "react";
import { GiMuscleUp, GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="w-full h-20 flex justify-between px-6 md:hidden items-center">
        <div className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white aspect-square rounded-full h-[45px] shadow-lg">
          <GiMuscleUp size={24} />
        </div>
        <button
          className="flex items-center justify-center text-white aspect-square rounded-full h-[45px] text-2xl bg-gray-900 shadow-lg"
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900/80 backdrop-blur-lg text-white z-50 w-[75%] shadow-xl ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <div
              onClick={() => {
                router.push("/");
              }}
              className="cursor-pointer flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white aspect-square rounded-full h-[45px] shadow-md"
            >
              <GiMuscleUp size={24} />
            </div>
            <button onClick={toggleMenu} className="text-2xl">
              <IoClose />
            </button>
          </div>
          <ul className="space-y-6 text-lg font-medium tracking-wide list-none">
            {["COACHES", "STORE", "ABOUT", "BLOG"].map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  router.push(`/${item.toLowerCase().replace(" ", "-")}`);
                  toggleMenu();
                }}
                className="cursor-pointer transition-all hover:text-orange-400 hover:scale-105"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex justify-center text-sm opacity-60">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}
