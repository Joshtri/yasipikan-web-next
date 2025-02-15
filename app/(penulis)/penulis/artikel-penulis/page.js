import ArticleList from '@/components/penulis/penulis-list-article';
import { Suspense } from 'react';

export const metadata = {
  title: 'Daftar Artikel | Dashboard Penulis',
//   description: 'Kelola artikel-artikel yang telah Anda publikasikan',
};

export default function PostedArticlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleList />
    </Suspense>
  );
}