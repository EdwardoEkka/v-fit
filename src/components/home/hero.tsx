import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { TbBrandBaidu } from "react-icons/tb";

const Hero = () => {
  return (
    <div className="relative">
      <HeroComponent1 />
      {/* <button className="p-6 bg-gray-500 text-white  absolute left-2 rounded-full top-1/2 z-50">
        <FaChevronLeft />
      </button>
      <button className="p-6 bg-gray-500 text-white  absolute right-2 rounded-full top-1/2 z-50">
        <FaChevronRight />
      </button> */}
    </div>
  );
};

export default Hero;

const HeroComponent1 = () => {
  return (
    <div className="w-full aspect-hero relative">
      <img
        src="/img/stock/gym.jpg"
        alt="hero-2"
        className="w-full h-full object-cover absolute z-0 inset-0"
      />
      <div className="absolute inset-0 flex z-10">
        <div className="relative w-full h-full">
          <div className="h-full p-4  absolute right-0 top-0 text-3xl sm:text-4xl md:text-5xl xl:text-6xl bg-[#C3E235] hidden sm:flex flex-col justify-between">
            <h1 className=" font-black leading-tight">DISCIPLINE</h1>
            <h1 className="font-black leading-tight">STRENGTH</h1>
            <h1 className="font-black leading-tight">WELLNESS</h1>
            <h1 className="font-black leading-tight">RESILIENCE</h1>
            <h1 className="font-black leading-tight">BALANCE</h1>
          </div>
          <div className="h-auto p-4  absolute left-0 bottom-0 text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white ">
            <h1 className=" font-black leading-tight">EXCLUSIVE</h1>
            <h1 className="font-black leading-tight">GYM & FITNESS</h1>
            <h1 className="font-black leading-tight">PRODUCTS</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroComponent2 = () => {
  return (
    <div className="w-full aspect-hero relative">
      <img
        src="/img/logo/my-logo.png"
        alt="hero-1"
        className="w-full h-full object-cover absolute inset-0"
      />
    </div>
  );
};
