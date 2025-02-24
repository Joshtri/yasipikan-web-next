import React from "react";
const galleryImages = [
    "https://placehold.co/1600x1200?text=Hello\nWorld",
    "https://placehold.co/1600x1200?text=Hello\nWorld",
    "https://placehold.co/1600x1200?text=Hello\nWorld",
    "https://placehold.co/1600x1200?text=Hello\nWorld",
    "https://placehold.co/1600x1200?text=Hello\nWorld",
    "https://placehold.co/1600x1200?text=Hello\nWorld",
    
];

export default function GallerySection() {
  return (
    <section className="  py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold  text-gray-800 mb-6">
          Gallery
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={src}
                alt={`gallery-${index}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
