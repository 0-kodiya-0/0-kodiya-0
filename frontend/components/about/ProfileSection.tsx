'use client';

import { motion } from 'framer-motion';
import DeveloperCard from './DeveloperCard';
import { developerInfo } from './data';

/**
 * ProfileSection component props
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProfileSectionProps {
    // No props needed if using centralized data
}

const ProfileSection: React.FC<ProfileSectionProps> = () => {
    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    return (
        <motion.section
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={fadeIn} className="lg:col-span-2">
                <div className="space-y-4">
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

            <motion.div variants={fadeIn}>
                <DeveloperCard developerInfo={developerInfo} />
            </motion.div>
        </motion.section>
    );
};

export default ProfileSection;