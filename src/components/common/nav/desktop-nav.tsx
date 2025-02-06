import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoPerson, IoArrowBackSharp } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Categories from "@/data/categories";
import { IoIosArrowForward } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";

export function DesktopNav() {
  const router = useRouter();
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
  const [isCatSelected, setIsCatSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const toggleCatMenu = () => setIsCatMenuOpen(!isCatMenuOpen);

  return (
    <nav className="relative w-full h-20 px-6 hidden md:flex justify-between items-center bg-white/10 backdrop-blur-lg shadow-lg">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex items-center justify-center bg-orange-500 text-white rounded-full w-12 h-12 transition-transform duration-300 hover:scale-110"
      >
        <GiMuscleUp size={24} />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-white text-lg font-semibold tracking-wide list-none">
        {["COACHES", "STORE", "ABOUT", "BLOGS"].map((item, index) => (
          <li
            key={index}
            onClick={() => router.push(`/${item.toLowerCase().replace(" ", "")}`)}
            className="cursor-pointer relative after:block after:w-0 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full hover:text-yellow-300"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {[
          { icon: IoPerson, path: "/account" },
          { icon: FaShoppingCart, path: "/cart" },
        ].map(({ icon: Icon, path }, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-yellow-300 text-black rounded-lg w-12 h-12 transition-all duration-300 hover:bg-yellow-400 cursor-pointer"
            onClick={() => router.push(path)}
          >
            <Icon size={22} />
          </div>
        ))}
        <div
          className="flex items-center justify-center bg-yellow-300 text-black rounded-lg w-12 h-12 transition-all duration-300 hover:bg-yellow-400 cursor-pointer"
          onClick={toggleCatMenu}
        >
          <BiCategoryAlt size={22} />
        </div>
      </div>

      {/* Category Menu */}
      {isCatMenuOpen && (
        <div className="fixed z-50">
          <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black to-transparent text-white p-6">
            {isCatSelected ? (
              <div>
                <div className="flex items-center gap-2 pb-6">
                  <IoArrowBackSharp
                    size={22}
                    className="cursor-pointer"
                    onClick={() => setIsCatSelected(false)}
                  />
                  <h2 className="text-xl font-bold uppercase">MAIN MENU</h2>
                </div>
                <ul className="list-none">
                  <li
                    className="cursor-pointer uppercase py-2 hover:text-yellow-400"
                    onClick={() => {
                      router.push(`/${Categories[selectedCategory].cat}`);
                      setIsCatSelected(false);
                      setIsCatMenuOpen(false);
                    }}
                  >
                    {Categories[selectedCategory].cat}
                  </li>
                  {Categories[selectedCategory].sub.map((subcat, index) => (
                    <li
                      key={index}
                      className="cursor-pointer uppercase py-2 hover:text-yellow-400"
                      onClick={() => {
                        router.push(`/${Categories[selectedCategory].cat}/${subcat}`);
                        setIsCatSelected(false);
                        setIsCatMenuOpen(false);
                      }}
                    >
                      {subcat}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 pb-6">
                  <TbCategory2 size={22} />
                  <h2 className="text-xl font-bold">CATEGORIES</h2>
                </div>
                <ul className="list-none">
                  {Categories.map((cat, index) => (
                    <li
                      key={index}
                      className="cursor-pointer uppercase py-2 flex justify-between items-center hover:text-yellow-400"
                      onClick={() => {
                        setIsCatSelected(true);
                        setSelectedCategory(index);
                      }}
                    >
                      <p>{cat.cat}</p>
                      <IoIosArrowForward />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
