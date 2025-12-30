"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import { useState } from "react";

const projectData = [
  {
    id: 1,
    title: "AI-Powered E-commerce Platform",
    description: "Revolutionary online shopping experience with intelligent recommendations.",
    image: "/images/blog/blog-01.jpg",
    tech: ["React", "AI", "Node.js"],
  },
  {
    id: 2,
    title: "Smart Analytics Dashboard",
    description: "Real-time data visualization with predictive insights.",
    image: "/images/blog/blog-02.jpg",
    tech: ["Vue.js", "D3.js", "Python"],
  },
  {
    id: 3,
    title: "Collaborative Workspace App",
    description: "Seamless team collaboration with integrated AI assistance.",
    image: "/images/blog/blog-03.jpg",
    tech: ["Next.js", "TypeScript", "AI"],
  },
];

const AnimatedContent = () => {
  const [showProjects, setShowProjects] = useState(false);

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
            Our Solutions
          </h2>
          <h3 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Web Development Excellence
          </h3>
          <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
            Crafting modern, responsive web applications with cutting-edge technologies and AI integration.
          </p>
          <motion.button
            onClick={() => setShowProjects(!showProjects)}
            className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showProjects ? "Hide Projects" : "See Our Projects"}
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
                {projectData.map((project, index) => (
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
                          {project.tech.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                            >
                              {tech}
                            </span>
                          ))}
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