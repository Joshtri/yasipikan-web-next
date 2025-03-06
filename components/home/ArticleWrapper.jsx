"use client";

import dynamic from "next/dynamic";
const ArticleSection = dynamic(() => import("@/components/home/article-section"), { ssr: false });

export default function ArticleWrapper() {
  return <ArticleSection />;
}
