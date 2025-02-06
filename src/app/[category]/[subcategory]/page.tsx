"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Categories from "@/data/categories";
import SubCategoryPage from "@/components/pages/SubCategoryPage";
import { MainNav } from "@/components/common/nav/main-navbar";
import Footer from "@/components/common/footer/footer";

const ValidateCategory_SubCategory = (category: string, subcategory: string): boolean => {
    const categoryObj = Categories.find(cat => cat.cat === category);
    if (categoryObj) {
      return categoryObj.sub.includes(subcategory);
    }
    return false;
  };

const Page = () => {
    const pathname = usePathname();
    const router = useRouter();
    const pathsArray = pathname.replace(/^\/+/, "").split("/").filter(Boolean);
    const [cat, setCat] = useState<Record<string, string>>({});

    useEffect(()=>{
       if(ValidateCategory_SubCategory(pathsArray[0],pathsArray[1])){
        setCat({cat:pathsArray[0], sub:pathsArray[1]})
       } 
       else
       {
         router.push('/not-found');
       }
    },[])

  return (
    <div>
    <MainNav/>
        <SubCategoryPage cat={cat.cat} sub={cat.sub}/>
    <Footer/>
    </div>
  );
};

export default Page;
