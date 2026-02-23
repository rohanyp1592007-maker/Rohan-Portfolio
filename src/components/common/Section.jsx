import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, title, subtitle, children, className = '', containerClass = 'max-w-4xl mx-auto px-6' }) => {
    return (
        <section id={id} className={`py-24 relative ${className}`}>
            <div className={containerClass}>
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            {subtitle && <h2 className="text-sm font-bold tracking-[0.2em] text-text-muted uppercase mb-4">{subtitle}</h2>}
                            {title && <h3 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">{title}</h3>}
                        </div>
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
