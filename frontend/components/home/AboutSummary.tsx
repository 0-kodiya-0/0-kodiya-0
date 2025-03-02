import Link from 'next/link';

export default function AboutSummary() {
    return (
        <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold gradient-text inline-block">About.me()</h2>
                <Link href="/about" className="btn btn-secondary text-sm">View Full Profile</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="card code-annotation">
                    <h3 className="text-xl font-bold mb-4">My Journey</h3>
                    <p className="mb-4">
                        Full Stack Developer with a special focus on backend optimization and scaling.
                        I transform complex problems into elegant, efficient solutions.
                    </p>
                    <div className="code-block text-sm">
                        <pre>
                            {`// Career path
const skills = [
  'Node.js',
  'TypeScript',
  'React',
  'Next.js',
  'Database Optimization',
  'Cloud Architecture'
];

// Eager to learn more!`}
                        </pre>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-4">My Approach</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="text-(--primary) mr-2">▹</span>
                            <span>Building scalable backend systems that can handle growth</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-(--primary) mr-2">▹</span>
                            <span>Writing clean, maintainable code with comprehensive tests</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-(--primary) mr-2">▹</span>
                            <span>Optimizing database queries and API performance</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-(--primary) mr-2">▹</span>
                            <span>Continuous learning and staying updated with new technologies</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}