"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";

const CEO = () => {
  return (
    <>
      <Breadcrumb
        pageName="Meet Our CEO"
        description={
          <span className="text-lg font-medium text-white-800/90">
            Learn about our visionary leader, Dr. Ataur Sarkar, whose years of experience
            on Intel’s cutting-edge technologies now drive Neubyte’s pioneering AI innovation
          </span>
        }
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="px-4 flex flex-wrap items-start">
            
            {/* LEFT: STICKY IMAGE */}
            <motion.div
              className="w-full px-4 lg:w-1/2 lg:sticky lg:top-28 self-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[1/1]  overflow-hidden rounded-lg">
                <Image
                  src="/images/blog/CEO.jpeg"
                  alt="CEO Ataur Sarkar"
                  fill
                  className="object-center"
                />
              </div>
            </motion.div>

            {/* RIGHT: SCROLLING CONTENT */}
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
                  Ataur Sarkar, <span className="text-lg italic">PhD,PE (Professional Engineer)</span>
                </motion.h2>

                <motion.p
                  className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  variants={fadeInUp}
                >
                  Dr. Ataur Sarkar serves as the CEO and CRE{" "}
                  <span className="italic text-sm">(Chief Research Executive)</span> of NeuByte,
                  a Portland, Oregon-based startup pioneering AI agents, machine learning,
                  and data analytics solutions.
                </motion.p>

                {/* SECTION */}
                <motion.div className="mb-8" variants={fadeInUp}>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Industry Skills and Leadership
                  </h3>
                  <ul className="list-disc list-outside pl-6 space-y-2 marker:mr-4 text-body-color dark:text-body-color-dark">
                    <li>
                      	Worked 13+ years at Intel Corporation, leading high-volume yield data and fault isolation and failure analysis for multi-billion-dollar chip manufacturing.
                    </li>
                    <li>
                    Performed automation of complex workflows and boosting production efficiency.
                    </li>
                    <li>
                     Performed automation of complex workflows and boosting production efficiency.
                    </li>
                    <li>
                     Now applying above priceless skills to Neubyte’s intelligent AI agents for real-world impact.
                    </li>
                  </ul>
                </motion.div>

                <motion.div className="mb-8" variants={fadeInUp}>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Academic and Research Excellence
                  </h3>
                  <ul className="list-disc list-outside pl-6 space-y-2 marker:mr-4 text-body-color dark:text-body-color-dark">
                    <li>
                   Holds a PhD in Electrical Engineering from UC Davis, with MSc degrees from University of Calgary and BUET (ranked top two in BSc).
                    </li>
                    <li>
                     Published research work across disciplines in software development, nanophotonics, VLSI design, and optical communications.
                    </li>
                    <li>
                      Recipient of NSF Fellowship and best poster awards. 
                    </li>
                    <li>
                     Former Assistant Professor at BUET and part-time faculty at several private universities with 12+ years of academic leadership.
                    </li>
                    <li>
                    Mentored hundreds of engineers globally, fostering innovation and next-generation research talent.

                    </li>
                  </ul>
                </motion.div>

                <motion.div className="mb-8" variants={fadeInUp}>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Professional Credentials
                  </h3>
                  <ul className="list-disc list-outside pl-6 space-y-2 marker:mr-4 text-body-color dark:text-body-color-dark">
                    <li>
                     Licensed Professional Engineer (PE) in Oregon, USA, specializing in Electronics, Controls, and Communications- a distinction held by very few globally.

                    </li>
                    <li>
                      Proficient in fabrication, advanced instrumentation, and chip design platforms.
                    </li>
                  </ul>
                </motion.div>

                <motion.div className="mb-8" variants={fadeInUp}>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Outlook
                  </h3>
                  <ul className="list-disc list-outside pl-6 space-y-2 marker:mr-4 text-body-color dark:text-body-color-dark">
                    <li>
                   Steer Neubyte to reimagine enterprise AI and ML through science and real-world impact to position it as a global leader in adaptive and intelligent technology.

                    </li>
                    <li>
                 Integrate academic and industrial excellence to build autonomous, ethical, and scalable systems.
                    </li>
                    <li>
                    Champion data-driven growth and ethical AI for a rapidly evolving digital economy.
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CEO;
