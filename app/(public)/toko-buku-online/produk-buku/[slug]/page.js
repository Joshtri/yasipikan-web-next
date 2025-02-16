import React from 'react'
import ProductBook from '@/components/yasipikan-store/product-detail';

export default function ProdukBuku({params}) {
    const slug =  params.slug;
  return (
    <ProductBook bookSlug={slug} />
  )
}
