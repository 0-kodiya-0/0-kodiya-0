'use client';

import { motion } from 'framer-motion';
import { SkillsData } from './data';

/**
 * SkillsSection component props
 */
export interface SkillsSectionProps {
  skills: SkillsData;
}
/**
 * SkillsSection component props
 */
export interface SkillsSectionProps {
  skills: SkillsData;
}

// Simplified proficiency levels by category
const CATEGORY_PROFICIENCY: Record<string, number[]> = {
  frameworks: [92, 90, 85, 80],
  databases: [88, 85],
  design: [80, 70],
  technical: [95, 92],
  management: [90, 92, 85, 88],
  softSkills: [95, 100, 88],
  languages: [85, 98]
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (proficiency: number) => ({
      width: `${proficiency}%`,
      transition: { duration: 1, ease: "easeOut", delay: 0.2 }
    })
  };

  // Helper functions
  const getBarColor = (proficiency: number) => {
    if (proficiency > 90) return 'bg-primary';
    if (proficiency > 80) return 'bg-primary/80';
    return 'bg-primary/60';
  };

  const formatCategoryName = (name: string) => {
    // First capitalize the category name
    const formatted = name.replace(/([A-Z])/g, ' $1').trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const capitalizeSkillName = (name: string) => {
    return name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <motion.div
      className="relative z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-2xl font-bold mb-10 gradient-text"
        variants={itemVariants}
      >
        Skills & Expertise
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
        variants={containerVariants}
      >
        {Object.entries(skills).map(([category, skillList], catIndex) => (
          <motion.div
            key={category}
            variants={itemVariants}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h3 className="text-lg font-medium mb-6 text-primary">
              {formatCategoryName(category)}
            </h3>

            <div className="space-y-0">
              {skillList.map((skill, index) => {
                // Get the proficiency from the category array or use 80 as default
                const proficiency = 
                  (CATEGORY_PROFICIENCY[category] && CATEGORY_PROFICIENCY[category][index]) || 80;
                
                const isLast = index === skillList.length - 1;
                
                return (
                  <motion.div
                    key={index}
                    className={`py-4 ${!isLast ? 'border-b border-border/30' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{capitalizeSkillName(skill)}</span>
                      <span className="text-muted-foreground text-xs">{proficiency}%</span>
                    </div>
                    <div className="h-1 bg-card-hover/30 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${getBarColor(proficiency)}`}
                        custom={proficiency}
                        variants={barVariants}
                      ></motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;