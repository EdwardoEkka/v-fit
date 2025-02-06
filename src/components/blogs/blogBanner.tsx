import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";

interface BlogBannerProps {
  images: string[];
}

const BlogBanner = ({ images }: BlogBannerProps) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentStyle, setCurrentStyle] = useState("");

  const style5 = "grid-cols-4 grid-rows-2";
  const style3 = "grid-cols-3 grid-rows-2";
  const style1 = "grid-cols-1";

  useEffect(() => {
    const imageCount = images.length;
    if (imageCount >= 5) {
      setImageList(images.slice(0, 5));
      setCurrentStyle(style5);
    } else if (imageCount >= 3) {
      setImageList(images.slice(0, 3));
      setCurrentStyle(style3);
    } else {
      setImageList(images.slice(0, 1));
      setCurrentStyle(style1);
    }
  }, [images]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative w-full">
      {/* Mobile View - Slider */}
      <div className="block sm:hidden">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <Image
                src={image}
                width={700}
                height={400}
                alt={`Image-${index}`}
                className="h-[250px] w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop Grid View */}
      <div
        className={`hidden sm:grid gap-3 h-[500px] overflow-hidden ${currentStyle} p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg`}
      >
        {imageList.map((reference, index) => (
          <ImageContainer key={index} reference={reference} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogBanner;

const ImageContainer = ({ reference, index }: { reference: string; index: number }) => {
  return (
    <div
      className={`relative h-full w-full overflow-hidden border border-[#6E07F3] rounded-lg shadow-lg ${
        index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
    >
      <Image
        src={reference}
        alt={`Blog Image ${index + 1}`}
        width={900}
        height={600}
        className="w-full h-full object-cover rounded-lg"
      />
      {/* Neon Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
    </div>
  );
};
