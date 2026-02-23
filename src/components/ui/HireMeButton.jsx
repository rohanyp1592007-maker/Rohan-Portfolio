import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, X, Briefcase } from 'lucide-react';

const HireMeButton = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: 'Email',
      icon: <Mail size={22} strokeWidth={1.5} />,
      url: 'mailto:rohanyp1592007@gmail.com',
      color: 'hover:text-amber-500'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={22} strokeWidth={1.5} />,
      url: 'https://wa.me/919370604551',
      color: 'hover:text-green-500'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={22} strokeWidth={1.5} />,
      url: 'https://www.linkedin.com/in/rohan-patil-248aaa2a3/',
      color: 'hover:text-blue-500'
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center gap-2 ${className || 'btn btn-solid text-sm uppercase tracking-widest'}`}
        aria-label="Open contact options"
      >
        <Briefcase size={16} strokeWidth={1.5} className="mr-1" />
        Hire Me
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm bg-bg-primary border border-border-subtle p-8 rounded-2xl shadow-2xl flex flex-col items-center z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors p-2"
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="w-12 h-12 bg-bg-secondary border border-border-subtle rounded-full flex items-center justify-center text-text-primary mb-6">
                <Briefcase size={24} strokeWidth={1.5} />
              </div>

              <h3 id="modal-title" className="text-2xl font-semibold text-text-primary text-center tracking-tight mb-2">Let's work together</h3>
              <p className="text-text-muted text-center text-[15px] font-light mb-8">
                Choose a platform below to start a conversation about your next project.
              </p>

              <div className="flex gap-4 w-full justify-center">
                {contactOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center w-20 h-20 gap-2 bg-bg-secondary text-text-secondary border border-border-subtle rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-text-primary ${option.color} hover:bg-bg-primary hover:shadow-xl`}
                    aria-label={`Contact via ${option.name}`}
                  >
                    {option.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HireMeButton;
