"use client";

import React from "react";
import Link from "next/link";
import { Card } from "flowbite-react";

export default function TentangYasipikanComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 via-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 mt-12 py-10">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Tentang Yayasan Sirih Pinang Kebaikan
          </h1>
          <p className="text-xl">
            Menyatukan kebaikan, membangun masa depan yang lebih cerah.
          </p>
        </header>

        {/* About Section */}
        <Card className="mb-12 shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 w-full h-64 bg-gray-300 flex items-center justify-center">
              Image placeholder
            </div>
            <div className="p-6 bg-white text-black">
              <h2 className="text-3xl font-semibold mb-4">
                Apa itu Yayasan Sirih Pinang Kebaikan?
              </h2>
              <p className="mb-4 leading-relaxed">
                Yayasan Sirih Pinang Kebaikan, disingkat YaSiPiKan, adalah sebuah yayasan yang bergerak di bidang kemanusiaan, percetakan, pendidikan, dan religi. Kami bertujuan untuk membangun gereja dan negara dengan cara menebarkan kebaikan Allah melalui berbagai program yang inovatif.
              </p>
              <p className="leading-relaxed">
                Didirikan di Kupang – Ibukota Provinsi Nusa Tenggara Timur pada tanggal{" "}
                <strong>22 Desember 2023</strong>, laju perjalanan kebaikan merupakan cerminan komitmen dan kerjasama.
              </p>
            </div>
          </div>
        </Card>

        {/* What We Do Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-8">
            Apa yang Kami Buat?
          </h1>
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Pembuatan ISBN dan Percetakan Buku
                </h2>
                <p className="text-gray-800">
                  Kami menawarkan layanan penerbitan ISBN serta percetakan buku untuk penulis dan penerbit.
                </p>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Pemberdayaan Jemaat dan Ekonomi Jemaat
                </h2>
                <p className="text-gray-800">
                  Kami membantu jemaat dalam pengembangan ekonomi serta pemberdayaan secara berkelanjutan.
                </p>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Kuliah Umum dan Summer Course
                </h2>
                <p className="text-gray-800">
                  Kami menyelenggarakan kuliah umum dan kursus musim panas untuk menambah wawasan dan pengetahuan.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-8">
            Apa yang Sudah Kami Buat?
          </h1>
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Bekerja sama dengan Pendeta dan Penulis
                </h2>
                <p className="text-gray-800">
                  Kami bekerja sama dengan para pendeta dan penulis untuk menuangkan karya dan pemikiran dalam bentuk tulisan.
                </p>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Bekerja sama dan membantu gereja-gereja di daerah 3T
                </h2>
                <p className="text-gray-800">
                  Kami membantu gereja-gereja di daerah 3T untuk meningkatkan SDM dan ekonomi jemaat.
                </p>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Pemberdayaan Berkelanjutan
                </h2>
                <p className="text-gray-800">
                  Kami memberikan pemberdayaan berkelanjutan dalam bentuk materi dan bantuan sosial.
                </p>
              </div>
            </Card>

            {/* Card 4 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Menyediakan Wi-Fi Orbit
                </h2>
                <p className="text-gray-800">
                  Kami menyediakan Wi-Fi Orbit bagi jemaat yang tinggal di daerah dengan akses jaringan yang sulit.
                </p>
              </div>
            </Card>

            {/* Card 5 */}
            <Card className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                Image placeholder
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Pemberian Materi
                </h2>
                <p className="text-gray-800">
                  Kami memberikan materi dari para ahli di bidangnya masing-masing untuk menambah pengetahuan jemaat.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Pembina Section */}
        <section className="mb-16">
          <div className="p-8 mb-10 mt-10 bg-blue-800 text-white rounded-lg">
            <div className="text-right">
              <h1 className="text-6xl font-bold">Pembina</h1>
            </div>
            <div className="mt-12 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-lg border-2 border-black">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Ketua</h2>
                  <p className="text-xl">Pdt. Marthen Luther Djari</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-lg border-2 border-black">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Anggota</h2>
                  <p className="text-xl">Yohana H. Lada-Sitta</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-lg border-2 border-black">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Pengawas</h2>
                  <p className="text-xl">Ruben Denny Djari</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pengurus Section */}
        <section className="mb-16">
          <div className="p-10">
            <h1 className="text-6xl font-bold text-gray-200 mb-10">Pengurus</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Member 1 */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex items-start">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full mr-4">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-800">Ketua</h2>
                  <h3 className="text-xl font-bold text-purple-800">
                    Pdt. Dr. Ebenhaizer I. Nuban Timo, M.A.
                  </h3>
                  <p className="text-gray-700">
                    Lahir di Bimous (Amarasi, NTT), tahun 1965. Meraih gelar doktor teologinya di
                    Theologische Universiteit van de Gereformeerde Kerken di Nederland di Kampen.
                    Pendeta GMIT, dosen UKAW yang mengajar di bidang Sistematika dan merupakan penulis
                    sejumlah buku teologi.
                  </p>
                </div>
              </div>
              {/* Member 2 */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex items-start">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full mr-4">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-800">Sekretaris</h2>
                  <h3 className="text-xl font-bold text-purple-800">
                    Pdt. Dr. Yuda D. Hawu Haba, M.Th
                  </h3>
                  <p className="text-gray-700">
                    Lahir pada 2 Februari 1970. Meraih gelar doktor di bidang Sejarah Gereja di STAKN
                    Kupang pada tahun 2019. Pendeta GMIT, dosen Teologi yang mengajar di Fakultas
                    Teologi UKAW, bidang Sejarah Gereja.
                  </p>
                </div>
              </div>
              {/* Member 3 */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex items-start">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full mr-4">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-800">Bendahara</h2>
                  <h3 className="text-xl font-bold text-purple-800">
                    Maya Djawa, S.Th., M.Pd.K., Ph.D.
                  </h3>
                  <p className="text-gray-700">
                    Lahir di Waikabubak pada 1 Maret 1983. Meraih gelar doktor teologinya di Jangsin
                    University, Korea Selatan pada tahun 2023. Dosen di IAKN Kupang, dan penulis
                    sejumlah buku dan artikel.
                  </p>
                </div>
              </div>
              {/* Member 4 */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex items-start">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full mr-4">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-800">Anggota</h2>
                  <h3 className="text-xl font-bold text-purple-800">Daud Alfons Pandie</h3>
                </div>
              </div>
              {/* Member 5 */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex items-start">
                <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full mr-4">
                  Image placeholder
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-800">Admin</h2>
                  <h3 className="text-xl font-bold text-purple-800">
                    Rumelus Adolf Djada Koroh
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <Card className="mb-12 shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 w-full h-64 bg-gray-300 flex items-center justify-center">
              Image placeholder
            </div>
            <div className="p-6 text-center md:text-left bg-white text-black">
              <h2 className="text-3xl font-semibold mb-4">
                Mari Bergabung Bersama Kami!
              </h2>
              <p className="text-lg mb-6">
                Bergabunglah dengan Yayasan Sirih Pinang Kebaikan untuk menebarkan kebaikan
                Allah dan bersama-sama membangun masa depan yang lebih baik.
              </p>
              <Link href="/kontak">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                  Hubungi Kami
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}