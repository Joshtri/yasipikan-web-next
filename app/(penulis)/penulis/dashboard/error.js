"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <h2 className="text-red-800 text-lg font-semibold mb-2">
          Terjadi kesalahan
        </h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}   