"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import SectionTitle from "@/components/Common/SectionTitle";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

const CEO = () => {
  return (
    <>
      <Breadcrumb
        pageName="Meet Our CEO"
        description="Learn about the visionary leader driving NeuByte's innovation in AI and web development."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <motion.div
              className="w-full px-4 lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src="/images/testimonials/author-01.png"
                    alt="CEO Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-lg bg-primary px-6 py-3 text-white shadow-lg">
                  <p className="text-sm font-semibold">Leading Innovation</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full px-4 lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <div className="lg:pl-8">
                <motion.h2
                  className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl"
                  variants={fadeInUp}
                >
                  Visionary Leadership in Technology
                </motion.h2>
                <motion.p
                  className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  variants={fadeInUp}
                >
                  With over 15 years of experience in technology leadership, our CEO has been at the forefront of digital innovation, guiding NeuByte from a startup vision to a leading force in AI and web development.
                </motion.p>
                <motion.p
                  className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  variants={fadeInUp}
                >
                  His passion for combining artificial intelligence with human-centered design has resulted in groundbreaking solutions that not only meet business needs but also create meaningful user experiences.
                </motion.p>
                <motion.div
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Key Achievements
                  </h3>
                  <ul className="space-y-2 text-body-color dark:text-body-color-dark">
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Led development of 50+ AI-powered applications
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Published 20+ research papers on AI and UX
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Founded NeuByte with a mission to democratize AI
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Mentored 100+ developers and entrepreneurs
                    </li>
                  </ul>
                </motion.div>
                <motion.p
                  className="text-lg font-semibold text-primary"
                  variants={fadeInUp}
                >
                  &ldquo;Technology should serve humanity, not the other way around.&rdquo;
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Leadership Philosophy */}
          <motion.div
            className="mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionTitle
              title="Leadership Philosophy"
              paragraph="Our CEO's approach to leadership combines technical expertise with a deep understanding of human needs."
              center
            />

            <motion.div
              className="-mx-4 mt-12 flex flex-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="w-full px-4 md:w-1/2 lg:w-1/3"
                variants={fadeInUp}
              >
                <div className="mb-8 rounded-lg bg-white p-8 shadow-one dark:bg-dark">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    Innovation First
                  </h3>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Always pushing boundaries and exploring new technologies to solve complex problems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="w-full px-4 md:w-1/2 lg:w-1/3"
                variants={fadeInUp}
              >
                <div className="mb-8 rounded-lg bg-white p-8 shadow-one dark:bg-dark">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    People Centered
                  </h3>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Building teams and solutions that prioritize human needs and experiences.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="w-full px-4 md:w-1/2 lg:w-1/3"
                variants={fadeInUp}
              >
                <div className="mb-8 rounded-lg bg-white p-8 shadow-one dark:bg-dark">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    Ethical AI
                  </h3>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Committed to developing AI that is transparent, fair, and beneficial to society.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            className="mt-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-8 dark:from-primary/5 dark:to-secondary/5">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Ready to Innovate Together?
              </h3>
              <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
                Let&apos;s discuss how NeuByte can help transform your business with AI-powered solutions.
              </p>
              <motion.a
                href="/contact"
                className="inline-block rounded-md bg-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CEO;