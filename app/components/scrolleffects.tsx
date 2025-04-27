"use client";
import { useEffect, useRef } from "react";

interface ScrollEffectsProps {
  onNavbarVisibilityChange?: (isVisible: boolean) => void;
}

export default function ScrollEffects({ onNavbarVisibilityChange }: ScrollEffectsProps) {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const img = document.querySelector(".fade-in-on-scroll");

    const handleScroll = () => {
      // Trigger fade-in if image is in view
      if (img) {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          img.classList.add("show");
        }
      }

      const currentScrollY = window.scrollY;

      // Navbar visibility logic
      if (onNavbarVisibilityChange) {
        onNavbarVisibilityChange(
          currentScrollY < 100 || currentScrollY < lastScrollY.current
        );
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onNavbarVisibilityChange]);

  return null; // This component doesn't render anything
}