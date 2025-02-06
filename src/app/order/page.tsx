"use client"
import Footer from "@/components/common/footer/footer"
import { MainNav } from "@/components/common/nav/main-navbar"
import withAuth from "../auth/withAuth"


const OrderPage=()=>{
    return(
        <div>
        <MainNav/>

        <Footer/>
        </div>
    )
}

export default withAuth(OrderPage);