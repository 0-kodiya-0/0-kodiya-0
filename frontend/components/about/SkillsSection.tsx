'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SkillsData } from './data';

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

// Monochromatic color palette with black and gray tones
const COLORS = [
  '#000000',     // Pure Black
  '#1A1A1A',     // Very Dark Gray
  '#404040',     // Dark Gray
  '#666666',     // Medium Gray
  '#8C8C8C',     // Light Gray
  '#B3B3B3',     // Lighter Gray
  '#D9D9D9'      // Very Light Gray
];

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

  const formatCategoryName = (name: string) => {
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
        className="text-2xl font-bold mb-6 text-neutral-800 tracking-tight"
        variants={itemVariants}
      >
        Skills & Expertise
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        variants={containerVariants}
      >
        {Object.entries(skills).map(([category, skillList], catIndex) => {
          // Transform skills data for pie chart
          const pieData = skillList.map((skill, index) => ({
            name: capitalizeSkillName(skill),
            value: CATEGORY_PROFICIENCY[category]?.[index] || 80
          }));

          return (
            <motion.div
              key={category}
              className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm"
              variants={itemVariants}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3 className="text-base font-semibold mb-3 text-neutral-700 border-b border-neutral-200 pb-1">
                {formatCategoryName(category)}
              </h3>

              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-24 h-24 mb-4 sm:mb-0 sm:mr-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)', 
                          borderRadius: '8px',
                          fontSize: '12px',
                          padding: '6px',
                          border: '1px solid #E5E5E5'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Responsive Legend */}
                <div className="w-full sm:flex-grow">
                  {pieData.map((skill, index) => (
                    <div 
                      key={skill.name} 
                      className="flex items-center gap-2 text-xs mb-1"
                    >
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="truncate flex-grow text-neutral-800">{skill.name}</span>
                      <span className="text-neutral-500">
                        {skill.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;