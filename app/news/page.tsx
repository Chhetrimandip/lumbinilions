import React from 'react'
import Link from 'next/link'

import Newscard from '../components/newscard'
import { prisma } from '@/lib/db'
import { getExcerptFromContent, getFirstImageFromContent } from '@/lib/editorjs-parser'
import FeaturedNewsClient from '../components/FeaturedNewsClient'

// This must be a Server Component to directly use Prisma
export default async function NewsPage() {
    // Fetch blog posts from database
    const blogPosts = await prisma.blogPost.findMany({
        orderBy: {
            publishedAt: 'desc',
        },
        take: 6,
    });

    // Transform database posts to match the news format expected by Newscard
    const newsItems = blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        image: post.imageUrl || getFirstImageFromContent(post.content) || '/news.jpg',
        content: post.content,
        date: new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        author: post.author || 'Lumbini Lions'
    }));

    // Featured post is the most recent one
    const featuredPost = newsItems[0];

    // Fallback news array in case database is empty
    const fallbackNews = [
        {
            id: 1,
            title: "Lumbini Lions Sign Star Batsman Rajesh Kumar",
            subtitle: "The 28-year-old joins from Chitwan Rhinos on a two-year deal",
            image: "/news2.webp",
            date: "April 15, 2023",
            content: "The Lumbini Lions have completed the signing of star batsman Rajesh Kumar from rivals Chitwan Rhinos for an undisclosed fee. Kumar, who scored 412 runs in last season's tournament, has signed a two-year contract with the Lions. This acquisition is expected to significantly strengthen the Lions' batting lineup for the upcoming season."
        },
        // ... your other fallback news items
    ];

    // Use database posts if available, otherwise use fallback
    const displayNews = newsItems.length > 0 ? newsItems : fallbackNews;
    const displayFeatured = featuredPost || fallbackNews[0];
    const excerpt = getExcerptFromContent(displayFeatured.content, 150) || displayFeatured.subtitle || ''

    return (
        <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-amber-500 mb-8 text-center">
                    <span className="text-amber-500">|</span> LATEST NEWS
                </h1>
                
                {/* Featured News */}
                <FeaturedNewsClient displayFeatured = {displayFeatured} ExcerptFromContent = {excerpt}/>
                
                {/* News Grid - Skip the first item since it's featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {displayNews.slice(1).map(news => (
                        <Newscard key={news.id} news={news} />
                    ))}
                </div>
                
                {/* Load More Button */}
                <div className="text-center mt-10">
                    <Link 
                        href="/news/archive"
                        className="bg-neutral-800 hover:bg-neutral-700 text-white text-xl font-['Bebas_Neue'] px-8 py-3 rounded-lg transition-colors inline-block"
                    >
                        VIEW ALL NEWS
                    </Link>
                </div>
            </div>
        </div>
    );
}