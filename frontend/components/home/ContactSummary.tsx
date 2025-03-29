'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactItem } from '../contact/contact.types';
import ContactCardContent from '../contact/ContactCardContent';

export default function ContactSummary() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const contactInfo: ContactItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      title: 'Email',
      value: 'hello@sanithu.dev',
      link: 'mailto:hello@sanithu.dev'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      title: 'GitHub',
      value: 'github.com/sanithu',
      link: 'https://github.com/sanithu'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'linkedin.com/in/sanithu',
      link: 'https://linkedin.com/in/sanithu'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: 'Location',
      value: 'Colombo, Sri Lanka',
      link: null
    }
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card-hover/30 dark:to-background/30 z-0"></div>

      <div className="max-w-5xl mx-auto relative">
        <div className="mb-12 md:mb-16 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s <span className="gradient-text">Connect</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact cards - 2 columns on small devices, 1 on very small */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={variants}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
              >
                <div className={`h-full border border-border ${hoverIndex === index ? 'bg-card' : 'bg-transparent'} rounded-lg p-4 sm:p-5 transition-all duration-300`}>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="flex flex-col h-full"
                      target={item.title !== 'Email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      <ContactCardContent item={item} />
                    </a>
                  ) : (
                    <div className="flex flex-col h-full">
                      <ContactCardContent item={item} />
                    </div>
                  )}
                </div>

                {hoverIndex === index && (
                  <motion.div
                    className="absolute -inset-px rounded-lg border-2 border-primary opacity-20"
                    layoutId="highlight"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <h3 className="font-medium mb-2">Ready to work together?</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                Have a project in mind or want to explore possibilities? I&apos;d love to hear from you.
              </p>

              <div className="flex items-center mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <p className="text-xs sm:text-sm">Available for new projects</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/contact"
                className="btn btn-primary w-full justify-center text-center text-sm py-2"
              >
                Send a Message
              </Link>

              <Link
                href="/downloads/CV.pdf"
                download
                className="btn btn-secondary w-full justify-center text-center text-sm py-2"
              >
                Download Resume
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}