"use client";
import { useEffect } from "react";
import Hero from "@/components/home/hero";
import Assurance from "@/components/home/assurance";
import Action from "@/components/home/action";
import FitnessStore from "@/components/home/fitness-store";
import TrainYourself from "@/components/home/train-yourself";
import Blog from "@/components/home/blog";
import HeroBook from "@/components/home/heroBook";
import { MainNav } from "@/components/common/nav/main-navbar";
import Footer from "@/components/common/footer/footer";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { auth } from "../../firebase";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
  
    if (token) {
      // Check if a user session exists
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          try {
            // Sign in using the token
            await signInWithCustomToken(auth, token);
            console.log("User session restored");
          } catch (error) {
            console.error("Error signing in with token", error);
            localStorage.removeItem("authToken"); // Clear invalid token
          }
        }
      });
    }
  }, []);
  return (
    <div>
      <MainNav />
      <main className="">
        <Hero />
        <HeroBook />
        <TrainYourself />
        <Action />
        <FitnessStore />
        <Assurance />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
