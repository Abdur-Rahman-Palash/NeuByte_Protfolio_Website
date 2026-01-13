"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import { useState, useEffect } from "react";

const AnimatedContent = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({
    title: "Our Solutions",
    subtitle: "Web Development Excellence",
    description: "Crafting modern, responsive web applications with cutting-edge technologies and AI integration.",
    buttonText: "See Our Projects",
    showProjects: true // Default to true for better UX
  });

  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/solutions-content');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
          // Only show projects button if enabled in admin
          if (!data.showProjects) {
            setShowProjects(false);
          }
        }
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    
    loadContent();
  }, []);

  const loadProjects = async () => {
    if (projects.length > 0) return projects; // Already loaded
    
    console.log('🚀 Loading projects...');
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      console.log('📡 API Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 Projects loaded:', data.length, 'projects');
        setProjects(data);
        return data;
      } else {
        console.error('❌ API Response not ok:', response.status, response.statusText);
        return [];
      }
    } catch (error) {
      console.error('❌ Error loading projects:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProjects = () => {
    console.log('🔘 Button clicked, current showProjects:', showProjects);
    console.log('🔘 Projects length:', projects.length);
    
    if (!showProjects) {
      console.log('📋 Loading projects...');
      loadProjects().then(() => {
        console.log('✅ Projects loaded, setting showProjects to true');
        setShowProjects(true);
      });
    } else {
      console.log('🙈 Hiding projects...');
      setShowProjects(false);
    }
  };

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
          <motion.button
            onClick={handleToggleProjects}
            disabled={loading}
            className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Loading..." : (showProjects ? "Hide Projects" : content.buttonText)}
          </motion.button>
        </div>

        <AnimatePresence>
          {showProjects && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
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
                            Live Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AnimatedContent;