"use client"
import { useEffect, useState } from "react";
import Footer from "@/components/common/footer/footer";
import { MainNav } from "@/components/common/nav/main-navbar";
import { Product } from "@/app/types";
import { getAllProducts } from "@/service";
import ProductCard from "@/components/common/product-card";


const Page=()=>{
    const [products,setProducts]=useState<Product[]>([]);


    useEffect(()=>{
        const getProducts=async()=>{
            try {
                const prod=await getAllProducts();
                setProducts(prod);
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    },[])

    return(
        <div>
        <MainNav/>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-4">
        <div className="container">

        <div className="flex flex-col items-center mx-auto">
 


    </div>
        <div className="grid lg:grid-cols-3 gap-4 py-4 sm:grid-cols-2 grid-cols-1">
            {
                products.map((item:Product,index:any)=>(
                    <ProductCard product={item}/>
                ))
            }
        </div>
        </div>
        </div>
        <Footer/>
        </div>
    )
}

export default Page;