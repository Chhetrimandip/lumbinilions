
"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link'


//Add proper Typescript typing
interface FeaturedNewsProps {
    displayFeatured : {
        id :string |number;
        title: string;
        slug?: string;
        image? : string;
        subtitle? : string;
        content: string;
    };
    ExcerptFromContent : string;
}

function FeaturedNewsClient  ({displayFeatured,ExcerptFromContent}: FeaturedNewsProps)  {



return(
<div className="bg-amber-500/10 backdrop-blur-sm rounded-xl mb-16 overflow-hidden border border-amber-500/40">
<div className="relative h-96">
        <Image 
          src={displayFeatured.image || '/news.jpg'}
          alt="Featured News"
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/news.jpg';
          }}
        />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-8">
        <span className="inline-block bg-amber-500 text-black px-3 py-1 rounded text-sm font-semibold mb-3">FEATURED</span>
        <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] text-white mb-2">{displayFeatured.title}</h2>
        <p className="text-gray-200 mb-4 max-w-3xl">
            {ExcerptFromContent}
        </p>
        <Link 
            href={`/news/${displayFeatured.slug || displayFeatured.id}`}
            className="bg-white hover:bg-amber-500 text-black text-xl font-['Bebas_Neue'] px-6 py-2 rounded-lg transition-colors inline-block"
        >
            READ FULL STORY
        </Link>
    </div>
</div>
</div>
)
}

export default FeaturedNewsClient;