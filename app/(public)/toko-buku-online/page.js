"use client";
import { useRef } from "react";
import MainStore from "@/components/yasipikan-store/main-store";
import HeroStore from "@/components/yasipikan-store/hero-store";

export default function TokoBukuOnlinePage() {
  const mainStoreRef = useRef(null);

  const scrollToMainStore = () => {
    if (mainStoreRef.current) {
      mainStoreRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <HeroStore scrollToMainStore={scrollToMainStore} />
      {/* Ensure MainStore has the ref applied correctly */}
      <section ref={mainStoreRef}>
        <MainStore />
      </section>
    </>
  );
}
