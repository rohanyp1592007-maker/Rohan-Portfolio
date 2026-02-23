import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, idx }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col h-full bg-bg-primary"
        >
            {/* Image Preview */}
            <div className="relative aspect-[16/9] w-full overflow-hidden mb-8 bg-bg-secondary border border-border-subtle p-2 md:p-3 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply dark:mix-blend-screen"></div>
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top filter dark:brightness-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-grow px-2 md:px-4">

                {/* Title & Tech */}
                <div className="mb-6">
                    <h4 className="text-3xl font-semibold text-text-primary tracking-tight mb-4">{project.title}</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((techItem, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-bg-secondary border border-border-subtle text-[11px] font-bold uppercase tracking-widest text-text-primary rounded-full transition-colors hover:border-text-primary"
                            >
                                {techItem}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Business Description */}
                <p className="text-text-secondary font-light leading-relaxed mb-6 text-base">{project.description}</p>

                {/* Key Results / Impact */}
                {project.impact && (
                    <div className="mb-8 pl-4 border-l border-border-subtle">
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-3">Key Results</h5>
                        <ul className="space-y-2">
                            {project.impact.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-text-primary font-medium text-[13px] leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* CTAs */}
                <div className="mt-auto pt-6 border-t border-border-subtle flex flex-wrap gap-4 items-center">
                    {project.liveLink && project.liveLink !== "#" && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-solid text-xs py-2 px-4 shadow-none hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <ExternalLink size={14} strokeWidth={2} /> Live Demo
                        </a>
                    )}

                    {project.githubLink && project.githubLink !== "#" && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline text-xs py-2 px-4 flex items-center gap-2"
                        >
                            <Github size={14} strokeWidth={2} /> Source Code
                        </a>
                    )}

                    {project.caseStudyLink && project.caseStudyLink !== "#" && (
                        <a
                            href={project.caseStudyLink}
                            className="text-[11px] uppercase tracking-widest font-bold text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 ml-auto"
                        >
                            Read Case Study <ArrowRight size={14} strokeWidth={2} className="ml-1" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
