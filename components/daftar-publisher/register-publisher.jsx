"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, Modal, Button } from 'flowbite-react';
import { FaEnvelope, FaFile, FaPrint, FaUniversity, FaUser } from 'react-icons/fa';
import { FaSquarePhone } from 'react-icons/fa6';
import { MdOutlineWork } from 'react-icons/md';
import { GiWhiteBook } from 'react-icons/gi';
import { SiPowerpages } from 'react-icons/si';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPublisher() {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isDirty }
  } = useForm();
  
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Define fields per step for validation
  const stepFields = [
    // Step 0: User Info
    [
      'namaDepan',
      'namaBelakang',
      'jenisKelamin',
      'nomorTelepon',
      'email',
      'usia'
    ],
    // Step 1: Company Info (Publisher and personal info)
    [
      'institusi',
      'alamat',
      'pekerjaan',
      'layananTerpilih'
    ],
    // Step 2: Book Info
    [
      'judulBuku',
      'fileBuku',
      'ukuranBuku',
      'jumlahHalaman',
      'jumlahCetak',
      'pernahDiterbitkan',
      'jenisBuku',
      'kesiapanNaskah'
    ]
  ];

  const onSubmit = async (data) => {
    // Validate file selection and type for fileBuku
    if (!data.fileBuku || data.fileBuku.length === 0) {
      setServerError('Please select a file to upload.');
      return;
    }
    const file = data.fileBuku[0];
    if (
      file.type !== 'application/pdf' &&
      file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setServerError('Please upload a valid PDF or DOCX file.');
      return;
    }

    const formData = new FormData();
    formData.append('fileBuku', file);
    formData.append('namaDepan', data.namaDepan);
    formData.append('namaBelakang', data.namaBelakang);
    formData.append('gelarDepan', data.gelarDepan || '');
    formData.append('gelarBelakang', data.gelarBelakang || '');
    formData.append('jenisKelamin', data.jenisKelamin);
    formData.append('nomorTelepon', data.nomorTelepon);
    formData.append('email', data.email);
    formData.append('usia', data.usia);
    formData.append('institusi', data.institusi);
    formData.append('pekerjaan', data.pekerjaan);
    formData.append('pekerjaanLain', data.pekerjaanLain || '');
    formData.append('alamat', data.alamat);
    formData.append('layananTerpilih', data.layananTerpilih);
    formData.append('judulBuku', data.judulBuku);
    formData.append('ukuranBuku', data.ukuranBuku);
    formData.append('jumlahHalaman', data.jumlahHalaman);
    formData.append('jumlahCetak', data.jumlahCetak);
    formData.append('pernahDiterbitkan', data.pernahDiterbitkan);
    formData.append('jenisBuku', data.jenisBuku);
    formData.append('kesiapanNaskah', data.kesiapanNaskah);

    try {
      setLoading(true);
      setServerError(null);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSuccessMessage(response.data.message || 'Data berhasil disubmit!');
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setServerError('Error uploading file: ' + (error.response?.data || 'Internal Server Error'));
    }
    setLoading(false);
  };

  const handleNext = async () => {
    // Trigger validation for current step fields
    const valid = await trigger(stepFields[currentStep]);
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handler to prompt exit confirmation if there are unsaved changes.
  const handleExit = () => {
    if (isDirty) {
      setShowExitModal(true);
    } else {
      router.push('/');
    }
  };

  // Setup beforeunload event to warn user when closing tab if form is dirty.
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Stepper indicator component
  const Stepper = () => (
    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse mb-8">
      {['Informasi Penulis', 'Informasi Institusi', 'Informasi Buku'].map((label, index) => (
        <li
          key={index}
          className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
            index === currentStep ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <span
            className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${
              index === currentStep
                ? 'border-blue-600'
                : 'border-gray-500'
            }`}
          >
            {index + 1}
          </span>
          <span>
            <h3 className="font-medium leading-tight">{label}</h3>
          </span>
        </li>
      ))}
    </ol>
  );

  // Render fields based on current step
  const renderStepFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Nama Depan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama Depan"
                className="border rounded p-2"
                {...register('namaDepan', { required: 'Nama Depan is required' })}
              />
              {errors.namaDepan && <p className="text-red-500 text-sm">{errors.namaDepan.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Nama Belakang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama Belakang"
                className="border rounded p-2"
                {...register('namaBelakang', { required: 'Nama Belakang is required' })}
              />
              {errors.namaBelakang && <p className="text-red-500 text-sm">{errors.namaBelakang.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('jenisKelamin', { required: 'Jenis Kelamin is required' })}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaSquarePhone className="mr-2 text-blue-800" /> No Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Nomor Telepon"
                className="border rounded p-2"
                {...register('nomorTelepon', { required: 'Nomor Telepon is required' })}
              />
              {errors.nomorTelepon && <p className="text-red-500 text-sm">{errors.nomorTelepon.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-blue-800" /> Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="E-Mail"
                className="border rounded p-2"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Usia <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('usia', { required: 'Usia is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="18-24">18–24</option>
                <option value="25-34">25–34</option>
                <option value="35-44">35–44</option>
                <option value="45-54">45–54</option>
                <option value="55-64">55–64</option>
                <option value="65+">65+</option>
              </select>
              {errors.usia && <p className="text-red-500 text-sm">{errors.usia.message}</p>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUniversity className="mr-2 text-blue-800" /> Institusi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Institusi"
                className="border rounded p-2"
                {...register('institusi', { required: 'Institusi is required' })}
              />
              {errors.institusi && <p className="text-red-500 text-sm">{errors.institusi.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Alamat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Alamat"
                className="border rounded p-2"
                {...register('alamat', { required: 'Alamat is required' })}
              />
              {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <MdOutlineWork className="mr-2 text-blue-800" /> Pekerjaan <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('pekerjaan', { required: 'Pekerjaan is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="Dosen">Dosen</option>
                <option value="Guru">Guru</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Pengajar">Pengajar</option>
                <option value="Mahasiswa S2/S3">Mahasiswa S2/S3</option>
                <option value="PNS">PNS</option>
                <option value="Profesi Hukum">Profesi Hukum</option>
                <option value="Perawat">Perawat</option>
                <option value="Dokter Ahli">Dokter Ahli</option>
                <option value="Pejabat">Pejabat</option>
                <option value="Perpolitikan">Perpolitikan</option>
                <option value="Motivator">Motivator</option>
                <option value="Widyaiswara">Widyaiswara</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
              {errors.pekerjaan && <p className="text-red-500 text-sm">{errors.pekerjaan.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Layanan Terpilih <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('layananTerpilih', { required: 'Layanan Terpilih is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="Menerbitkan Buku">Menerbitkan Buku</option>
                <option value="Mencetak Buku">Mencetak Buku</option>
              </select>
              {errors.layananTerpilih && <p className="text-red-500 text-sm">{errors.layananTerpilih.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Pekerjaan Lain
              </label>
              <input
                type="text"
                placeholder="Jika ada jenis pekerjaan lainnya"
                className="border rounded p-2"
                {...register('pekerjaanLain')}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Judul Buku <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Judul Buku"
                className="border rounded p-2"
                {...register('judulBuku', { required: 'Judul Buku is required' })}
              />
              {errors.judulBuku && <p className="text-red-500 text-sm">{errors.judulBuku.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaFile className="mr-2 text-blue-800" /> Upload File Buku (format .pdf/.docx) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf, .docx"
                className="border rounded p-2"
                {...register('fileBuku', { required: 'File is required' })}
              />
              {errors.fileBuku && <p className="text-red-500 text-sm">{errors.fileBuku.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <GiWhiteBook className="mr-2 text-blue-800" /> Ukuran Buku <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('ukuranBuku', { required: 'Ukuran Buku is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="A5 (14x20)">A5 (14×20)</option>
                <option value="Unesco (15.5x23)">Unesco (15.5×23)</option>
                <option value="B5 (18x25)">B5 (18×25)</option>
              </select>
              {errors.ukuranBuku && <p className="text-red-500 text-sm">{errors.ukuranBuku.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <SiPowerpages className="mr-2 text-blue-800" /> Jumlah Halaman <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Jumlah Halaman dari buku anda"
                className="border rounded p-2"
                min="0"
                {...register('jumlahHalaman', { required: 'Jumlah Halaman is required' })}
              />
              {errors.jumlahHalaman && <p className="text-red-500 text-sm">{errors.jumlahHalaman.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaPrint className="mr-2 text-blue-800" /> Jumlah Cetak <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Jumlah Cetak Buku"
                className="border rounded p-2"
                min="0"
                {...register('jumlahCetak', { required: 'Jumlah Cetak is required' })}
              />
              {errors.jumlahCetak && <p className="text-red-500 text-sm">{errors.jumlahCetak.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Pernah Diterbitkan atau Kontak Konsultan <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('pernahDiterbitkan', { required: 'This field is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="Sudah, pernah menerbitkan buku di Yayasan Sirih Pinang Kebaikan">
                  Sudah, pernah menerbitkan buku di Yayasan Sirih Pinang Kebaikan
                </option>
                <option value="Belum, pernah menerbitkan buku di Yayasan Sirih Pinang Kebaikan">
                  Belum, pernah menerbitkan buku di Yayasan Sirih Pinang Kebaikan
                </option>
                <option value="Sudah, pernah berkomunikasi dengan konsultan Yayasan Sirih Pinang Kebaikan">
                  Sudah, pernah berkomunikasi dengan konsultan Yayasan Sirih Pinang Kebaikan
                </option>
                <option value="Belum, pernah berkomunikasi dengan konsultan Yayasan Sirih Pinang Kebaikan">
                  Belum, pernah berkomunikasi dengan konsultan Yayasan Sirih Pinang Kebaikan
                </option>
              </select>
              {errors.pernahDiterbitkan && <p className="text-red-500 text-sm">{errors.pernahDiterbitkan.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Jenis Buku <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('jenisBuku', { required: 'Jenis Buku is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="Non Fiksi">Non Fiksi</option>
                <option value="Fiksi">Fiksi</option>
              </select>
              {errors.jenisBuku && <p className="text-red-500 text-sm">{errors.jenisBuku.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-800" /> Kesiapan Naskah <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded p-2"
                {...register('kesiapanNaskah', { required: 'Kesiapan Naskah is required' })}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="Naskah 0-50 %">Naskah 0-50 %</option>
                <option value="Naskah lebih dari 50%">Naskah lebih dari 50%</option>
                <option value="Naskah lebih dari 80 %">Naskah lebih dari 80 %</option>
                <option value="Naskah Selesai">Naskah Selesai</option>
              </select>
              {errors.kesiapanNaskah && <p className="text-red-500 text-sm">{errors.kesiapanNaskah.message}</p>}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center pt-10 pb-10 min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          FORMULIR DAFTAR MENJADI PENULIS
        </h1>
        {successMessage ? (
          <div className="p-6 bg-green-100 text-green-700 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Pendaftaran Berhasil!</h2>
            <p>{successMessage}</p>
            <p className="mb-5">
              Selamat, Anda telah berhasil mendaftar sebagai penulis di penerbit kami.
            </p>
            <Link href="/">
              <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 block">
                KEMBALI KE BERANDA
              </a>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stepper />
            {renderStepFields()}
            {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleExit}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Batal
              </button>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Sebelumnya
                </button>
              )}
              {currentStep < stepFields.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-auto"
                >
                  Selanjutnya
                </button>
              )}
              {currentStep === stepFields.length - 1 && (
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded ml-auto ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Loading...' : 'DAFTAR'}
                </button>
              )}
            </div>
          </form>
        )}

        {/* Exit Confirmation Modal */}
        <Modal show={showExitModal} onClose={() => setShowExitModal(false)}>
          <Modal.Header>Konfirmasi Keluar</Modal.Header>
          <Modal.Body>
            <p>Anda memiliki data yang belum disimpan. Apakah Anda yakin ingin meninggalkan halaman ini?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setShowExitModal(false)}>
              Tetap di halaman ini
            </Button>
            <Button onClick={() => {
              setShowExitModal(false);
              reset();
              router.push('/');
            }}>
              Tinggalkan Halaman
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
}