

import EditArticle from '@/components/penulis/penulis-edit-article'

export const metadata = {
    title: 'Edit Artikel - Penulis Panel Yasipikan',
}
  
export default function EditArticlePage({params}) {
  return (
    <EditArticle articleId={params.id}/>
  )
}
