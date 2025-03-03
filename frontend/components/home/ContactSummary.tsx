'use client';

import Link from 'next/link';
import { DotPattern } from '../magicui/dot-pattern';
import { BoxReveal } from '../magicui/box-reveal';

export default function ContactSummary() {
  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      title: 'GitHub',
      value: 'github.com/sanithu',
      link: 'https://github.com/sanithu'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'linkedin.com/in/sanithu',
      link: 'https://linkedin.com/in/sanithu'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 relative">
      {/* Background Pattern */}
      <DotPattern
        className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact heading and info */}
          <div>
            <BoxReveal boxColor={"var(--primary)"} duration={0.4}>
              <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
            </BoxReveal>

            <BoxReveal boxColor={"var(--primary)"} duration={0.4}>
              <p className="mt-4 text-muted-foreground">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of these channels.
              </p>
            </BoxReveal>

            <div className="mt-8 space-y-6">
              {contactInfo.map((item) => (
                <BoxReveal
                  key={item.title}
                  boxColor={"var(--primary)"}
                  duration={0.4}
                >
                  <a
                    href={item.link}
                    className="flex items-start hover:bg-muted/50 p-3 rounded-md transition-colors"
                    target={item.title !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <div className="text-primary mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </a>
                </BoxReveal>
              ))}
            </div>
          </div>

          {/* Right side - Location and CTA */}
          <div className="bg-card border border-border p-8 rounded-lg shadow-sm">
            <BoxReveal boxColor={"var(--primary)"} duration={0.4} >
              <div className="flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-3">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Colombo, Sri Lanka</p>
                </div>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={"var(--primary)"} duration={0.4} >
              <div className="mb-8">
                <h3 className="font-medium mb-2">Current Status</h3>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <p>Available for freelance projects</p>
                </div>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={"var(--primary)"} duration={0.4} >
              <Link
                href="/contact"
                className="btn btn-primary w-full justify-center text-center"
              >
                Send a Message
              </Link>
            </BoxReveal>

            <BoxReveal boxColor={"var(--primary)"} duration={0.4} >
              <a
                href="/downloads/SanithuJayakody-Resume.pdf"
                download
                className="btn btn-secondary w-full justify-center text-center mt-4"
              >
                Download Resume
              </a>
            </BoxReveal>
          </div>
        </div>
      </div>
    </section>
  );
}