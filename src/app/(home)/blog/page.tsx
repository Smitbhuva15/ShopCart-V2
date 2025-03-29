import BlogMainPage from '@/compo/Blog/BlogMainPage'
import PageHeader from '@/compo/Common/PageHeader'
import React from 'react'

export default function Blog() {
  return (
    <>
      <PageHeader title="Our Blog Page" curPage="Blog" />
      <BlogMainPage />
    </>

  )
}
