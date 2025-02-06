"use client";
import React, { useState, useEffect } from "react";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function MainNav() {
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <MobileNav />
      <DesktopNav />
    </nav>
  );
}
