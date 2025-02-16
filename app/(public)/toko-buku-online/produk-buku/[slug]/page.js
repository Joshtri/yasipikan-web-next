import React from 'react'
import DetailProductBook from '@/components/yasipikan-store/product-detail';

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const title = `Buku: ${slug} - Yayasan Sirih Pinang Kebaikan`;
    const description = `Cek detail tentang buku ${slug} di Yayasan Sirih Pinang Kebaikan. Temukan buku menarik dan berkualitas.`;
    const coverUrl = `https://yayasan-sirih-pinang-kebaikan.com/images/covers/${slug}.jpg`;
    
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://yayasan-sirih-pinang-kebaikan.com/toko-buku-online/produk-buku/${slug}`,
            siteName: 'Yayasan Sirih Pinang Kebaikan',
            type: 'website',
            images: [coverUrl]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            image: coverUrl
        }
    }
}

export default function ProdukBuku({ params }) {
    const slug = params.slug;
    return <DetailProductBook bookSlug={slug} />
}
// Compare this snippet from app/%28public%29/artikel/page.js: