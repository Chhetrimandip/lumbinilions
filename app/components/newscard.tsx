// app/components/newscard.tsx
"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFirstImageFromContent, getExcerptFromContent } from '@/lib/editorjs-parser'

interface NewsType {
    id: number | string;
    title: string;
    subtitle?: string;
    slug?: string;
    image?: string;
    content: string;
    date: string;
    author?: string;
}

type NewsProp = {
    news: NewsType
}

const Newscard: React.FC<NewsProp> = ({ news }) => {
    // Get image from content if not directly provided
    console.log("the content recieved : " , news)
    const imageUrl = news.image || getFirstImageFromContent(news.content) || '/news.jpg';
    
    // Get excerpt from content if no subtitle
    const subtitle = news.subtitle || getExcerptFromContent(news.content, 100);
    
    // Create link to full article
    const articleUrl = news.slug ? `/news/${news.slug}` : `/news/article/${news.id}`;
    
    return (
        <div className="bg-neutral-800 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-shadow duration-300">
            <div className="relative h-48">
                <Image 
                    src={imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                        // Fallback image if the main one fails to load
                        (e.target as HTMLImageElement).src = '/news.jpg';
                    }}
                />
            </div>
            
            <div className="p-5">
                <span className="text-amber-500 text-sm">{news.date}</span>
                <h3 className="text-xl text-white font-semibold mt-2 mb-2">{news.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
                <Link href={articleUrl} className="text-amber-500 hover:text-amber-400 font-semibold transition-colors">
                    Read More →
                </Link>
            </div>
        </div>
    );
}

export default Newscard;