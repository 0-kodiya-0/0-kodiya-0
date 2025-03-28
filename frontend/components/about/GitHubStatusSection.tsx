'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Star,
    GitFork,
    Calendar,
    BarChart2,
    Layers
} from 'lucide-react';
import { useGitHubAPI } from '@/hooks/useGitHubApi';
import { ProfileInsights } from '@/lib/services/github.types';

const GitHubStatusSection: React.FC = () => {
    const [profileInsights, setProfileInsights] = useState<ProfileInsights | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getProfileInsights } = useGitHubAPI();

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const insights = await getProfileInsights();
                setProfileInsights(insights);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch GitHub insights:', error);
                setIsLoading(false);
            }
        };

        fetchInsights();
    }, [getProfileInsights]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.section
            className="space-y-10 rounded-2xl relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="flex items-center space-x-4 mb-6"
                variants={itemVariants}
            >
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white/90">
                    GitHub Insights
                </h3>
            </motion.div>

            {/* Language Breakdown */}
            {isLoading ? <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
                : <>
                    <motion.div
                        className="rounded-xl p-6 border border-gray-900/10"
                        variants={itemVariants}
                    >
                        <div className="flex items-center space-x-3 mb-5">
                            <Layers className="w-6 h-6" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                Language Landscape
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {Object.entries(profileInsights?.languages || {})
                                .sort((a, b) => b[1].percentage - a[1].percentage)
                                .slice(0, 8)
                                .map(([language, details]) => (
                                    <motion.div
                                        key={language}
                                        className="rounded-lg p-4 
                                            hover:bg-white/20 transition-all 
                                            border border-gray-900/10"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-800 dark:text-white/80">
                                                {language}
                                            </span>
                                            <span className="text-xs text-blue-500">
                                                {details.count} repos
                                            </span>
                                        </div>
                                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{
                                                    width: `${details.percentage}%`,
                                                    transition: 'width 0.5s ease-in-out'
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-white/60 mt-1">
                                            {details.percentage.toFixed(1)}%
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </motion.div>

                    {/* Contribution & Repository Insights */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Contribution Stats */}
                        <motion.div
                            className="bg-white/5 rounded-xl p-6 border border-gray-900/10"
                            variants={itemVariants}
                        >
                            <div className="flex items-center space-x-3 mb-5">
                                <Calendar className="w-6 h-6" />
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                    Contribution Timeline
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border
                                        border-gray-900/10 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <BarChart2 className="w-5 h-5" />
                                        <span className="text-gray-700 dark:text-white/80">Total Contributions</span>
                                    </div>
                                    <span className="font-bold">
                                        {profileInsights?.contributionStats.totalContributions || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border
                                        border-gray-900/10 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5" />
                                        <span className="text-gray-700 dark:text-white/80">Active Years</span>
                                    </div>
                                    <span className='font-bold'>
                                        {profileInsights?.contributionStats.contributionYears.join(', ')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Top Repositories */}
                        <motion.div
                            className="bg-white/5 rounded-xl p-6 border border-gray-900/10"
                            variants={itemVariants}
                        >
                            <div className="flex items-center space-x-3 mb-5">
                                <GitFork className="w-6 h-6" />
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                    Top Repositories
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {profileInsights?.popularRepositories.slice(0, 3).map(repo => (
                                    <motion.div
                                        key={repo.name}
                                        className="rounded-lg p-4 
                                            hover:bg-white/20 transition-all 
                                            border border-gray-900/10 flex justify-between items-center"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-white/80">
                                                {repo.name}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-white/50 line-clamp-1">
                                                {repo.description || 'No description'}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Star className="w-4 h-4" />
                                                <span className="text-gray-700 dark:text-white/80">{repo.stargazers_count}</span>
                                                <GitFork className="w-4 h-4 ml-2" />
                                                <span className="text-gray-700 dark:text-white/80">{repo.forks_count}</span>
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-white/50 mt-1">
                                                Health: {repo.healthPercentage}%
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </>
            }
        </motion.section>
    );
};

export default GitHubStatusSection;