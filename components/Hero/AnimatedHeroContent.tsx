"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const AnimatedHeroContent = () => {
  return (
    <motion.div
      className="mx-auto max-w-[800px] text-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
        Shaping the Future with AI Agentic Models
      </h1>
      <p className="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
        Enterprise-grade solutions in AI agentic models, innovative website design & engineering, and advanced data analytics. Trusted by industry leaders worldwide.
      </p>
      {/* <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="https://nextjstemplates.com/templates/saas-starter-startup"
          className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
        >
          Get Pro
        </Link>
        <Link
          href="https://github.com/NextJSTemplates/startup-nextjs"
          className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
        >
          Star on GitHub
        </Link>
      </div> */}
    </motion.div>
  );
};

export default AnimatedHeroContent;