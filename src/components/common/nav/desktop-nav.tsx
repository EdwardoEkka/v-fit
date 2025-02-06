import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Categories from "@/data/categories";
import { IoIosArrowForward } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import { IoArrowBackSharp } from "react-icons/io5";

export function DesktopNav() {
  const router = useRouter();
  const [isCatMenuOpen, setIsCatMenuOpen] = useState<Boolean>(false);
  const [isCatSelected, setIsCatSelected] = useState<Boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const toggleCatMenu = () => {
    setIsCatMenuOpen(!isCatMenuOpen);
  };

  return (
    <nav className="relative w-full h-20 px-6 hidden md:flex justify-between items-center bg-white/10 backdrop-blur-lg shadow-lg">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex items-center justify-center bg-orange-500 text-white aspect-square rounded-full h-[45px] transition-transform duration-300 hover:scale-110"
      >
        <GiMuscleUp size={24} />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-white text-lg font-semibold tracking-wide list-none">
        {["COACHES", "STORE", "ABOUT", "BLOGS"].map((item, index) => (
          <li
            key={index}
            onClick={() =>
              router.push(`/${item.toLowerCase().replace(" ", "")}`)
            }
            className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full hover:text-yellow-300"
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
            className="flex items-center justify-center bg-yellow-300 text-black rounded-lg aspect-square h-[45px] transition-all duration-300 hover:bg-yellow-400  cursor-pointer"
            onClick={() => path && router.push(path)}
          >
            <Icon size={22} />
          </div>
        ))}
        <div
          key={3}
          className="flex items-center justify-center bg-yellow-300 text-black rounded-lg aspect-square h-[45px] transition-all duration-300 hover:bg-yellow-400  cursor-pointer"
          onClick={() => toggleCatMenu()}
        >
          <BiCategoryAlt size={22} />
        </div>
      </div>
      {isCatMenuOpen && (
        <div>
          <div className="h-screen fixed w-64 bg-gradient-to-b from-black to-transparent text-white left-0 top-0 p-6">
            {isCatSelected ? (
              <div>
                <div className="pl-4 pb-6 flex gap-2 items-center">
                  <div
                    key={3}
                    className=" flex items-center justify-between  cursor-pointer"
                    onClick={() => setIsCatSelected(false)}
                  >
                    <IoArrowBackSharp size={22} />
                  </div>
                  <h2 className="text-xl font-bold uppercase">MAIN MENU</h2>
                </div>
                <ul className="list-none">
                  <li
                    className="cursor-pointer  uppercase py-2 flex "
                    onClick={() => {
                      router.push(`/${Categories[selectedCategory].cat}`);
                      setIsCatSelected(false);
                      setIsCatMenuOpen(false);
                    }}
                  >
                    {Categories[selectedCategory].cat}
                  </li>
                  {Categories[selectedCategory].sub.map((subcat, index) => (
                    <div>
                      <li
                        className="cursor-pointer  uppercase py-2 flex "
                        onClick={() => {
                          setIsCatSelected(false);
                          setIsCatMenuOpen(false);
                          router.push(
                            `/${Categories[selectedCategory].cat}/${subcat}`
                          );
                        }}
                      >
                        {subcat}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <div className="pl-4 pb-6 flex gap-2 items-center">
                  <div
                    key={3}
                    className=" flex items-center justify-center  cursor-pointer"
                  >
                    <TbCategory2 size={22} />
                  </div>
                  <h2 className="text-xl font-bold">CATEGORIES</h2>
                </div>
                <ul className="list-none">
                  {Categories.map((cat, index) => (
                    <li
                      className="cursor-pointer  uppercase py-2 flex gap-2 justify-between items-center"
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
