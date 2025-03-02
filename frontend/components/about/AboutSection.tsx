export default function AboutSection() {
    // Career timeline data
    const careerTimeline = [
        {
            year: '2022 - Present',
            position: 'Senior Full Stack Developer',
            company: 'TechInnovate',
            description: 'Leading development of scalable web applications using Next.js, Node.js, and MongoDB.'
        },
        {
            year: '2020 - 2022',
            position: 'Backend Developer',
            company: 'CodeCraft Solutions',
            description: 'Developed and optimized RESTful APIs and microservices architecture.'
        },
        {
            year: '2018 - 2020',
            position: 'Junior Web Developer',
            company: 'WebWizards',
            description: 'Built responsive websites and implemented frontend features using React.'
        }
    ];

    // Skills data
    const skills = {
        frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
        backend: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'RESTful APIs'],
        database: ['MongoDB', 'PostgreSQL', 'Redis', 'Database Optimization'],
        devops: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Kubernetes'],
        other: ['Agile/Scrum', 'Test-Driven Development', 'System Design', 'Performance Optimization']
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-4xl font-bold mb-10 gradient-text inline-block">About Me</h1>

            {/* Personal Introduction */}
            <section className="mb-16">
                <div className="card code-annotation">
                    <h2 className="text-2xl font-bold mb-6">My Story</h2>
                    <p className="mb-4">
                        I&apos;m Sanithu Jayakody, a Full Stack Developer with a passion for building robust, scalable
                        backend systems. My journey in software development began with a curiosity about how
                        things work behind the scenes, which naturally led me to specialize in backend development.
                    </p>
                    <p className="mb-4">
                        With over 5 years of experience in the industry, I&apos;ve had the opportunity to work on
                        various projects ranging from e-commerce platforms to content management systems and
                        real-time applications. Each project has added to my knowledge and strengthened my
                        belief in clean code and thoughtful architecture.
                    </p>
                    <p>
                        When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source
                        projects, or sharing my knowledge through technical blog posts.
                    </p>
                </div>
            </section>

            {/* Career Timeline */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Professional Journey</h2>
                <div className="space-y-8">
                    {careerTimeline.map((item, index) => (
                        <div key={index} className="card relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-(--primary)"></div>
                            <div className="pl-4">
                                <span className="text-sm text-(--syntax-comment) block mb-2">{item.year}</span>
                                <h3 className="text-xl font-bold">{item.position}</h3>
                                <p className="text-(--primary) mb-2">{item.company}</p>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, skillList]) => (
                        <div key={category} className="card">
                            <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                            <ul className="space-y-2">
                                {skillList.map((skill, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-(--primary) mr-2">▹</span>
                                        <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}