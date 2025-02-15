import ArticleRead from '@/components/article/article-read';

export async function generateMetadata({ params }) {
  const slug = params.slug;
  // Fetch article details from your API using Next.js cache revalidation options
  const res = await fetch(`${import.meta.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/temp/${slug}`, {
    next: { revalidate: 60 } // revalidates the data every 60 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch article details');
  }
  const article = await res.json();

  const title = article?.judul || "Judul Artikel";
  const description = article?.deskripsiSingkat || "Baca artikel menarik kami.";
  const coverImageUrl = article?.coverImageUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://yayasan-sirih-pinang-kebaikan.com/artikel/${slug}`,
      type: 'article',
      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      image: coverImageUrl,
    },
  };
}

export default function ArticleReadPage({ params }) {
  return <ArticleRead articleSlug={params.slug} />;
}