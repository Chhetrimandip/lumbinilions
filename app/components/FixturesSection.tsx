"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FixtureProps {
  id: number;
  team2: string;
  team2Logo: string;
  date: string;
  time: string;
}

interface FixturesSectionProps {
  fixtures: FixtureProps[];
}

export default function FixturesSection({ fixtures }: FixturesSectionProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="w-full max-w-[1320px] flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full px-3.5 mb-12 flex flex-col items-center">
          <h4 className="text-amber-500 text-base font-medium leading-loose">
            Matches & Results
          </h4>
          <h2 className="text-white text-3xl font-normal uppercase leading-[62px] tracking-wide">
            Upcoming Matches
          </h2>
        </div>

        {/* Featured Match */}
        <div className="w-full border-t-2 border-b-2 border-slate-800 py-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Team 1 */}
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-4">
                <Image
                  src="/logo.png"
                  alt="Lumbini Lions Logo"
                  width={140}
                  height={140}
                  className="w-16 h-16 md:w-44 md:h-44 object-contain"
                />
              </div>
              <div className="text-white text-xl font-bold uppercase">
                Lumbini Lions
              </div>
            </div>

            {/* Match Time */}
            <div className="text-white text-lg md:text-2xl font-normal uppercase mb-4 md:mb-0 text-center">
              5 Dec | 9:15 AM
            </div>

            {/* Team 2 */}
            <div className="flex items-center flex-row-reverse md:flex-row">
              <div className="ml-4 md:mr-4 md:ml-0">
                <Image
                  src="/janakpur.png"
                  alt="Janakpur Bolts Logo"
                  width={96}
                  height={96}
                  className="w-16 h-16 md:w-24 md:h-24 object-contain"
                />
              </div>
              <div className="text-white text-xl font-bold uppercase text-right md:text-left">
                Janakpur Bolts
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Fixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {fixtures.map((fixture) => (
            <div 
              key={fixture.id} 
              className="border-b-2 border-slate-800 py-6 flex items-center justify-between"
            >
              {/* Team 1 (Lions) */}
              <div>
              <Image
                src="/logo.png"
                alt="Lumbini Lions Logo"
                width={140}
                height={140}
                className="w-16 h-16 md:w-44 md:h-44 object-contain"
              />
              </div>

              {/* Match Time */}
              <div className="text-white text-lg md:text-xl font-normal uppercase text-center w-40">
              {fixture.date} | {fixture.time}
              </div>

              {/* Team 2 */}
              <div>
              <Image
                src={fixture.team2Logo}
                alt={`${fixture.team2} Logo`}
                width={100}
                height={100}
                className="w-16 h-16 md:w-24 md:h-24 object-contain"
              />
              </div>
            </div>
          ))}
        </div>

        {/* All Fixtures Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/fixtures" 
            className="bg-red-500 rounded-3xl px-6 py-2.5 text-white font-bold flex items-center"
          >
            All Fixtures & Standings
            <svg className="ml-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.51807 7.99998C1.51807 7.85776 1.56251 7.7422 1.6514 7.65331C1.74029 7.56442 1.85584 7.51998 1.99807 7.51998H13.7847L10.6381 4.37331C10.5314 4.26665 10.4781 4.1422 10.4781 3.99998C10.4781 3.85776 10.5314 3.7422 10.6381 3.65331C10.7447 3.56442 10.8692 3.51998 11.0114 3.51998C11.1536 3.51998 11.2781 3.55554 11.3847 3.62665L15.3847 7.62665C15.4558 7.73331 15.4914 7.85776 15.4914 7.99998C15.4914 8.1422 15.4558 8.26665 15.3847 8.37331L11.3847 12.3733C11.2781 12.4444 11.1536 12.48 11.0114 12.48C10.8692 12.48 10.7447 12.4355 10.6381 12.3466C10.5314 12.2578 10.4781 12.1422 10.4781 12C10.4781 11.8578 10.5314 11.7333 10.6381 11.6266L13.7847 8.47998H1.99807C1.85584 8.47998 1.74029 8.43554 1.6514 8.34665C1.56251 8.25776 1.51807 8.1422 1.51807 7.99998Z" fill="white"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}