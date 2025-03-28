'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Target,
    TrendingUp,
    Medal,
    Star,
    Award
} from 'lucide-react';
import { LeetCodeStatsService } from '@/lib/services/leetcode';
import { StatsResponse } from '@/lib/services/leetcode.type';

interface LeetCodeStatsProps {
    username?: string;
}

const LeetCodeStats: React.FC<LeetCodeStatsProps> = ({ username = 'sanithujayafiverr' }) => {
    const [stats, setStats] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const statsService = new LeetCodeStatsService();
                const userStats = await statsService.getStats(username);

                if (userStats.status === 'success') {
                    setStats(userStats);
                    setError(null);
                } else {
                    setError(userStats.message);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [username]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.section
            className="space-y-10 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="flex items-center mb-6" variants={itemVariants}>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white/90">
                    LeetCode Insights
                </h3>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            ) : error || !stats ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
                    Error: {error}
                </div>
            ) : (
                <motion.div className="grid md:grid-cols-2 gap-6" variants={itemVariants}>
                    <StatItem icon={<CheckCircle className="w-6 h-6" />} label="Total Solved" value={`${stats?.totalSolved} / ${stats?.totalQuestions}`} />
                    <StatItem icon={<Target className="w-6 h-6" />} label="Difficulty Breakdown" value={`Easy: ${stats?.easySolved}/${stats?.totalEasy}, Medium: ${stats?.mediumSolved}/${stats?.totalMedium}, Hard: ${stats?.hardSolved}/${stats?.totalHard}`} />
                    <StatItem icon={<TrendingUp className="w-6 h-6" />} label="Acceptance Rate" value={`${stats?.acceptanceRate}%`} />
                    <StatItem icon={<Medal className="w-6 h-6" />} label="Ranking" value={stats.ranking.toLocaleString()} />
                    <StatItem icon={<Star className="w-6 h-6" />} label="Contribution Points" value={stats.contributionPoints.toLocaleString()} />
                    <StatItem icon={<Award className="w-6 h-6" />} label="Reputation" value={stats.reputation.toLocaleString()} />
                </motion.div>
            )}
        </motion.section>
    );
};

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <motion.div
        className="rounded-lg p-4 hover:bg-white/20 transition-all border border-gray-900/10 flex items-center space-x-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div>
            <p className="text-xs text-gray-600 font-medium">{label}</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white/90">{value}</p>
        </div>
    </motion.div>
);

export default LeetCodeStats;