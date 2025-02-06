import React from "react";

const images = [
  "/img/stock/jogging.png",
  "/img/stock/muscle.png",
  "/img/stock/yoga.png",
  "/img/stock/lady-dumbell.png",
];

const TrainYourself = () => {
  return (
    <section className="w-full py-12 train-yourself text-white relative overflow-hidden">
    <div className="container flex flex-col md:flex-row lg:gap-20 gap-12 justify-center items-center">
      <div className="grid grid-cols-2 grid-rows-2 relative z-10 w-full md:w-1/2 lg:w-1/3 h-[300px] xs:h-[450px] gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden transition-transform duration-500 ${index==0?"flex justify-end":""} ${index==1?"flex flex-col justify-end":""} ${index==2?"flex flex-col justify-start":""} ${index==3?"flex justify-start":""} `}

          >
            <div
                className={`${index==0?"w-3/4 p-2 t-img-0":""} ${index==1?"h-2/3 relative bottom-3 t-img-1":""} ${index==2?"h-2/3 relative top-3 t-img-2":""} ${index==3?"w-3/4 t-img-3":""} border border-white rounded-xl bg-white`}
            >
            <img
              src={image}
              alt={`Fitness ${index}`}
              className="w-full h-full object-scale-down"
            />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 px-0 sm:px-4 flex flex-col gap-4">
        <h3 className="text-xl md:text-2xl text-white font-bold">ROUTINE BASED COURSE</h3>
        <h1 className="text-3xl xs:text-5xl md:text-3xl lg:text-6xl font-black ">TAKE YOUR</h1>
        <h1 className="text-3xl xs:text-5xl md:text-3xl lg:text-6xl font-black ">TRAINING TO THE</h1>
        <h1 className="text-3xl xs:text-5xl md:text-3xl lg:text-6xl font-black ">NEXT LEVEL</h1>
        <div className="p-2 border border-white rounded-lg mt-8 flex w-fit">
            <h3 className="text-xl">TAKE A TOUR</h3>
        </div>
      </div>
    </div>
    </section>
  );
};

export default TrainYourself;
