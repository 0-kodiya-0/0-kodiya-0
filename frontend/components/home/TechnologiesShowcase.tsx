'use client';

import { 
  FaReact, 
  FaNodeJs, 
  FaDocker, 
  FaGitAlt, 
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql, 
  SiTailwindcss, 
  SiGraphql, 
  SiAmazon, 
  SiExpress 
} from 'react-icons/si';
import { Marquee } from '../magicui/marquee';

// Define technology type
export type Technology = {
  name: string;
  icon: React.ElementType;
};

// Technologies data - defined outside component to avoid recreation on renders
export const technologies: Technology[] = [
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Docker', icon: FaDocker },
  { name: 'AWS', icon: SiAmazon },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Express', icon: SiExpress },
];

export default function TechnologiesShowcase() {
  return (
    <div className="overflow-hidden">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold gradient-text inline-block">
          Technologies & Tools I Work With
        </h2>
      </div>
      
      <div className="py-3 sm:py-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s]">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="mx-3 sm:mx-5 flex flex-col items-center justify-center bg-card py-3 px-4 sm:py-4 sm:px-5 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 w-24 h-24 sm:w-28 sm:h-28"
            >
              <tech.icon className="text-2xl sm:text-3xl mb-2 text-primary" />
              <span className="font-medium text-xs sm:text-sm text-center">{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}