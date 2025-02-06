import { useEffect, useState } from "react";
import { getProductByCategories } from "@/service";
import { Product } from "@/app/types";
import ProductCard from "../common/product-card";

const CategoryPage=({cat}:{cat:string})=>{
    const [products, setProducts]=useState<Product[]>([])
    useEffect(() => {
        const fetchProductsByCategory= async () =>{
            const products = await getProductByCategories(cat)
            setProducts(products);
            console.log(products)
        }
        fetchProductsByCategory();
    }, [cat]);
    return(
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10">
        <div className="container grid lg:grid-cols-3 gap-4 py-6 sm:grid-cols-2 grid-cols-1">
            {
                products.map((item:Product,index:any)=>(
                    <ProductCard product={item}/>
                ))
            }
        </div>
        </div>
    )
}

export default CategoryPage;