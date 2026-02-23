import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section className="py-24 bg-bg-secondary relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-muted uppercase mb-4">03. Career</h2>
          <h3 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">Professional Experience.</h3>
        </motion.div>

        <div className="relative border-l border-border-subtle ml-2 md:ml-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 ml-8 md:ml-12 relative group"
          >
            {/* Minimal Timeline Marker */}
            <div className="absolute -left-[37px] md:-left-[53px] top-2 w-[11px] h-[11px] rounded-full bg-text-muted group-hover:bg-text-primary transition-colors duration-500 z-10 outline outline-4 outline-bg-secondary"></div>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
              <div>
                <h4 className="text-2xl font-semibold text-text-primary mb-1 tracking-tight">MERN Stack Developer Intern</h4>
                <p className="text-text-secondary font-medium tracking-wide">Engeniuspark Technologies Pvt Ltd</p>
              </div>
              <div className="text-text-muted text-sm font-medium uppercase tracking-widest font-mono">
                2026 – Present
              </div>
            </div>

            <div className="text-base text-text-secondary font-light space-y-4 max-w-2xl leading-relaxed">
              <p>
                Spearheading the frontend development of internal tooling using React and modern CSS architectures. Focused on building responsive, mobile-first interfaces that do not compromise on rendering performance or accessibility.
              </p>
              <p>
                Assisting backend engineering efforts by constructing and maintaining RESTful APIs natively in Node.js, interfacing with highly structured MySQL databases to ensure reliable data integrity.
              </p>
              <p>
                Operating closely with multidisciplinary teams in a professional agile environment, grasping the nuances of the real-world software project lifecycle and collaborative version control.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;