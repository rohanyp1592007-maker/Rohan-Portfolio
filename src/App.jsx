import React, { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import PageTransition from './components/common/PageTransition'
import Loader from './components/ui/Loader'

// Lazy loaded route components
const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Contact = lazy(() => import('./components/sections/Contact'))
const ResumeViewer = lazy(() => import('./components/resume/ResumeViewer'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Suspense fallback={<Loader />}><Hero /></Suspense></PageTransition>} />
        <Route path="/about" element={<PageTransition><Suspense fallback={<Loader />}><About /><Skills /></Suspense></PageTransition>} />
        <Route path="/experience" element={<PageTransition><Suspense fallback={<Loader />}><Experience /><Testimonials /></Suspense></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Suspense fallback={<Loader />}><Projects /></Suspense></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Suspense fallback={<Loader />}><Contact /></Suspense></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Suspense fallback={<Loader />}><ResumeViewer /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial global loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App relative min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <ScrollToTop />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  )
}

export default App