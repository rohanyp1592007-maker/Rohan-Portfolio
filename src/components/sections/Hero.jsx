import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Mail, ArrowRight } from 'lucide-react';
import profilePic from '../../assets/profile.jpg';
import HireMeButton from '../ui/HireMeButton';

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary pt-24 pb-12">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Avatar / Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 border border-border-subtle bg-bg-secondary shadow-2xl relative z-10">
            <img
              src={profilePic}
              alt="Rohan Patil"
              decoding="async"
              className="w-full h-full rounded-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Subtle glow ring behind avatar */}
          <div className="absolute inset-0 rounded-full border border-text-primary/10 scale-[1.3] opacity-50"></div>
          <div className="absolute inset-0 rounded-full border border-text-primary/5 scale-[1.6] opacity-30"></div>
        </motion.div>

        {/* Small intro banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-bg-secondary mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-widest uppercase text-text-secondary">Available for Work</span>
        </motion.div>

        {/* Name & Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-text-primary mb-4 tracking-tighter leading-[1.1]"
        >
          Rohan Patil.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-3xl text-text-secondary font-light tracking-tight mb-8"
        >
          Full-Stack Software Engineer
        </motion.h2>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          Bridging the gap between <strong className="font-medium text-text-primary">elegant design</strong> and <strong className="font-medium text-text-primary">robust architecture</strong>. I engineer scalable web applications with meticulous attention to performance and user experience.
        </motion.p>

        {/* Social Proof / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-sm text-text-muted uppercase tracking-widest"
        >


          <div className="flex flex-col items-center">
            <span className="text-text-primary font-bold text-xl font-sans tracking-tight mb-1">5+</span>
            <span className="text-[10px]">Projects</span>
          </div>
          <div className="w-px h-10 bg-border-subtle hidden sm:block"></div>
          <div className="flex flex-col items-center">
            <span className="text-text-primary font-bold text-xl font-sans tracking-tight mb-1">100%</span>
            <span className="text-[10px]">Client Focus</span>
          </div>
        </motion.div>

        {/* Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8 w-full"
        >
          {/* Primary Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <HireMeButton className="btn btn-solid w-full sm:w-64 text-sm uppercase tracking-widest py-4 bg-text-primary text-bg-primary border-transparent hover:bg-transparent hover:text-text-primary hover:border-text-primary" />

            <Link to="/projects" className="btn w-full sm:w-64 text-sm uppercase tracking-widest py-4 bg-bg-secondary text-text-primary border border-border-subtle hover:border-text-primary flex items-center justify-center gap-2 group">
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="flex gap-8 text-[13px] font-medium tracking-wide text-text-muted uppercase">
            <Link to="/resume" className="hover:text-text-primary flex items-center gap-2 transition-colors">
              <Download size={15} strokeWidth={1.5} /> Download Resume
            </Link>
            <Link to="/contact" className="hover:text-text-primary flex items-center gap-2 transition-colors">
              <Mail size={15} strokeWidth={1.5} /> Contact Me
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Home;