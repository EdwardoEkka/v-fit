const Images = [
  "/img/stock/boxing.png",
  "/img/stock/fire.png",
  "/img/stock/bottle-bag.png",
];

const Blog = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 aspect-square bg-blue-300 rounded-full p-4">
              <img
                src="/img/stock/boxing.svg"
                alt="boxing"
                className="w-full h-full object-scale-down"
              />
            </div>
            <h3 className="text-base text-center font-bold">
                Are You Becoming The Person You Want To Be?
            </h3>
            <p className="underline">READ MORE</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 aspect-square bg-blue-300 rounded-full p-4">
              <img
                src="/img/stock/fire.svg"
                alt="fire"
                className="w-full h-full object-scale-down"
              />
            </div>
            <h3 className="text-base text-center font-bold">Look In The Mirror That's Your Competition</h3>
            <p className="underline">READ MORE</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 aspect-square bg-blue-300 rounded-full object-scale-down p-4">
              <img
                src="/img/stock/gym.svg"
                alt="bottle"
                className="w-full h-full object-scale-down"
              />
            </div>
            <h3 className="text-base text-center font-bold">Action Is The Foundational Key To All Success.</h3>
            <p className="underline">READ MORE</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
