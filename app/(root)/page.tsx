import React from "react";
import "./rootpage.css";
import Image from "next/image";
import Secondpage from "../components/secondpage";
import Thirdpage from "../components/thirdpage";
import QuizPage from "../quizpage/page";
import ResultsSection from "../components/ResultsSection";
import ScrollEffects from "../components/scrolleffects";
import FixturesSection from "../components/FixturesSection";


// Data for match results
const resultArray = [
  { id: 1, team2: "Sudur Paschim Royals", margin: 45, victory: false, teamLogo: "/sudur.png" },
  { id: 2, team2: "Janakpur Bolts", margin: 1, victory: false, teamLogo: "/janakpur.png" },
  { id: 3, team2: "Chitwan Rhinos", margin: 33, victory: true, teamLogo: "/chitwan.png" },
  /*{ id: 4, team2: "Kathmandu Gurkhas", margin: 18, victory: false, teamLogo: "/kathmandu.png" },
  { id: 5, team2: "Pokhara Avengers", margin: 10, victory: false, teamLogo: "/pokhara.png" },
  { id: 6, team2: "Biratnagar Kings", margin: 0, victory: false, teamLogo: "/biratnagar.png" },
  { id: 7, team2: "Karnali Yaks", margin: 0, victory: false, teamLogo: "/karnali.png" }*/
];
const fixturesArray = [
  { id: 1, team2: "Pokhara Avengers", team2Logo: "/pokhara.png", date: "6 DEC", time: "1:15 PM" },
  { id: 2, team2: "Kathmandu Gurkhas", team2Logo: "/kathmandu.png", date: "10 DEC", time: "1:15 PM" },
  { id: 3, team2: "Biratnagar Kings", team2Logo: "/biratnagar.png", date: "12 DEC", time: "9:15 AM" },
  { id: 4, team2: "Karnali Yaks", team2Logo: "/karnali.png", date: "14 DEC", time: "9:15 AM" }
];

export default async function RootPage() {

  return (
    <>
      {/* Global background image */}
      <div className="fixed inset-0 z-[-1] w-full h-full">
        <Image
          src="/headerbg.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>
      
      <ScrollEffects />
{/* Hero Section - With adjusted mobile positioning */}
<div className="relative w-full h-screen overflow-hidden">
  {/* Single container for positioning both images */}
  <div className="absolute inset-0 flex items-center md:items-center justify-center">
    {/* Moved up for mobile by changing items-center to items-start with padding */}
    <div className="relative w-full h-full flex items-start md:items-center justify-center pt-[5%] md:pt-0 transform scale-[0.95] sm:scale-100 md:scale-110">
      {/* Ellipse image positioned relative to container */}
      <Image 
        src="/ellipse.png" 
        width={2400}
        height={1000}
        className="absolute w-[90%] object-contain sm:scale-100 z-[40] bottom-[40%] md:bottom-[-80%]"
        alt="Background ellipse"
        priority
        unoptimized={true}
      />
      
      {/* Team image positioned relative to container */}
      <Image 
        src="/team.png" 
        width={1500}
        height={1000}
        className="absolute w-[1000%] md:w-[65%] object-contain z-[60] bottom-[40%] md:bottom-0"
        alt="Team image"
        priority
        unoptimized={true}
      />
    </div>
  </div>
{/* Gradient overlay - extend higher and lower on mobile */}
<div className="absolute bottom-[28%] md:bottom-0 left-0 right-0 h-[40%] md:h-1/6 bg-gradient-to-t from-[#06101B] via-[#06101B]/90 to-transparent z-[90]"></div>
  {/* Sponsors section - moved higher on mobile */}
  <div className="absolute bottom-[30%] md:bottom-0 left-0 w-full z-[110]">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6 md:gap-8">
        {[
          { src: "/ncell.png", alt: "Ncell" },
          { src: "/buddhaair.png", alt: "Buddha Air" },
          { src: "/hilife.png", alt: "Hi-Life" },
          { src: "/babu88.png", alt: "Babu88" },
          { src: "/yeti.png", alt: "Yeti Airlines" },
          { src: "/fortuna.png", alt: "Fortuna" },
          { src: "/nidpil.png", alt: "NIDPIL" },
          { src: "/folliderm.png", alt: "Folliderm" }
        ].map((sponsor, index) => (
          <div key={index} className="flex justify-center items-center">
            <Image 
              src={sponsor.src}
              width={300}
              height={300}
              alt={sponsor.alt}
              className="h-8 sm:h-10 w-auto object-contain opacity-100 hover:opacity-100 transition-all duration-300 hover:scale-110 brightness-[1.5] contrast-[1.1]"
              style={{ filter: "brightness(3) contrast(1.8)" }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


{/* Bottom Sections - responsive margin adjustment */}
<div className="relative bg-[#06101B] mt-[-50%] md:mt-[-1px]">
  {/* Semi-transparent background for better readability */}
  <div className="absolute inset-0 bg-[#06101B] z-1"></div>
  <div className="relative z-10">
    <div className="pt-10">
      <ResultsSection results={resultArray} />
    </div>
    <FixturesSection fixtures={fixturesArray} />

    <QuizPage />
    <Secondpage />
    <Thirdpage />
  </div>
</div>
    </>
  );
}