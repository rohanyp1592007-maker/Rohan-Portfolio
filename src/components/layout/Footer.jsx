import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="py-12 bg-bg-primary border-t border-border-subtle relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto px-6"
            >
                <p className="text-sm text-text-muted font-light tracking-wide">
                    &copy; {new Date().getFullYear()} Rohan Patil. Crafted meticulously.
                </p>
            </motion.div>
        </footer>
    );
};

export default Footer;
