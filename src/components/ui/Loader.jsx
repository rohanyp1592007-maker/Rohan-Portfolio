import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-bg-primary"
        >
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-border-subtle border-t-text-primary"
                    ></motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-transparent border-t-text-secondary opacity-50"
                    ></motion.div>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted"
                >
                    Loading Details
                </motion.p>
            </div>
        </motion.div>
    );
};

export default Loader;
