
// import { useEffect, useState } from "react";
import MainStore from "@/components/yasipikan-store/main-store";
import HeroStore from "@/components/yasipikan-store/hero-store";



export const metadata = {
  title: "Belanja Buku Online | Toko Buku Yasipikan",
  description:
    "Temukan berbagai buku berkualitas di toko kami dengan harga terbaik. Mulai dari buku pelajaran, novel, hingga referensi akademik tersedia dengan mudah.",
  keywords: ["yasipikan toko buku", "yayasan sirih pinang kebaikan toko buku"],
};

export default function TokoBukuOnlinePage() {

  return (
    <>
        <HeroStore/>
        <MainStore />
    </>
  );
}