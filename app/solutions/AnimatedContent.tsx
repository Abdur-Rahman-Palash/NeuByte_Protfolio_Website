"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import { useState, useEffect } from "react";

const AnimatedContent = () => {
  const [content, setContent] = useState({
    title: "Our Solutions",
    subtitle: "Web Development Excellence",
    description: "Crafting modern, responsive web applications with cutting-edge technologies and AI integration.",
  });

  // Static project data with 8 cards
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with payment integration, user authentication, and admin dashboard.",
      image: "/images/ecommerce.png",
      demoLink: "https://ecommerce-six-fawn.vercel.app/",
      techStack: ["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 2,
      title: "Trip Planning App",
      description: "Collaborative trip planning tool with real-time updates, itinerary management, and travel booking features.",
      image: "/images/neutrip.png",
      demoLink: "https://neutrip.vercel.app/",
      techStack: ["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 3,
      title: "MAF Platform",
      description: "Modern application framework with advanced features, user management, and seamless integration capabilities.",
      image: "/images/MAF.png",
      demoLink: "https://maf-wqvi.vercel.app/",
      techStack:["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 4,
      title: "Job Scanner",
      description: "AI-powered job application tracking system with resume analysis, job matching, and career insights.",
      image: "/images/job.png",
      demoLink: "https://neujobscan.netlify.app/",
      techStack: ["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 5,
      title: "Real Estate Portal",
      description: "Property listing and management platform with advanced search filters, virtual tours, and agent connections.",
      image: "/images/real.png",
      demoLink: "https://real-state-zdg1.vercel.app/",
      techStack: ["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 6,
      title: "E-Learning Platform",
      description: "Educational platform with course creation, student progress tracking, and interactive learning modules.",
      image: "/images/elearn.png",
      demoLink: "https://elearn-ww.vercel.app/",
      techStack: ["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 7,
      title: "Medical Dashboard",
      description: "Healthcare management system with appointment scheduling, patient records, and telemedicine capabilities.",
      image: "/images/one.png",
      demoLink: "https://one-medical-doctor.vercel.app/",
      techStack:["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    },
    {
      id: 8,
      title: "Business Health Dashboard",
      description: "Comprehensive business analytics dashboard with real-time metrics, reporting, and data visualization.",
      image: "/images/bsd.png",
      demoLink: "https://business-health-dashboard-ajjo.vercel.app/",
      techStack:["React", "GSAP Animation", "Next.js", "TypeScript" ,"Tailwind CSS"]
    }
  ];

  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/solutions-content');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    
    loadContent();
  }, []);

  return (
    <>
      {/* Web Development Section */}
      <motion.div
        className="mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            {content.title}
          </h2>
          <h3 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">
            {content.subtitle}
          </h3>
          <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
            {content.description}
          </p>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-12 overflow-hidden"
        >
          <motion.div
            className="-mx-4 flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-full px-4 md:w-1/2 lg:w-1/3"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-one dark:bg-dark">
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                      {project.title}
                    </h4>
                    <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Live Demo Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Explore Our Project
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AnimatedContent;