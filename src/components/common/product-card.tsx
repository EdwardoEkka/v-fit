"use client";

import { Product } from "@/app/types";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { id, name, description, images, price, stock, category } = product;
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/${category.category}/${category.subCategory}/${id}`);
  };

  return (
    <div
      className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/80 shadow-2xl rounded-2xl p-6 cursor-pointer backdrop-blur-md "
      onClick={handleNavigation}
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 pointer-events-none"></div>
      
      {/* Product Image */}
      <div className="relative bg-white rounded-xl overflow-hidden">
        {images?.[0] ? (
          <img
            src={images[0]}
            alt={name}
            className="w-full h-64 object-scale-down"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        {stock.stockStatus === "out of stock" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center text-xl font-bold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          {name}
        </h3>
        <p
          className="text-gray-300 text-sm mt-2"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
          }}
        >
          {description || "No description available."}
        </p>

        {/* Price */}
        <div className="flex justify-center items-center mt-4 text-lg font-semibold">
          {price.discountedPrice ? (
            <div>
              <span className="line-through text-red-500 mr-2">
                {price.currency} {price.price}
              </span>
              <span className="text-green-400">
                {price.currency} {price.discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-white">{price.currency} {price.price}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-4">
          <span
            className={`text-sm font-semibold ${
              stock.stockStatus === "in stock"
                ? "text-green-400"
                : "text-red-500"
            }`}
          >
            {stock.stockStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
