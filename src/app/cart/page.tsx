"use client";
import { useState, useEffect } from "react";
import { MainNav } from "@/components/common/nav/main-navbar";
import withAuth from "../auth/withAuth";
import Footer from "@/components/common/footer/footer";
import { useUserStore } from "@/stores/globalStore";
import { getUserCart, removeFromCart } from "@/service";
import { getProductById } from "@/service";
import { Product, Cart } from "../types";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUserStore();
  const [userId, setUserId] = useState<any>(null);
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    setUserId(user?.uid);
  }, [user?.uid]);

  useEffect(() => {
    const GetProd = async () => {
      try {
        const prod = await getUserCart(userId);
        setCart(prod);
      } catch (error) {
        console.error(error);
      }
    };

    GetProd();
  }, [userId]);

  return (
    <div>
      <MainNav />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-0 sm:px-4">
        <div className="container">
          <div className="w-full grid grid-col-1 md:grid-cols-2 py-6 gap-4">
            {cart.map((cart, index) => (
              <ProductInCart productId={cart.productId} cartId={cart.id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(Page);

const ProductInCart = ({
  productId,
  cartId,
}: {
  productId: string;
  cartId: string;
}) => {
  const [prod, setProd] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productResponse = await getProductById(productId);
        setProd(productResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  if (loading) return null; // Avoid showing incomplete content

  return (
    <div className="flex items-center gap-4 p-5 border border-white/20 rounded-lg shadow-lg backdrop-blur-lg bg-white/10">
      {/* Product Image */}
      <img
        src={prod?.images[0] || "/fallback-image.jpg"}
        alt={prod?.name || "Product"}
        className="w-28 h-28 object-cover rounded-lg xs:w-32 xs:h-32 border border-white/20 shadow-md"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-1 text-white">
        <p className="text-base font-semibold">{prod?.name}</p>
        <p className="text-sm font-medium mt-1">${prod?.price.price}</p>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => router.push(`/checkout/${prod?.id}`)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600/80 backdrop-blur-md rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Buy Now
          </button>
          <button
            onClick={async () => await removeFromCart(cartId)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600/80 backdrop-blur-md rounded-md hover:bg-red-700 transition-all duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
