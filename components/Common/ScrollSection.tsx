"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "slide-left" | "slide-right" | "scale" | "stagger";
  delay?: number;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className = "",
  animationType = "fade",
  delay = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    // Capture the current ref value for cleanup
    const currentElement = sectionRef.current;

    gsap.registerPlugin(ScrollTrigger);

    let animation: gsap.core.Timeline | gsap.core.Tween;

    switch (animationType) {
      case "fade":
        animation = gsap.fromTo(
          currentElement,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay,
          }
        );
        break;

      case "slide-left":
        animation = gsap.fromTo(
          currentElement,
          {
            opacity: 0,
            x: -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            delay,
          }
        );
        break;

      case "slide-right":
        animation = gsap.fromTo(
          currentElement,
          {
            opacity: 0,
            x: 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            delay,
          }
        );
        break;

      case "scale":
        animation = gsap.fromTo(
          currentElement,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay,
          }
        );
        break;

      case "stagger":
        const children = currentElement.children;
        animation = gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay,
          }
        );
        break;

      default:
        animation = gsap.fromTo(
          currentElement,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay }
        );
    }

    ScrollTrigger.create({
      trigger: currentElement,
      start: "top 80%",
      end: "bottom 20%",
      animation,
      toggleActions: "play none none reverse",
    });

    return () => {
      if (animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === currentElement) {
          trigger.kill();
        }
      });
    };
  }, [animationType, delay]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollSection;