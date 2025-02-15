 

export const metadata = {
  title: "Artikel Yasipikan & Yayasan Sirih Pinang Kebaikan",
  description:
    "Temukan artikel terbaru seputar Yasipikan dan Yayasan Sirih Pinang Kebaikan. Dapatkan informasi dan berita terkini dari komunitas kami.",
  keywords: [
    "Yasipikan",
    "Yayasan Sirih Pinang Kebaikan",
    "artikel",
    "berita",
    "informasi",
    "optimasi"
  ],
  openGraph: {
    title: "Artikel Yasipikan & Yayasan Sirih Pinang Kebaikan",
    description:
      "Temukan artikel terbaru seputar Yasipikan dan Yayasan Sirih Pinang Kebaikan. Dapatkan informasi dan berita terkini dari komunitas kami.",
    url: "https://yayasan-sirih-pinang-kebaikan.com/artikel",
    siteName: "Yasipikan",
    images: [
      {
        url: "https://contohwebsite.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Gambar Artikel Yasipikan & Yayasan Sirih Pinang Kebaikan"
      }
    ],
    locale: "id_ID",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Artikel Yasipikan & Yayasan Sirih Pinang Kebaikan",
    description:
      "Temukan artikel terbaru seputar Yasipikan dan Yayasan Sirih Pinang Kebaikan.",
    image: "https://contohwebsite.com/twitter-image.jpg"
  }
};

import ArticleMain from '@/components/article/article-main';

export default function ArticlePage() {
  return <ArticleMain />;
}