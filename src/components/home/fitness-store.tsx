"use client";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'

const Images = [
  "/img/stock/dumbell.png",
  "/img/stock/shorts.png",
  "/img/stock/gym-bag.png",
  "/img/stock/dumbell.png",
  "/img/stock/dumbell.png",
];
const FitnessStore = () => {
  const OPTIONS: EmblaOptionsType = { align: "start" };
  return (
    <div className="w-full py-16 fitness-store">
      <div className="container">
        <EmblaCarousel slides={Images} options={OPTIONS} />
      </div>
    </div>
  );
};

export default FitnessStore;
