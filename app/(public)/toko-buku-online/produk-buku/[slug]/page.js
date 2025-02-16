import DetailProductBook from '@/components/yasipikan-store/product-detail';

export async function generateMetadata({ params }) {
    const slug = params.slug;
    
    // Fetch book product details from your API using Next.js cache revalidation options
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/books/slug/${slug}`, {
        next: { revalidate: 60 } // revalidates the data every 60 seconds
    });

    if (!res.ok) {
        throw new Error('Failed to fetch book details');
    }
    
    const { data: book } = await res.json();

    console.log(book);
    
    if (!book || !book.slug) {
      throw new Error("Data buku tidak lengkap atau tidak ditemukan");
    }
    
    const title = `Buku: ${book.slug} - Yayasan Sirih Pinang Kebaikan`;
    const description = `Cek detail tentang buku ${book.slug} di Yayasan Sirih Pinang Kebaikan. Temukan buku menarik dan berkualitas.`;
    const keywords = book.keywords || 'buku, Yayasan Sirih Pinang Kebaikan, toko buku online';
    const coverUrl = book.coverUrl || '/default-cover.jpg';

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url: `https://yayasan-sirih-pinang-kebaikan.com/toko-buku-online/produk-buku/${slug}`,
            siteName: 'Yayasan Sirih Pinang Kebaikan',
            type: 'website',
            images: [
              {
                url: coverUrl,
                width: 1200,
                height: 630,
                alt: title
              }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            image: coverUrl
        },
        alternates: {
            canonical: `https://yayasan-sirih-pinang-kebaikan.com/toko-buku-online/produk-buku/${slug}`,
            languages: {
                'id': `https://yayasan-sirih-pinang-kebaikan.com/id/toko-buku-online/produk-buku/${slug}`
            }
        }
    };
}

export default function ProdukBuku({ params }) {
    const slug = params.slug;
    return <DetailProductBook bookSlug={slug} />;
}