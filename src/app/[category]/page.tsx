"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Categories from "@/data/categories";
import { useEffect } from "react";
import CategoryPage from "@/components/pages/CategoryPage";
import { MainNav } from "@/components/common/nav/main-navbar";
import Footer from "@/components/common/footer/footer";

const validateCategory = (category: string) => {
  return Categories.some((cat) => cat.cat === category);
};

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Extract the first segment of the pathname
  const pathsArray = pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  const category = pathsArray[0];

  useEffect(() => {
    if (!validateCategory(category)) {
      router.push("/not-found");
    }
  }, [category, router]);

  // Only render the page if the category is valid
  if (!validateCategory(category)) {
    return null;
  }

  return (
    <div>
      <MainNav />
      <CategoryPage cat={category} />
      <Footer />
    </div>
  );
};

export default Page;
