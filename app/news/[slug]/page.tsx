// app/news/[slug]/page.tsx
export const dynamic = 'force-dynamic';
import React from 'react'
import { prisma } from '@/lib/db'
import { parseEditorJSContent } from '@/lib/editorjs-parser'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next';


type Props = {
  params: { slug: string }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  });
  
  if (!post) return { title: 'Article Not Found' };
  
  return {
    title: `${post.title} | Lumbini Lions`,
    description: post.content.substring(0, 160)
  };
}


export default async function BlogPostPage({ params }: Props) {

  
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  });
  if (!post) {
    notFound();
  }
  
  // Format the date
  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get the first image for the header if exists
  /*const headerImageUrl = getFirstImageFromContent(post.content) || post.imageUrl || '/news.jpg';*/
  
  // Parse the EditorJS content
  const contentElements = parseEditorJSContent(post.content);
  console.log("the content recieved : " , post)

  
  return (
    <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/news" className="text-amber-500 hover:text-amber-400 mb-6 inline-block">
          ← Back to News
        </Link>
        
        {/* Article Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-400 mb-8">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{publishDate}</span>
          </div>
          
          {/* Featured Image can be implemnted to show the top image*/}
            
        </div>
        
        {/* Article Content */}
        <article className="prose prose-invert prose-amber max-w-none">
          {contentElements}
        </article>
        
        {/* Share and Related Articles */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <h3 className="text-2xl font-['Bebas_Neue'] text-amber-500 mb-6">
            SHARE THIS ARTICLE
          </h3>
          
          <div className="flex gap-4">
            <button className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"/></svg>
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}