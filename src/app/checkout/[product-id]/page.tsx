"use client";
import { Order, Product } from "@/app/types";
import Footer from "@/components/common/footer/footer";
import { MainNav } from "@/components/common/nav/main-navbar";
import { getProductById } from "@/service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useUserStore } from "@/stores/globalStore";

const Page = () => {
  const params = useParams();
  const productId = String(params["product-id"]);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [paymentProceed, setPaymentProceed] = useState<boolean>(false);
  const { user } = useUserStore();
  const [shippingAddress, setShippingAddress] = useState<any>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setShippingAddress((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await getProductById(productId);
        setOrderProduct(product);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [productId]);

  return (
    <div>
      <MainNav />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-6">
        <div className="container mx-auto px-4 py-10">
          {paymentProceed ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {orderProduct && (
                  <div>
                    <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-white/10 p-2 sm:p-6 rounded-2xl shadow-xl text-left ">
                      <h3 className="text-2xl font-bold text-white">
                        {orderProduct.name}
                      </h3>

                      {orderProduct.images?.length > 0 && (
                        <div className="relative mt-4 w-full h-64 overflow-hidden rounded-lg shadow-lg border border-gray-700">
                          <img
                            className="w-full h-full object-scale-down bg-black p-2"
                            src={orderProduct.images[0]}
                            alt={orderProduct.name}
                          />
                        </div>
                      )}
                      <div className="mt-6 space-y-3">
                        <p className="text-lg font-medium text-gray-300">
                          Quantity:{" "}
                          <span className="text-white font-semibold">
                            {productQuantity}
                          </span>
                        </p>
                        <p className="text-lg font-medium text-gray-300">
                          Total Price: USD {productQuantity*orderProduct.price.discountedPrice}
                        </p>
                      </div>

                      <div className="mt-6 p-4 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Shipping Address
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          <span className="font-semibold text-white">
                            {shippingAddress.name}
                          </span>
                          , {shippingAddress.phone}
                          <br />
                          {shippingAddress.address}, {shippingAddress.city},{" "}
                          {shippingAddress.state}
                          <br />
                          {shippingAddress.country} - {shippingAddress.zipCode}
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
      
              <div className="flex justify-center items-center p-6 bg-gray-900 text-white rounded-2xl shadow-xl backdrop-blur-lg bg-opacity-50">
                <PaymentOptions priceAmount={(productQuantity * (orderProduct?.price?.discountedPrice ?? 0)) || 0}/></div>
              </div>
  

      
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {orderProduct && (
                <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl text-white font-semibold">
                    {orderProduct?.name}
                  </h2>
                  {orderProduct?.images?.length > 0 && (
                    <img
                      className="w-full h-64 object-cover rounded-lg mt-4"
                      src={orderProduct.images[0]}
                      alt={orderProduct.name}
                    />
                  )}
                  <h5 className="text-xl text-white font-light mt-4">
                    {orderProduct?.description}
                  </h5>
                  <div className="flex mt-4 text-lg font-semibold">
                    {orderProduct?.price.discountedPrice ? (
                      <div>
                        <span className="line-through text-red-500 mr-2">
                          {orderProduct?.price.currency}{" "}
                          {orderProduct?.price.price}
                        </span>
                        <span className="text-green-400">
                          {orderProduct?.price.currency}{" "}
                          {orderProduct?.price.discountedPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-white">
                        {orderProduct?.price.currency}{" "}
                        {orderProduct?.price.price}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {orderProduct.category.tags?.map((tag, index) => (
                      <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => setProductQuantity(productQuantity - 1)}
                      className="p-2 bg-gray-800/60 hover:bg-gray-700 rounded-md text-white transition disabled:opacity-50"
                      disabled={productQuantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="text-xl font-bold text-white">
                      {productQuantity}
                    </span>
                    <button
                      onClick={() => setProductQuantity(productQuantity + 1)}
                      className="p-2 bg-gray-800/60 hover:bg-gray-700 rounded-md text-white transition"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <h5 className="mt-4 text-white text-xl">Total Price: USD {productQuantity*orderProduct.price.discountedPrice}</h5>
                </div>
              )}
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Shipping Address
                </h2>
                <form
                  onSubmit={() => setPaymentProceed(true)}
                  className="space-y-4"
                >
                  {Object.keys(shippingAddress).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-400 capitalize">
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={shippingAddress[field]}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800/60 border border-gray-600 text-white rounded-md focus:ring focus:ring-indigo-500 focus:outline-none"
                        required
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-2 rounded-md hover:scale-105 transition-transform"
                  >
                    Proceed to Payment
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;

const PaymentOptions = ({priceAmount}:{priceAmount:number}) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK is still loading. Please try again in a moment.");
      return;
    }

    const options = {
      key: "rzp_test_AAFgc8dQHevvPW",
      amount: {priceAmount},
      currency: "INR",
      name: "Your Company",
      description: "Payment for Order #1234",
      image: "/logo.png", 
      handler: (response: any) => {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
      },
      theme: { color: "#6E07F3" }, // Your primary theme color
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="bg-[#6E07F3] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#5406D9] transition-all"
        disabled={!razorpayLoaded}
      >
        {razorpayLoaded ? "Pay with Razorpay" : "Loading Razorpay..."}
      </button>
    </div>
  );
};



