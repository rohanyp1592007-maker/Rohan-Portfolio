import React from 'react';
import { motion } from 'framer-motion';
import Section from '../common/Section';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const endorsements = [
        {
            id: 1,
            quote: "Rohan's ability to seamlessly bridge frontend aesthetics with robust backend infrastructure is exceptional. He continuously delivers high-quality code and is a phenomenal asset to any team.",
            author: "Senior Engineer",
            company: "Engeniuspark Technologies",
            role: "Mentor & Colleague"
        },
        {
            id: 2,
            quote: "The level of professionalism and technical rigor Rohan brought to the inventory management system completely transformed our operations. His attention to detail is unmatched.",
            author: "Project Lead",
            company: "Grahak Bhandar Initiative",
            role: "Client"
        }
    ];

    return (
        <Section
            id="testimonials"
            subtitle="05. Endorsements"
            title="What People Say."
            className="bg-bg-secondary border-t border-border-subtle"
            containerClass="max-w-4xl mx-auto px-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {endorsements.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col h-full group"
                    >
                        <Quote size={32} className="text-border-subtle mb-6 group-hover:text-text-muted transition-colors duration-500" strokeWidth={1} />
                        <p className="text-lg md:text-[19px] text-text-primary font-light leading-relaxed mb-8 flex-grow">
                            "{item.quote}"
                        </p>
                        <div className="mt-auto pt-6 border-t border-border-subtle">
                            <h4 className="text-base font-bold text-text-primary tracking-tight">{item.author}</h4>
                            <p className="text-sm text-text-muted font-medium mt-1">{item.role} <span className="text-border-subtle mx-1">|</span> {item.company}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Testimonials;
