/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useGitHubAPI } from '@/hooks/useGitHubApi';
import { Project } from '@/models/project';
import Image from 'next/image';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { HomeIcon } from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import SectionContainer from '@/components/layout/SectionContainer';

export interface ProjectDetailProps {
    readme?: string;
    license?: string;
    demoImage?: string;
}

export default function ProjectDetail() {
    const params = useParams();
    const projectName = params.id as string;

    const {
        getRepositories,
        getRepositoryReadme,
        getRepositoryLicense,
        getRepositoryDemoImage
    } = useGitHubAPI();

    const [project, setProject] = useState<Project | null>(null);
    const [projectDetails, setProjectDetails] = useState<ProjectDetailProps>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'readme' | 'license'>('readme');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const repos = await getRepositories(20);
                const projectRepo = repos?.find(repo => repo.name === projectName);

                if (!projectRepo) {
                    setError('Project not found');
                    return;
                }

                const projectData: Project = {
                    name: projectRepo.name,
                    description: projectRepo.description || 'No description available',
                    technologies: [projectRepo.language || 'Unknown'],
                    githubUrl: projectRepo.html_url,
                    topics: projectRepo.topics || [],
                    language: projectRepo.language || 'Unknown',
                    stargazers_count: projectRepo.stargazers_count,
                    forks_count: projectRepo.forks_count,
                    homepage: projectRepo.homepage
                };

                const [readme, license, demoImage] = await Promise.all([
                    getRepositoryReadme(projectName),
                    getRepositoryLicense(projectName),
                    getRepositoryDemoImage(projectName)
                ]);

                setProject(projectData);
                setProjectDetails({
                    readme: readme || undefined,
                    license: license || undefined,
                    demoImage: demoImage
                });
            } catch (err) {
                setError('Failed to load project details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (projectName) {
            fetchProjectDetails();
        }
    }, [projectName, getRepositories, getRepositoryReadme, getRepositoryLicense, getRepositoryDemoImage]);

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-6 text-center flex-grow">
                <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
                <p className="mb-8">{error || 'Sorry, the project you\'re looking for doesn\'t exist.'}</p>
                <Link href="/projects" className="btn btn-primary">
                    View All Projects
                </Link>
            </div>
        );
    }

    return (
        <SectionContainer>
            {/* Back to Projects Link */}
            <div className="mb-4">
                <Link href="/projects" className="text-muted-foreground hover:text-foreground flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>
                <h1 className="text-3xl font-bold mt-2">{project.name}</h1>
            </div>

            {/* Hero Image */}
            <div className="w-full mb-8">
                {projectDetails.demoImage && (
                    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative rounded-lg border border-muted overflow-hidden">
                        <Image
                            src={projectDetails.demoImage}
                            alt={`${project.name} demo`}
                            fill
                            className="object-contain bg-white"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Project Header */}
            <div className="mb-8">
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Project Metadata */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-secondary rounded-sm text-sm">
                            {project.language}
                        </span>
                        <span className="px-3 py-1 bg-secondary rounded-sm text-sm">
                            ★ {project.stargazers_count} Stars
                        </span>
                        <span className="px-3 py-1 bg-secondary rounded-sm text-sm">
                            Forks: {project.forks_count}
                        </span>
                    </div>

                    {/* Project Links */}
                    <div className="flex space-x-4 mt-4">
                        {project.homepage && (
                            <a
                                href={project.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <HomeIcon className="h-5 w-5" />
                            </a>
                        )}
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <BsGithub className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-1 gap-8 border border-gray-900/10 p-4">
                {/* Main Content (Markdown/License) */}
                <div>
                    {/* Tabs */}
                    <div className="flex border-b mb-4">
                        <button
                            className={`px-4 py-2 ${activeTab === 'readme' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
                            onClick={() => setActiveTab('readme')}
                        >
                            README
                        </button>
                        {projectDetails.license && (
                            <button
                                className={`px-4 py-2 ${activeTab === 'license' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab('license')}
                            >
                                License
                            </button>
                        )}
                    </div>

                    {/* Content Area */}
                    <div>
                        {activeTab === 'readme' ? (
                            projectDetails.readme ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-2 mb-1" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                                        // @ts-ignore
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    // @ts-ignore
                                                    style={oneDark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    className="rounded-lg my-2"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={`${className} bg-secondary px-1 rounded`} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {projectDetails.readme}
                                </ReactMarkdown>
                            ) : (
                                <p className="text-muted-foreground">No README available</p>
                            )
                        ) : (
                            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-sm">
                                {projectDetails.license}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}