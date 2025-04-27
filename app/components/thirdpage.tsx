import React from 'react'
import Image from 'next/image'

const Thirdpage = () => {
    return (
        <div className="w-full min-h-screen relative overflow-hidden text-white px-4 py-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
            <Image
                src="/headerbg.jpg"
                alt="Cricket Stadium"
                fill
                className="object-cover"
                priority
            />
            {/* Darker overlay for better text readability */}
            <div className="absolute inset-0 bg-black/85"></div>
            
            {/* Stronger vignette effect (darker corners) */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80"></div>
            
            {/* Enhanced bottom shadow for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* Content container with proper z-index */}
            <div className="relative z-20 max-w-7xl mx-auto">
            {/* Heading */}
            <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-['Bebas_Neue'] uppercase mb-16 text-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                Upcoming Matches
            </h2>

            {/* Match Schedule Cards */}
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {/* Match 1 */}
                <div className="bg-neutral-900/90 backdrop-blur-sm rounded-lg p-4 md:p-6 hover:bg-neutral-800/90 transition-colors border border-neutral-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-1">
                    <div className="text-center w-20">
                        <Image 
                        src="/logo.png"
                        alt="Lumbini Lions"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">Lions</span>
                    </div>
                    <div className="text-center">
                        <span className="text-2xl font-bold">VS</span>
                    </div>
                    <div className="text-center w-20">
                        <Image 
                        src="/kathmandu.png"
                        alt="Kathmandu Kings"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">Kings</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-right">
                    <div className="flex flex-col md:items-end">
                        <p className="text-amber-500 text-lg md:text-xl font-['Bebas_Neue'] uppercase">Match #1</p>
                        <p className="text-gray-400">May 15, 2023 • 2:00 PM</p>
                        <p className="text-white font-semibold mt-1">Lumbini Cricket Stadium</p>
                        <button className="mt-3 inline-block bg-amber-600 hover:bg-amber-700 text-black font-semibold px-4 py-2 rounded transition-colors text-sm">
                        Buy Tickets
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                
                {/* Match 2 */}
                <div className="bg-neutral-900/90 backdrop-blur-sm rounded-lg p-4 md:p-6 hover:bg-neutral-800/90 transition-colors border border-neutral-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-1">
                    <div className="text-center w-20">
                        <Image 
                        src="/pokhara.png"
                        alt="Pokhara Avengers"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">Avengers</span>
                    </div>
                    <div className="text-center">
                        <span className="text-2xl font-bold">VS</span>
                    </div>
                    <div className="text-center w-20">
                        <Image 
                        src="/logo.png"
                        alt="Lumbini Lions"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">Lions</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-right">
                    <div className="flex flex-col md:items-end">
                        <p className="text-amber-500 text-lg md:text-xl font-['Bebas_Neue'] uppercase">Match #2</p>
                        <p className="text-gray-400">May 22, 2023 • 4:30 PM</p>
                        <p className="text-white font-semibold mt-1">Pokhara Stadium</p>
                        <button className="mt-3 inline-block bg-amber-600 hover:bg-amber-700 text-black font-semibold px-4 py-2 rounded transition-colors text-sm">
                        Buy Tickets
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                
                {/* Match 3 */}
                <div className="bg-neutral-900/90 backdrop-blur-sm rounded-lg p-4 md:p-6 hover:bg-neutral-800/90 transition-colors border border-neutral-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-1">
                    <div className="text-center w-20">
                        <Image 
                        src="/logo.png"
                        alt="Lumbini Lions"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">Lions</span>
                    </div>
                    <div className="text-center">
                        <span className="text-2xl font-bold">VS</span>
                    </div>
                    <div className="text-center w-20">
                        <Image 
                        src="/chitwan.png"
                        alt="Chitwan Rhinos"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mx-auto"
                        />
                        <span className="text-sm mt-2 block">Rhinos</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-right">
                    <div className="flex flex-col md:items-end">
                        <p className="text-amber-500 text-lg md:text-xl font-['Bebas_Neue'] uppercase">Match #3</p>
                        <p className="text-gray-400">May 29, 2023 • 2:00 PM</p>
                        <p className="text-white font-semibold mt-1">Lumbini Cricket Stadium</p>
                        <button className="mt-3 inline-block bg-amber-600 hover:bg-amber-700 text-black font-semibold px-4 py-2 rounded transition-colors text-sm">
                        Buy Tickets
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
            {/* View All Matches Button */}
            <div className="text-center mt-10">
                <button className="bg-neutral-900 hover:bg-neutral-800 text-white text-xl font-['Bebas_Neue'] px-8 py-3 rounded-lg transition-colors border border-neutral-700">
                VIEW FULL SCHEDULE
                </button>
            </div>
            </div>
        </div>
    );
}

export default Thirdpage;