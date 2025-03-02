import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-[var(--card-border)] py-4 px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-mono font-bold text-xl">
            <span className="text-[var(--primary)]">sanithu</span>
            <span className="text-[var(--foreground)]">@portfolio</span>
            <span className="text-[var(--primary)]">:~$</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Projects', 'Skills', 'Blog', 'Contact'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="animated-underline">
                {item}
              </Link>
            ))}
          </div>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center py-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <div className="md:w-1/2 space-y-6 animate-fade-in">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="text-sm ml-2 text-[var(--syntax-comment)]">~/portfolio/intro.sh</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            <span className="block">Backend Whisperer &</span>
            <span className="gradient-text">Code Enthusiast</span>
          </h1>
          <div className="terminal p-4 my-4 font-mono text-sm">
            <p className="flex">
              <span className="text-[var(--syntax-keyword)]">const</span>
              <span className="text-[var(--syntax-text)] mx-2">developer</span>
              <span className="text-[var(--syntax-operator)] mr-2">=</span>
              <span className="text-[var(--syntax-string))">&apos;Sanithu Jayakody&apos;</span>
              <span className="text-[var(--syntax-text)]">;</span>
            </p>
            <p className="flex mt-2">
              <span className="text-[var(--syntax-comment)]">{`// Full Stack Developer passionate about backend systems`}</span>
            </p>
            <p className="flex mt-2">
              <span className="text-[var(--syntax-keyword)]">function</span>
              <span className="text-[var(--syntax-function)] mx-2">getCurrentStatus</span>
              <span className="text-[var(--syntax-operator)]">()</span>
              <span className="text-[var(--syntax-text)] mx-2">&#123;</span>
            </p>
            <p className="flex ml-4">
              <span className="text-[var(--syntax-keyword)]">return</span>
              <span className="text-[var(--syntax-string)] mx-2">&apos;Still learning, still growing!&apos;</span>
              <span className="text-[var(--syntax-text)]">;</span>
            </p>
            <p className="flex">
              <span className="text-[var(--syntax-text)]">&#125;</span>
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-primary">View Projects</button>
            <button className="btn btn-secondary">Contact Me</button>
          </div>
        </div>
        <div className="md:w-2/5 mt-10 md:mt-0 animate-slide-up">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* This would be your profile image */}
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-80"></div>
            <div className="absolute inset-2 bg-[var(--card)] rounded-lg flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
              {/* Uncomment when you have an actual image */}
              {/* <Image 
                src="/images/profile.jpg" 
                alt="Sanithu Jayakody" 
                fill 
                className="object-cover rounded-lg"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Code Theme */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 gradient-text inline-block">About.me()</h2>

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
                <span className="text-[var(--primary)] mr-2">▹</span>
                <span>Building scalable backend systems that can handle growth</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">▹</span>
                <span>Writing clean, maintainable code with comprehensive tests</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">▹</span>
                <span>Optimizing database queries and API performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">▹</span>
                <span>Continuous learning and staying updated with new technologies</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="projects" className="py-20 px-6 bg-[var(--card-hover)] border-y border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            <span className="text-[var(--syntax-keyword)]">const</span>
            <span className="ml-2">projects</span>
            <span className="text-[var(--syntax-operator)] mx-2">=</span>
            <span className="text-[var(--syntax-function)]">myWork</span>
            <span className="text-[var(--syntax-operator)]">()</span>
            <span>;</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card group">
                <div className="h-48 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-md mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[var(--syntax-bg)] opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                <p className="text-sm mb-4">A short description of this amazing project and the problems it solves.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Next.js', 'TypeScript', 'MongoDB'].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Link href="#" className="text-[var(--primary)] animated-underline text-sm">
                    View Project
                  </Link>
                  <Link href="#" className="text-[var(--syntax-comment)] hover:text-[var(--foreground)] transition-colors text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="gradient-text">Let&apos;s Connect</span>
          </h2>
          <div className="terminal mb-8 mx-auto max-w-lg text-left">
            <p className="flex">
              <span className="text-[var(--syntax-keyword)]">const</span>
              <span className="text-[var(--syntax-text)] mx-2">contact</span>
              <span className="text-[var(--syntax-operator)] mr-2">=</span>
              <span className="text-[var(--syntax-text)]">&#123;</span>
            </p>
            <p className="flex ml-4">
              <span className="text-[var(--syntax-text)]">email:</span>
              <span className="text-[var(--syntax-string)] mx-2">&apos;hello@sanithu.dev&apos;</span>
              <span className="text-[var(--syntax-text)]">,</span>
            </p>
            <p className="flex ml-4">
              <span className="text-[var(--syntax-text)]">github:</span>
              <span className="text-[var(--syntax-string)] mx-2">&apos;github.com/sanithu&apos;</span>
              <span className="text-[var(--syntax-text)]">,</span>
            </p>
            <p className="flex ml-4">
              <span className="text-[var(--syntax-text)]">linkedin:</span>
              <span className="text-[var(--syntax-string)] mx-2">&apos;linkedin.com/in/sanithu&apos;</span>
            </p>
            <p className="flex">
              <span className="text-[var(--syntax-text)]">&#125;;</span>
            </p>
          </div>
          <button className="btn btn-primary">Send a Message</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="font-mono text-sm mb-4 md:mb-0">
            <span className="text-[var(--syntax-comment)]">{`// Designed & Built by Sanithu Jayakody`}</span>
          </div>
          <div className="flex space-x-6">
            {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((item) => (
              <Link key={item} href="#" className="text-sm text-[var(--syntax-comment)] hover:text-[var(--foreground)] transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}