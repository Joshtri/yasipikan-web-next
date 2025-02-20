import TentangYasipikanComponent from "@/components/tentang/tentang-yayasan";

export const metadata = {
  title: "Tentang Yayasan Sirih Pinang Kebaikan",
  description:
    "Menyatukan kebaikan, membangun masa depan yang lebih cerah bersama YaSiPiKan.",
  openGraph: {
    title: "Tentang Yayasan Sirih Pinang Kebaikan",
    description:
      "Yayasan Sirih Pinang Kebaikan bergerak dalam bidang kemanusiaan, percetakan, pendidikan, dan religi.",
    url: "https://yayasan-sirih-pinang-kebaikan.com/tentang-yasipikan",
    siteName: "YaSiPiKan",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Yayasan Sirih Pinang Kebaikan",
    description:
      "Menyatukan kebaikan, membangun masa depan yang lebih cerah bersama YaSi ▋PiKan.",

    },
};

export default function TentangYasipikanPage() {
    return <TentangYasipikanComponent />;
}