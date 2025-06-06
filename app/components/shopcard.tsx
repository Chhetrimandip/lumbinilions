import React from 'react'
import Image from 'next/image'

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    isFeatured: boolean;
  }
}

const Shopcard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-shadow duration-300">
      <div className="h-64 flex items-center justify-center p-6 bg-neutral-700/30">
        <Image 
          src={product.image}
          alt={product.name}
          width={220}
          height={220}
          className="max-h-[220px] w-auto object-contain"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl text-white font-semibold mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-amber-500 font-bold">${product.price}</span>
          <button className="bg-neutral-700 hover:bg-amber-500 text-white hover:text-black px-4 py-2 rounded transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default Shopcard;