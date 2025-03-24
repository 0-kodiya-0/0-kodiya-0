'use client';

import { motion } from 'framer-motion';
import { CompetitionEntry } from './data';

/**
 * CompetitionsSection component props
 */
export interface CompetitionsSectionProps {
  competitions: CompetitionEntry[];
}

const CompetitionsSection: React.FC<CompetitionsSectionProps> = ({ competitions }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-8 gradient-text">Competition Participation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((competition: CompetitionEntry, index: number) => (
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
    </>
  );
};

export default CompetitionsSection;