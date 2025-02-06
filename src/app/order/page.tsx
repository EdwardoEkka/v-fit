"use client";
import { FC } from "react";
import Footer from "@/components/common/footer/footer";
import { MainNav } from "@/components/common/nav/main-navbar";
import withAuth from "../auth/withAuth";

const OrderPage: FC = () => {
  return (
    <div>
      <MainNav />

      <Footer />
    </div>
  );
};

const ProtectedApp = withAuth(OrderPage) as FC;

export default ProtectedApp;
