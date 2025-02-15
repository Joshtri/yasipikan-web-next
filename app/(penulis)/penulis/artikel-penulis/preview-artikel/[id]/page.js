import PreviewArticle from '@/components/penulis/penulis-preview-article'
import React from 'react'

export const metadata = {
  title: 'Preview Artikel - Penulis Panel Yasipikan',
}

export default function PreviewArticlePage({params}) {
  return (
    // <div>PreviewArtikelPage</div>
    <PreviewArticle articleId={params.id}/>
  )
}
