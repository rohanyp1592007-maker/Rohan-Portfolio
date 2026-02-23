import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import Section from '../common/Section';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} strokeWidth={1.5} />, url: 'https://github.com/rohanyp1592007-maker' },
    { name: 'LinkedIn', icon: <Linkedin size={20} strokeWidth={1.5} />, url: 'https://www.linkedin.com/in/rohan-patil-248aaa2a3/' },
    { name: 'Instagram', icon: <Instagram size={20} strokeWidth={1.5} />, url: 'https://www.instagram.com/rohanpatil.3104/' }
  ];

  const contactInfo = [
    { title: 'Email', value: 'rohanyp1592007@gmail.com', icon: <Mail size={20} strokeWidth={1.5} />, link: 'mailto:rohanyp1592007@gmail.com' },
    { title: 'Phone', value: '+91 93706 04551', icon: <Phone size={20} strokeWidth={1.5} />, link: 'tel:+919370604551' },
    { title: 'Location', value: 'Nashik, Maharashtra', icon: <MapPin size={20} strokeWidth={1.5} />, link: '#' }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Formspree Integration Example (Requires user to replace with actual ID)
    // For now, we simulate a successful submission
    const formspreeEndpoint = "https://formspree.io/f/xdalpzqq"; // user action required

    try {
      // If formspree endpoint is not set, simulate sending
      if (formspreeEndpoint.includes('YOUR_FORM_ID')) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
        } else {
          setErrors({ submit: 'Failed to send message. Please try again later.' });
        }
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      if (isSubmitted || Object.keys(errors).length === 0) {
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    }
  };

  return (
    <Section
      id="contact"
      subtitle="05. Contact"
      title="Get in touch."
      className="bg-bg-secondary border-t border-border-subtle"
      containerClass="max-w-6xl mx-auto px-6"
    >
      <p className="text-lg text-text-secondary max-w-xl font-light leading-relaxed mb-16 md:mb-24">
        I'm always open to discussing new opportunities, creative projects, or simply exchanging ideas about technology.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 ml-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-bg-primary border ${errors.name ? 'border-red-500/50' : 'border-border-subtle'} rounded-xl px-4 py-4 text-text-primary text-base font-light outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all placeholder:text-text-muted/50`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 ml-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-bg-primary border ${errors.email ? 'border-red-500/50' : 'border-border-subtle'} rounded-xl px-4 py-4 text-text-primary text-base font-light outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all placeholder:text-text-muted/50`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 ml-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full bg-bg-primary border ${errors.message ? 'border-red-500/50' : 'border-border-subtle'} rounded-xl px-4 py-4 text-text-primary text-base font-light outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all resize-none placeholder:text-text-muted/50`}
                placeholder="Tell me about your project..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-solid w-full py-4 uppercase tracking-[0.2em] text-[13px] font-bold transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} ${isSubmitted ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-bg-primary border-t-transparent animate-spin"></span> Sending...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Message Sent
                </span>
              ) : (
                'Send Message'
              )}
            </button>
            <p className="text-center text-xs text-text-muted font-light mt-2">Formspree / EmailJS ready integration.</p>
          </form>
        </motion.div>

        {/* Direct Contact & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 flex flex-col gap-12"
        >
          <div>
            <h4 className="text-[10px] font-black tracking-[0.25em] text-text-primary uppercase mb-8 pb-3 border-b border-border-subtle">Contact Details</h4>
            <div className="flex flex-col gap-6">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  className="group flex items-start gap-5 transition-colors"
                >
                  <div className="mt-1 pb-1 w-10 text-text-muted group-hover:text-text-primary border-b border-transparent group-hover:border-text-primary transition-all ease-out duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-muted mb-1">{info.title}</p>
                    <p className="text-base font-light text-text-primary group-hover:text-text-primary transition-all">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black tracking-[0.25em] text-text-primary uppercase mb-8 pb-3 border-b border-border-subtle">Digital Presence</h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-bg-primary border border-border-subtle rounded-xl hover:border-text-primary hover:bg-bg-primary transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-text-secondary group-hover:text-text-primary transition-colors">
                    {social.icon}
                    <span className="text-sm font-semibold uppercase tracking-widest">{social.name}</span>
                  </div>
                  <ArrowUpRight size={18} className="text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
};

export default Contact;