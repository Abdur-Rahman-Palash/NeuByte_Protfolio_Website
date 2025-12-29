"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";

const AboutContent = () => {
  return (
    <section className="pb-[120px] pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Company Image */}
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
                  src="/images/about/about-image.svg"
                  alt="NeuByte Company"
                  fill
                  className="object-cover drop-shadow-three dark:hidden"
                />
                <Image
                  src="/images/about/about-image-dark.svg"
                  alt="NeuByte Company"
                  fill
                  className="object-cover drop-shadow-three hidden dark:block"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-primary px-6 py-3 text-white shadow-lg">
                <p className="text-sm font-semibold">Innovation Leaders</p>
              </div>
            </div>
          </motion.div>

          {/* Company Bio and Vision */}
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
              {/* Company Bio */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                  About NeuByte
                </h2>
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  NeuByte is a pioneering technology company at the forefront of artificial intelligence and web development innovation. Founded with a vision to democratize AI and make advanced technology accessible to businesses of all sizes, we combine cutting-edge AI solutions with human-centered design principles.
                </p>
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Our team of expert developers, AI specialists, and UX designers work collaboratively to create solutions that not only solve complex business challenges but also deliver exceptional user experiences that drive real results.
                </p>
              </motion.div>

              {/* Company Vision */}
              <motion.div
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Our Vision
                </h3>
                <p className="text-lg font-semibold text-primary mb-4">
                  &ldquo;Technology should serve humanity, not the other way around.&rdquo;
                </p>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  We envision a future where AI enhances human potential, where technology bridges gaps rather than creating them, and where innovation serves the greater good of society. Our commitment is to develop ethical, transparent, and accessible AI solutions that empower businesses and individuals alike.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;

