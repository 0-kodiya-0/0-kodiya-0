'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DotPattern } from '@/components/magicui/dot-pattern';

export default function AboutPage() {
  // Education timeline data based on CV
  const educationTimeline = [
    {
      year: '2024 - Present',
      degree: 'BSc Computer Science Degree (4 Year)',
      institution: 'Informatics Institute of Technology | IIT Campus',
      description: '1st Year Completed, 2nd Year Ongoing'
    },
    {
      year: '2023',
      degree: 'Foundation Certificate',
      institution: 'Informatics Institute of Technology | IIT Campus',
      description: 'Completed foundational studies in computing'
    },
    {
      year: '2023',
      degree: 'Java Application Development Using JavaSE',
      institution: 'University Of Colombo School Of Computing (UCSC)',
      description: '8 Week Training Course'
    }
  ];

  // Projects data based on CV
  const projects = [
    {
      year: '2024',
      title: 'Real time ticketing system',
      description: 'A real time ticketing system built with Spring boot as the backend and Angular.js as the front end'
    },
    {
      year: '2024 - 2025',
      title: 'SDGP Group Project',
      description: 'Second year group project (ongoing)'
    },
    {
      year: '2023',
      title: 'Finess Smart',
      description: 'A UI/UX design for foundation second semester group project'
    },
    {
      year: '2023',
      title: 'Web design',
      description: 'A simple product landing page for 1st year second semester group project'
    },
    {
      year: '2023',
      title: 'Express server framework',
      description: 'A simple express server framework design with JavaScript'
    },
    {
      year: '2023',
      title: 'Account system',
      description: 'A simple login and signup system design with JavaScript and Node.js'
    }
  ];

  // Skills data grouped by category based on CV
  const skills = {
    frameworks: ['Express', 'Next.js', 'Angular.js', 'Spring Boot'],
    databases: ['MongoDB', 'MySQL'],
    design: ['UI/UX Design', 'Figma'],
    technical: ['Google Docs, Sheets, Forum', 'Microsoft Word, PowerPoint, Excel'],
    management: ['Git', 'NPM', 'Stack', 'Project Management and Documentation'],
    softSkills: ['Team Work', 'Innovation Skills', 'Excellent Knowledge'],
    languages: ['English (Intermediate)', 'Sinhala (Fluent)']
  };

  // Competitions based on CV
  const competitions = [
    {
      year: '2023',
      name: 'Cutting Edge',
      organizer: 'Informatics Institute of Technology | IIT Campus'
    },
    {
      year: '2022',
      name: 'IESL JIY',
      organizer: 'Institution of Engineers Sri Lanka'
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 relative">
      {/* Background Dot Pattern */}
      <DotPattern
        className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,white,transparent)]"
        offset={24}
        radius={0.5}
      />

      <motion.h1
        className="text-4xl font-bold mb-12 gradient-text inline-block relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About
      </motion.h1>

      {/* Introduction Section */}
      <motion.section
        className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn} className="lg:col-span-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p>
              I&apos;m Sanithu Nimadith Jayakody, an expert web developer with a passion for creating dynamic and user-friendly websites. I am specialized in crafting seamless digital experiences, with expertise spanning a wide range of technologies that enable me to develop innovative solutions.
            </p>
            <p>
              With a strong foundation in problem-solving, excellent communication skills, and a keen eye for design, I am committed to delivering high-quality projects that exceed expectations. My creativity, combined with my technical knowledge, allows me to bring unique and effective ideas to life on the web.
            </p>
            <p>
              Currently, I&apos;m pursuing a BSc in Computer Science at Informatics Institute of Technology while continuing to build my skills through practical projects and collaborative work.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="relative">
          <div className="border border-border p-5 rounded-lg bg-card shadow-sm">
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-card-hover rounded-lg border border-border z-0"></div>
            <div className="font-mono text-sm space-y-3 relative z-10">
              <div className="flex">
                <span className="text-syntax-keyword mr-2">const</span>
                <span className="text-syntax-function">developer</span>
                <span className="text-syntax-operator"> = {`{`}</span>
              </div>

              <div className="pl-6">
                <span className="text-syntax-function">name</span>
                <span className="text-syntax-operator">:</span>
                <span className="text-green-500">&apos;Sanithu Nimadith Jayakody&apos;</span>,
              </div>

              <div className="pl-6">
                <span className="text-syntax-function">role</span>
                <span className="text-syntax-operator">:</span>
                <span className="text-green-500">&apos;Computer Science Student&apos;</span>,
              </div>

              <div className="pl-6">
                <span className="text-syntax-function">education</span>
                <span className="text-syntax-operator">:</span>
                <span className="text-green-500">&apos;BSc Computer Science&apos;</span>,
              </div>

              <div className="pl-6">
                <span className="text-syntax-function">location</span>
                <span className="text-syntax-operator">:</span>
                <span className="text-green-500">&apos;Sri Lanka&apos;</span>,
              </div>

              <div className="pl-6">
                <span className="text-syntax-function">interests</span>
                <span className="text-syntax-operator">:</span>
                <span className="text-syntax-operator"> [</span>
                <span className="text-green-500">&apos;Web Development&apos;</span>,
                <span className="text-green-500">&apos;UI/UX Design&apos;</span>,
                <span className="text-green-500">&apos;Problem Solving&apos;</span>
                <span className="text-syntax-operator">]</span>,
              </div>

              <div>
                <span className="text-syntax-operator">{`}`};</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Education Timeline */}
      <motion.section
        className="mb-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-8 gradient-text">Education</h2>

        <div className="space-y-8">
          {educationTimeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative pl-8"
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={index}
            >
              {/* Timeline line */}
              {index < educationTimeline.length - 1 && (
                <div className="absolute top-8 left-3 w-px h-full bg-border"></div>
              )}

              {/* Timeline dot */}
              <motion.div
                className="absolute top-1 left-0 w-6 h-6 bg-card border-4 border-primary rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              ></motion.div>

              <div className="pb-8">
                <motion.span
                  className="inline-block px-3 py-1 text-xs bg-card-hover rounded-full mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {item.year}
                </motion.span>
                <h3 className="text-xl font-bold">{item.degree}</h3>
                <p className="text-primary">{item.institution}</p>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="mb-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-8 gradient-text">Skills & Expertise</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              className="border border-border rounded-lg p-5 bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + (categoryIndex * 0.1) }}
            >
              <h3 className="text-lg font-bold mb-4 capitalize flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                {category}
              </h3>

              <ul className="space-y-2">
                {skillList.map((skill, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        className="mb-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-8 gradient-text">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <span className="text-xs text-muted-foreground block mb-2">{project.year}</span>
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Competitions Section */}
      <motion.section
        className="mb-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h2 className="text-2xl font-bold mb-8 gradient-text">Competition Participation</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((competition, index) => (
            <motion.div
              key={index}
              className="border border-border rounded-lg p-5 bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <span className="text-xs px-3 py-1 bg-card-hover rounded-full mb-2 inline-block">{competition.year}</span>
              <h3 className="text-lg font-bold mb-1">{competition.name}</h3>
              <p className="text-sm text-muted-foreground">{competition.organizer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Link href="/contact" className="btn btn-primary inline-flex items-center">
          <span>Get In Touch</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}