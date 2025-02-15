import React from "react";

export const metadata = {
    title: "Visi Misi | Yasipikan - Yayasan Sirih Pinang Kebaikan",
    description:
        "Informasi visi dan misi Yayasan Sirih Pinang Kebaikan. Menjadi Lembaga Pelayanan Sosial di Indonesia yang aktif melakukan pelayanan cinta kasih Tuhan kepada sesama serta mendukung pendampingan dan pendidikan kemanusiaan.",
    keywords:
        "Yayasan Sirih Pinang Kebaikan, Yasipikan, Visi, Misi, Pelayanan Sosial, Pendidikan Kemanusiaan, Pendampingan Ekonomi Mikro",
};

export default function VisiMisiPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 flex justify-center items-center">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Visi SiPiKan</h2>
                    <p className="text-blue-100 text-lg">
                        Menjadi Lembaga Pelayanan Sosial di Indonesia yang Aktif Melakukan
                        Pelayanan Cinta Kasih Tuhan kepada Sesama yang Membutuhkannya.
                    </p>
                </div>
                {/* Content Section */}
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi SiPiKan</h2>
                    <ol className="list-decimal ml-5 space-y-3 text-gray-700">
                        <li>
                            Melakukan Pengajaran dan Pendidikan Kemanusiaan kepada Sesama,
                            terutama dari golongan ekonomi menengah ke bawah.
                        </li>
                        <li>
                            Melakukan Pendampingan kepada Pelaku-pelaku Ekonomi Mikro atau Home
                            Industri supaya mereka mandiri.
                        </li>
                        <li>
                            Menghasilkan Karya Tulis yang bersifat Penyadaran Hukum yang bisa
                            dipakai sebagai Pembelajaran Masyarakat.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
