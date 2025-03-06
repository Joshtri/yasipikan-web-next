"use client"

import dynamic from "next/dynamic";

const ArticleSection = dynamic(() => import("@/components/home/article-section"), {
  ssr: false, // ⛔️ MATIKAN SSR
});import GallerySection from "@/components/home/gallery-section";
import HomeSection from "@/components/home/main";
import HomeServices from "@/components/home/services";
 // import Image from "next/image";

export default function RootPage() {
  return (
    <>
    <div className="bg-gray-200">
      <HomeSection/>
      <HomeServices/>


      <GallerySection/>

      <ArticleSection/>
    </div>
    </>
  );  
}
