import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP Scroll Animations for specific sections
export const initScrollAnimations = () => {
  if (typeof window === "undefined") return;

  // Hero section parallax effect
  gsap.to(".hero-bg", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Fade in elements on scroll
  gsap.utils.toArray(".gsap-fade-in").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Scale in animations
  gsap.utils.toArray(".gsap-scale-in").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Slide in from left
  gsap.utils.toArray(".gsap-slide-left").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Slide in from right
  gsap.utils.toArray(".gsap-slide-right").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Stagger animations for lists
  gsap.utils.toArray(".gsap-stagger").forEach((container: any) => {
    const items = container.querySelectorAll(".gsap-stagger-item");

    gsap.fromTo(
      items,
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
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Counter animations
  gsap.utils.toArray(".gsap-counter").forEach((element: any) => {
    const target = parseInt(element.dataset.target || "0");
    const duration = parseFloat(element.dataset.duration || "2");

    gsap.fromTo(
      element,
      { innerText: 0 },
      {
        innerText: target,
        duration: duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Progress bar animations
  gsap.utils.toArray(".gsap-progress").forEach((element: any) => {
    gsap.fromTo(
      element,
      { width: "0%" },
      {
        width: element.dataset.width || "100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

// Utility function to create custom scroll animations
export const createScrollAnimation = (
  trigger: string | Element,
  animation: gsap.TimelineVars | gsap.TweenVars,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  } = {}
) => {
  if (typeof window === "undefined") return null;

  return ScrollTrigger.create({
    trigger,
    start: options.start || "top 80%",
    end: options.end || "bottom 20%",
    scrub: options.scrub || false,
    pin: options.pin || false,
    markers: options.markers || false,
    animation: gsap.timeline().to(trigger, animation),
  });
};

// Cleanup function for scroll triggers
export const cleanupScrollAnimations = () => {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Reinitialize on route change (for SPA behavior)
export const reinitializeScrollAnimations = () => {
  cleanupScrollAnimations();
  initScrollAnimations();
};