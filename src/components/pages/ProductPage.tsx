import { addToCart, addToOrder, checkIfProductInCart, getProductById, getUserCart } from "@/service";
import { useEffect, useState } from "react";
import {  Product } from "@/app/types";
import { useUserStore } from "@/stores/globalStore";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface ProductProps {
  productId: string;
}

const ProductPage = ({ productId }: ProductProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProductInCart,setIsProductInCart]= useState<boolean>(false);
  const {user} = useUserStore();
  const router=useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);
  


  useEffect(()=>{
  const checkCart = async () => {
    try {
      const isInCart = await checkIfProductInCart(user?.uid, product?.id);
      setIsProductInCart(isInCart);
    } catch (error) {
      console.error("Error checking cart:", error);
    }
  };
  
  checkCart();
},[user?.uid, product?.id])




  const addProductToCart = async () => {
    try {
      const cartProd = {
        id: uuidv4(),
        userId: user?.uid, 
        productId:  product?.id,
      };
      const prod = await addToCart(cartProd);
    } catch (error) {
      console.error("Error adding product to cart", error);
    }
  };



  
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">Product not found.</div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-0 sm:px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-8 ">
        {/* Product Images */}
        <div className="relative h-full max-h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="rounded-xl w-full h-full object-cover"
          />
        </div>
  
        {/* Product Details */}
        <div className="p-6 bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-white tracking-wide neon-glow">
            {product.name}
          </h1>
          <p className="text-gray-400 mt-2">{product.description}</p>
  
          <div className="mt-4 text-xl text-gray-300 font-semibold">
            Price:{" "}
            <span className="text-green-400 neon-text">
              {product.price.currency}{" "}
              {product.price.discountedPrice || product.price.price}
            </span>
          </div>
  
          <div
            className={`mt-2 text-lg font-medium ${
              product.stock.stockStatus === "in stock"
                ? "text-green-400"
                : "text-red-500"
            } neon-text`}
          >
            {product.stock.stockStatus}
          </div>
  
          {/* Category */}
          <div className="mt-4 text-sm text-gray-400">
            Category:{" "}
            <span className="font-medium text-white">
              {product.category.category}
            </span>
          </div>
          {product.category.subCategory && (
            <div className="text-sm text-gray-400">
              Subcategory:{" "}
              <span className="font-medium text-white">
                {product.category.subCategory}
              </span>
            </div>
          )}
  
          {/* Tags */}
          {product.category.tags && product.category.tags.length > 0 && (
            <div className="mt-4">
              <span className="text-sm text-gray-400">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.category.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800/60 text-white rounded-full text-xs shadow-md border border-gray-600 hover:border-gray-400 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
  
          {/* Action Button */}
          <div className="mt-6">
            {isProductInCart ? (
              <button
                onClick={() => router.push("/cart")}
                className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg hover:scale-105 transition-transform backdrop-blur-lg"
              >
                🛒 Go to Cart
              </button>
            ) : (
              <button
                onClick={() => addProductToCart()}
                className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg hover:scale-105 transition-transform backdrop-blur-lg"
              >
                🛒 Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ProductPage;
