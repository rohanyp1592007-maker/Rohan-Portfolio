import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-32 bg-bg-secondary relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-muted uppercase mb-4">01. About</h2>
          <h3 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">The intersection of <span className="font-medium italic">design</span> & <span className="font-medium italic">engineering</span>.</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-32">
              <p className="text-lg text-text-primary font-medium mb-4">My Approach</p>
              <div className="h-px w-12 bg-border-subtle mb-6"></div>
              <p className="text-sm text-text-muted leading-relaxed">
                I believe that exceptional software requires both deep technical rigor and an uncompromising eye for aesthetics.
              </p>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-8 text-base md:text-lg text-text-secondary font-light leading-relaxed">
            <p>
              I am a dedicated Full Stack Developer and a third-year IT diploma student with a strong focus on building clean, efficient, and user-friendly web applications. I specialize in turning complex ideas into elegant digital solutions using <strong className="font-medium text-text-primary">React, Node.js, JavaScript, PHP, and MySQL</strong>.
            </p>

            <p>
              Currently completing my industrial training at <strong className="font-medium text-text-primary">Engeniuspark Technologies Pvt Ltd</strong>, I work on real-world projects bridging frontend precision and backend infrastructure. This experience has cultivated my appreciation for professional coding standards, collaborative workflows, and seamless project delivery.
            </p>

            <p>
              My philosophy is continuous refinement. I am constantly iterating on my technical skills, problem-solving methodologies, and code architecture. My ultimate goal is to evolve into a <strong className="font-medium text-text-primary">world-class software engineer</strong> who builds scalable, secure, and profoundly impactful applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;