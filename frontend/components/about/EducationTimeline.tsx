'use client';

import { motion } from 'framer-motion';
import { EducationEntry } from './data';

/**
 * EducationTimeline component props
 */
export interface EducationTimelineProps {
    educationTimeline: EducationEntry[];
}
const EducationTimeline: React.FC<EducationTimelineProps> = ({ educationTimeline }) => {
    // Animation variants
    const slideInRight = {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    };
  
    const slideInLeft = {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    };
  
    const slideUp = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    };
  
    return (
      <>
        <h2 className="text-2xl font-bold mb-12 gradient-text text-center">Education</h2>
  
        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden md:block max-w-4xl mx-auto relative">
          {/* Center Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border transform -translate-x-1/2 z-0"></div>
  
          <div className="space-y-16">
            {educationTimeline.map((item: EducationEntry, index: number) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={`desktop-${index}`}
                  className={`relative flex ${isEven ? 'justify-start' : 'justify-end'}`}
                  variants={isEven ? slideInRight : slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Timeline dot - perfectly centered on the line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                      className="w-6 h-6 bg-card border-4 border-primary rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    ></motion.div>
                  </div>
                  
                  {/* Content box - alternating sides */}
                  <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
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
              );
            })}
          </div>
        </div>
  
        {/* Mobile Timeline (visible only on mobile) */}
        <div className="md:hidden relative">
          {/* Left-aligned Timeline Line */}
          <div className="absolute top-0 bottom-0 left-3 w-px bg-border z-0"></div>
  
          <div className="space-y-10">
            {educationTimeline.map((item: EducationEntry, index: number) => (
              <motion.div
                key={`mobile-${index}`}
                className="relative pl-10"
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
              >
                {/* Timeline dot - perfectly centered on the line */}
                <div className="absolute left-3 transform -translate-x-1/2 z-20">
                  <motion.div
                    className="w-5 h-5 bg-card border-3 border-primary rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  ></motion.div>
                </div>
                
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
              </motion.div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default EducationTimeline;