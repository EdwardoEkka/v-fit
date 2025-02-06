import Image from "next/image";

const Content = [
  {
    title: "Your Partner in Fitness",
    content:
      "V-Fit is your go-to platform for expert coaching, top-quality fitness gear, and wellness content to help you achieve your goals. Whether it's losing weight, building muscle, or boosting energy, V-Fit supports you every step of the way.",
  },
  {
    title: "V-Fit Community",
    content:
      "Our coaches and trainers are here to help you excel. Explore our store for fitness gear and supplements. Join our community to connect with others on their fitness journey. At V-Fit, fitness is a journey, not a destination.",
  },
];

const HeroBook = () => {
  return (
    <div>
      <div className="w-full py-16">
        <div className="container text-center">
          <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-3">
            {Content[0].title}
          </h3>
          <p>{Content[0].content}</p>
        </div>
      </div>
      <div className="fit-banner">
        <Image
          src="/img/stock/misc.jpg"
          width={1500}
          height={400}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          alt="fit-banner"
        />
      </div>
      <div className="w-full py-16">
        <div className="container text-center">
          <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-3">
            {Content[1].title}
          </h3>
          <p>{Content[1].content}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBook;
