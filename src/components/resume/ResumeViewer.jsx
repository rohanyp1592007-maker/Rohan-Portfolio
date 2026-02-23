import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Printer, Maximize, ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ResumeViewer = () => {
  const resumeRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Implement Option B: Dedicated Print/PDF CSS Class to aggressively
  // override Tailwind v4 OKLCH colors, which crash html2canvas's parser.
  const applyPdfMode = () => {
    const style = document.createElement('style');
    style.id = 'pdf-export-styles';
    style.innerHTML = `
      .pdf-export-mode {
        background-color: #ffffff !important;
        color: #000000 !important;
        padding: 40px !important;
        width: 794px !important; /* Lock to exact A4 print width (96 DPI) */
        max-width: 794px !important;
        margin: 0 auto !important;
        transform: none !important;
        overflow: hidden !important;
      }
      /* Aggressively override all descendant elements to use standard hex 
         colors or transparent, ensuring html2canvas computes NO oklch strings */
      .pdf-export-mode * {
        background-color: transparent !important;
        color: #000000 !important;
        border-color: #d4d4d4 !important;
        box-shadow: none !important;
        filter: none !important;
        text-shadow: none !important;
        outline: none !important;
        animation: none !important;
        transition: none !important;
      }
      /* Remove absolute positioning and transforms which break in Canvas */
      .pdf-export-mode,
      .pdf-export-mode * {
        transform: none !important;
      }
      /* Selectively restore backgrounds for specific components with solid white 
         to prevent transparency from turning into grey/black */
      .pdf-export-mode .bg-bg-secondary,
      .pdf-export-mode .bg-bg-primary,
      .pdf-export-mode section,
      .pdf-export-mode div {
        background-color: #ffffff !important;
      }
      .pdf-export-mode .bg-border-subtle {
        background-color: #e5e5e5 !important;
      }
      .pdf-export-mode .text-text-secondary,
      .pdf-export-mode .text-text-muted {
        color: #444444 !important;
      }
      /* Ensure proper pagination layout */
      .pdf-export-mode .pdf-no-break {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      /* Stabilize two-column grid to prevent right column cutoff */
      .pdf-export-mode .grid {
        display: grid !important;
        grid-template-columns: 1fr 240px !important;
        gap: 28px !important;
        align-items: start !important;
      }
    `;
    document.head.appendChild(style);
    if (resumeRef.current) {
      resumeRef.current.classList.add('pdf-export-mode');
      // Temporarily remove max-w classes to let the fixed width take over
      resumeRef.current.parentElement.classList.remove('max-w-[850px]', 'mx-auto');
    }
  };

  const removePdfMode = () => {
    const style = document.getElementById('pdf-export-styles');
    if (style) style.remove();
    if (resumeRef.current) {
      resumeRef.current.classList.remove('pdf-export-mode');
      resumeRef.current.parentElement.classList.add('max-w-[850px]', 'mx-auto');
    }
  };

  const getPdfOptions = () => ({
    margin: [10, 10, 10, 10], // Proper mm margins
    filename: 'Rohan_Patil_Resume.pdf',
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: {
      backgroundColor: '#ffffff', // Explicitly force HTML2Canvas to use a white background layer
      scale: 2,
      useCORS: true,
      letterRendering: true,
      windowWidth: 794 // Match exact A4 print width to prevent scaling cutoff
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] } // Automatically respects avoid !important
  });

  const downloadPDF = async () => {
    setIsDownloading(true);
    applyPdfMode();
    // Yield to let React/DOM update
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      await html2pdf().set(getPdfOptions()).from(resumeRef.current).save();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('There was an error generating your PDF: ' + err.message);
    } finally {
      removePdfMode();
      setIsDownloading(false);
    }
  };

  const handleOpenPdf = async () => {
    setIsOpening(true);
    applyPdfMode();
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const pdfBlob = await html2pdf().set(getPdfOptions()).from(resumeRef.current).outputPdf('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('Failed to open PDF:', err);
      alert('There was an error opening your PDF: ' + err.message);
    } finally {
      removePdfMode();
      setIsOpening(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = window.location.href;
      if (navigator.share) {
        await navigator.share({
          title: 'Rohan Patil - Full-Stack Developer Resume',
          text: 'Check out my professional resume.',
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Upgraded Button Component
  const ToolbarButton = ({ onClick, icon: Icon, label, primary = false, active = false, loading = false, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
        ${primary
          ? 'bg-text-primary text-bg-primary hover:bg-transparent hover:text-text-primary border border-transparent hover:border-text-primary shadow-lg shadow-text-primary/10'
          : 'bg-bg-secondary text-text-primary border border-border-subtle hover:border-text-primary hover:bg-bg-primary shadow-sm hover:shadow-md'}
        ${active ? 'opacity-80 scale-95' : 'active:scale-95'}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={label}
    >
      {loading ? <Loader2 size={16} strokeWidth={2} className="animate-spin" /> : <Icon size={16} strokeWidth={2} />}
      <span className="hidden sm:inline">{loading ? 'Processing...' : label}</span>
    </button>
  );

  const isProcessing = isDownloading || isOpening;

  return (
    <section className="py-32 bg-bg-primary relative min-h-screen border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 relative z-10" ref={containerRef}>

        {/* Header & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b border-border-subtle pb-8 ${isFullscreen ? 'bg-bg-primary p-8 rounded-t-2xl m-0 border-none' : ''}`}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-text-primary tracking-tight mb-2">Curriculum Vitae</h1>
            <p className="text-text-muted font-light tracking-wide text-sm uppercase">Interactive Document Viewer</p>
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <ToolbarButton onClick={downloadPDF} icon={Download} label="Download PDF" primary loading={isDownloading} disabled={isProcessing} />
            <ToolbarButton onClick={handleOpenPdf} icon={ExternalLink} label="Open PDF" loading={isOpening} disabled={isProcessing} />
            <ToolbarButton onClick={handlePrint} icon={Printer} label="Print" disabled={isProcessing} />
            <ToolbarButton onClick={toggleFullscreen} icon={Maximize} label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} disabled={isProcessing} />
            <ToolbarButton onClick={handleShare} icon={copied ? CheckCircle : Share2} label={copied ? "Copied!" : "Share"} disabled={isProcessing} />
          </div>
        </motion.div>

        {/* The Resume Document - internal print styles applied */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`bg-bg-secondary p-8 md:p-16 border border-border-subtle shadow-2xl mx-auto max-w-[850px] print:m-0 print:border-none print:shadow-none print:w-full print:max-w-none ${isFullscreen ? 'h-full overflow-y-auto rounded-b-2xl' : 'rounded-2xl'}`}
        >
          <div ref={resumeRef} id="resume-print-container" className="font-sans text-text-primary bg-bg-secondary pdf-document">

            {/* Resume Content Block */}
            <div className="p-2 md:p-8">

              {/* Header */}
              <header className="border-b border-border-subtle print:border-[#d4d4d4] pb-8 mb-10 text-center md:text-left pdf-no-break">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">ROHAN PATIL</h1>
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-text-muted print:text-[#525252] mb-6">Full-Stack Software Engineer</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-[13px] font-semibold text-text-secondary print:text-[#333333] tracking-wide">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-border-subtle print:bg-[#a3a3a3]"></div> Nashik, India</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-border-subtle print:bg-[#a3a3a3]"></div> +91 93706 04551</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-border-subtle print:bg-[#a3a3a3]"></div> rohanyp1592007@gmail.com</span>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12">
                {/* Left Column */}
                <div>
                  {/* Summary */}
                  <section className="mb-12 pdf-no-break">
                    <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-text-primary border-b border-border-subtle print:border-[#d4d4d4] pb-3 mb-5 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-sm bg-text-primary"></span> Profile
                    </h2>
                    <p className="font-light text-base leading-relaxed text-text-secondary print:text-[#333333]">
                      Driven Full-Stack Developer leveraging a robust foundation in web technologies to build clean, responsive, and highly functional applications. Combines conceptual algorithmic knowledge with hands-on industrial experience to deliver scalable, production-ready software solutions.
                    </p>
                  </section>

                  {/* Experience */}
                  <section className="mb-12 pdf-no-break">
                    <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-text-primary border-b border-border-subtle print:border-[#d4d4d4] pb-3 mb-6 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-sm bg-text-primary"></span> Experience
                    </h2>

                    <div className="mb-8">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h3 className="text-xl font-bold text-text-primary tracking-tight">MERN Stack Developer Intern</h3>
                        <span className="text-xs font-bold tracking-widest text-text-muted mt-1 md:mt-0 px-2 py-1 bg-border-subtle/30 rounded">2026 – Present</span>
                      </div>
                      <p className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-widest">Engeniuspark Technologies</p>
                      <ul className="list-disc list-outside ml-5 text-[15px] text-text-secondary print:text-[#333333] font-light space-y-2 leading-relaxed">
                        <li>Engineered highly responsive frontend architectures using React.js, Vite, and cutting-edge CSS frameworks.</li>
                        <li>Architected RESTful APIs utilizing Node.js and structured data with high-performance MySQL databases.</li>
                        <li>Collaborated seamlessly within an agile team applying Git workflows, CI/CD pipelines, and professional code-review standards.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Projects */}
                  <section className="mb-12 pdf-no-break">
                    <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-text-primary border-b border-border-subtle print:border-[#d4d4d4] pb-3 mb-6 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-sm bg-text-primary"></span> Selected Projects
                    </h2>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">Collegiate Inventory Management System</h3>
                      <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mb-3">PHP / MySQL / Tailwind / JS</p>
                      <p className="text-[15px] font-light text-text-secondary print:text-[#333333] leading-relaxed mb-3">Developed a comprehensive collegiate inventory solution streamlining stock management and operational tracing.</p>
                      <ul className="list-disc list-outside ml-5 text-[14px] text-text-secondary print:text-[#333333] font-light space-y-1">
                        <li>Decreased manual tracking time by 40%</li>
                        <li>Digitized over 1,000+ localized assets</li>
                      </ul>
                    </div>

                    <div className="pdf-no-break">
                      <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">Fruit Ripeness Identifier (ML)</h3>
                      <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mb-3">Python / TensorFlow / OpenCV</p>
                      <p className="text-[15px] font-light text-text-secondary print:text-[#333333] leading-relaxed mb-3">An innovative machine learning application deploying algorithmic image classification to predict and detect fruit ripeness.</p>
                      <ul className="list-disc list-outside ml-5 text-[14px] text-text-secondary print:text-[#333333] font-light space-y-1">
                        <li>Achieved 92% classification accuracy</li>
                        <li>Implemented edge-deployment friendly models</li>
                      </ul>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div>
                  {/* Education */}
                  <section className="mb-12 pdf-no-break">
                    <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-text-primary border-b border-border-subtle print:border-[#d4d4d4] pb-3 mb-6 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-sm bg-text-primary"></span> Education
                    </h2>

                    <div className="mb-6">
                      <h3 className="text-base font-bold text-text-primary tracking-tight leading-snug mb-2">Diploma in Information Technology</h3>
                      <p className="text-[14px] text-text-secondary print:text-[#333333] font-medium mb-2">Government Polytechnic, Nashik</p>
                      <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">2023 – Present</p>
                    </div>
                  </section>

                  {/* Skills */}
                  <section className="mb-12 pdf-no-break">
                    <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-text-primary border-b border-border-subtle print:border-[#d4d4d4] pb-3 mb-6 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-sm bg-text-primary"></span> Core Skills
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Frontend</h4>
                        <div className="flex flex-wrap gap-2">
                          {['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5'].map(skill => (
                            <span key={skill} className="text-[13px] font-medium text-text-secondary print:text-[#333333] bg-bg-primary border border-border-subtle print:border-[#d4d4d4] px-2 py-1 rounded">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Backend</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Node.js', 'Express', 'PHP'].map(skill => (
                            <span key={skill} className="text-[13px] font-medium text-text-secondary print:text-[#333333] bg-bg-primary border border-border-subtle print:border-[#d4d4d4] px-2 py-1 rounded">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Database & Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {['MySQL', 'MongoDB', 'Git', 'Postman'].map(skill => (
                            <span key={skill} className="text-[13px] font-medium text-text-secondary print:text-[#333333] bg-bg-primary border border-border-subtle print:border-[#d4d4d4] px-2 py-1 rounded">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Certifications */}
                  <section className="pdf-no-break">
                    <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-text-primary border-b border-border-subtle print:border-[#d4d4d4] pb-3 mb-6 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-sm bg-text-primary"></span> Certifications
                    </h2>

                    <ul className="space-y-4">
                      <li>
                        <h3 className="text-[14px] font-bold text-text-primary leading-snug">Advanced React Patterns</h3>
                        <p className="text-[12px] text-text-muted mt-1 uppercase tracking-wider font-semibold">Frontend Masters • 2025</p>
                      </li>
                      <li>
                        <h3 className="text-[14px] font-bold text-text-primary leading-snug">Full-Stack Web Development</h3>
                        <p className="text-[12px] text-text-muted mt-1 uppercase tracking-wider font-semibold">Coursera • 2024</p>
                      </li>
                    </ul>
                  </section>

                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeViewer;
