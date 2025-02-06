"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Categories from "@/data/categories";
import { getProductById } from "@/service";
import ProductPage from "@/components/pages/ProductPage";
import { MainNav } from "@/components/common/nav/main-navbar";
import Footer from "@/components/common/footer/footer";

const validateProductPage = async (category: string, subcategory: string, productId: string): Promise<boolean> => {
  const categoryObj = Categories.find(cat => cat.cat === category); // Check if category exists
  if (categoryObj && categoryObj.sub.includes(subcategory)) { // Validate subcategory
    const product = await getProductById(productId); // Validate product existence
    return product !== null; // Return true if product exists
  }
  return false; // Return false if validation fails
};

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const pathsArray = pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  const [productId,setProductId]=useState<string>("");

  useEffect(() => {
    const validateAndRedirect = async () => {
      if (pathsArray.length < 3) {
        // If pathsArray does not contain enough elements
        router.push("/not-found");
        return;
      }

      const isValid = await validateProductPage(pathsArray[0], pathsArray[1], pathsArray[2]);
      if (!isValid) {
        router.push("/not-found");
      }
      setProductId(pathsArray[2])
    };

    validateAndRedirect(); // Call the async validation function
  }, [pathname, router]); // Include dependencies

  return (
    <div>
    <MainNav/>
      <ProductPage productId={productId}/>
    <Footer/>
    </div>
  );
};

export default Page;
