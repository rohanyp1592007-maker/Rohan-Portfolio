import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"]
        },
        {
            title: "Backend",
            skills: ["Node.js", "Express.js", "PHP", "RESTful APIs"]
        },
        {
            title: "Databases & Tools",
            skills: ["MySQL", "MongoDB", "Git", "Postman", "VS Code"]
        }
    ];

    return (
        <section className="py-24 bg-bg-primary relative border-t border-border-subtle">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.2em] text-text-muted uppercase mb-4">02. Expertise</h2>
                        <h3 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight">Technical Arsenal.</h3>
                    </div>
                    <p className="text-text-muted max-w-sm text-sm font-light">
                        A curated stack of modern technologies chosen for performance, scalability, and developer ergonomics.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-12">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="grid md:grid-cols-12 gap-6 md:gap-12 items-start border-b border-border-subtle pb-12 last:border-0 last:pb-0 group"
                        >
                            <h4 className="text-lg md:text-xl font-medium text-text-primary md:col-span-4 transition-colors group-hover:text-text-muted">{category.title}</h4>
                            <div className="md:col-span-8 flex flex-wrap gap-2">
                                {category.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-bg-secondary text-text-secondary text-sm font-medium tracking-wide rounded-full border border-border-subtle hover:border-text-primary hover:text-text-primary transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
