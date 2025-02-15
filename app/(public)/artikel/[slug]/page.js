import ArticleRead from '@/components/article/article-read';
import { getArticleDetails } from '@/lib/articles';

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const article = await getArticleDetails(slug);

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