"use client"
import React from 'react'
import Image from 'next/image'
import Shopcard from '../components/shopcard'

const shoppage = () => {
    // Sample product data array
    const products = [
        {
            id: 1,
            name: "Lumbini Lions Home Jersey",
            price: "55.99",
            image: "/jersey.png",
            isFeatured: true
        },
        {
            id: 2,
            name: "Lumbini Lions Away Jersey",
            price: "55.99",
            image: "/awayjersey.jpeg",
            isFeatured: false
        },
        {
            id: 3,
            name: "Lumbini Lions Cap",
            price: "25.99",
            image: "/cap.jpeg",
            isFeatured: false
        },
        {
            id: 4,
            name: "Lumbini Lions Mug",
            price: "15.99",
            image: "/mug.jpeg",
            isFeatured: false
        },
        {
            id: 5,
            name: "Lumbini Lions T-Shirt",
            price: "35.99",
            image: "/tshirt.png",
            isFeatured: false
        },
        {
            id: 6,
            name: "Lumbini Lions Hoodie",
            price: "65.99",
            image: "/hoodie.png",
            isFeatured: false
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-amber-500 mb-8 text-center">
                    <span className="text-amber-500">|</span> OFFICIAL MERCHANDISE
                </h1>
                
                {/* Featured Product */}
                <div className="bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded-xl mb-16 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 flex justify-center items-center p-8">
                            <Image 
                                src="/jersey.png" 
                                alt="Featured Jersey"
                                width={400}
                                height={400}
                                className="w-full max-w-[400px] object-contain"
                            />
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-center p-8">
                            <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] text-white mb-4">Lumbini Lions Official Jersey</h2>
                            <p className="text-gray-300 mb-8">The official match jersey of the Lumbini Lions, featuring advanced moisture management, breathable fabric, and the team&apos;s iconic emblem. Made with recycled polyester, this authentic jersey combines comfort, style, and sustainability.</p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <button className="bg-amber-500 hover:bg-amber-600 text-black text-xl font-['Bebas_Neue'] px-6 py-3 rounded-lg transition-colors">
                                    ADD TO CART — $55.99
                                </button>
                                <button className="bg-neutral-700 hover:bg-neutral-600 text-white text-xl font-['Bebas_Neue'] px-6 py-3 rounded-lg transition-colors">
                                    VIEW DETAILS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {products.filter(product => !product.isFeatured).map(product => (
                        <Shopcard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default shoppage;