import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import HireMeButton from '../ui/HireMeButton';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled
        ? 'py-4 glass-panel border-b border-border-subtle shadow-sm'
        : 'py-6 bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold tracking-tighter text-text-primary uppercase flex flex-col leading-none"
        >
          <span>Rohan</span>
          <span className="text-text-muted">Patil</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[13px] uppercase tracking-[0.1em] font-medium transition-colors hover:text-text-primary ${location.pathname === link.path ? 'text-text-primary' : 'text-text-muted'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          <Link to="/resume" className="text-[13px] uppercase tracking-widest font-semibold text-text-primary hover:text-text-muted transition-colors">
            Resume
          </Link>
          <HireMeButton className="btn btn-solid text-xs uppercase tracking-widest" />
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>
          <button
            className="text-text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <div className="space-y-1.5 p-1">
              <span className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`block w-6 h-[1.5px] bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-bg-primary border-t border-border-subtle fixed left-0 w-full overflow-hidden"
            style={{ top: '64px' }}
          >
            <div className="px-6 py-12 flex flex-col gap-8 h-full">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link
                    to={link.path}
                    className={`text-3xl font-light tracking-tight transition-colors ${location.pathname === link.path ? 'text-text-primary' : 'text-text-muted'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 flex flex-col gap-6">
                <Link to="/resume" className="text-sm uppercase tracking-widest font-semibold text-text-muted hover:text-text-primary transition-colors">
                  View Resume
                </Link>
                <HireMeButton className="w-full btn btn-solid text-sm uppercase tracking-widest py-4 mt-4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;