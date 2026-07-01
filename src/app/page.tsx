"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Bento from "@/components/sections/Bento";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Hero />
      <About />
      <Bento onOpenDrawer={() => { setDrawerOpen(true); }} />
      <Contact drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}