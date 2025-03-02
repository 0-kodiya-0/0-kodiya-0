import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row justify-between items-center py-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
                <div className="terminal-header">
                    <div className="terminal-dot bg-red-500"></div>
                    <div className="terminal-dot bg-yellow-500"></div>
                    <div className="terminal-dot bg-green-500"></div>
                    <span className="text-sm ml-2 text-(--syntax-comment)">~/portfolio/intro.sh</span>
                </div>
                <h1 className="text-5xl font-bold leading-tight">
                    <span className="block">Backend Whisperer &</span>
                    <span className="gradient-text">Code Enthusiast</span>
                </h1>
                <div className="terminal p-4 my-4 font-mono text-sm">
                    <p className="flex">
                        <span className="text-(--syntax-keyword)">const</span>
                        <span className="text-(--syntax-text) mx-2">developer</span>
                        <span className="text-(--syntax-operator) mr-2">=</span>
                        <span className="text-(--syntax-string)">&apos;Sanithu Jayakody&apos;</span>
                        <span className="text-(--syntax-text)">;</span>
                    </p>
                    <p className="flex mt-2">
                        <span className="text-(--syntax-comment)">{`// Full Stack Developer passionate about backend systems`}</span>
                    </p>
                    <p className="flex mt-2">
                        <span className="text-(--syntax-keyword)">function</span>
                        <span className="text-(--syntax-function) mx-2">getCurrentStatus</span>
                        <span className="text-(--syntax-operator)">()</span>
                        <span className="text-(--syntax-text) mx-2">&#123;</span>
                    </p>
                    <p className="flex ml-4">
                        <span className="text-(--syntax-keyword)">return</span>
                        <span className="text-(--syntax-string) mx-2">&apos;Still learning, still growing!&apos;</span>
                        <span className="text-(--syntax-text)">;</span>
                    </p>
                    <p className="flex">
                        <span className="text-(--syntax-text)">&#125;</span>
                    </p>
                </div>
                <div className="flex space-x-4">
                    <Link href="/projects" className="btn btn-primary">View Projects</Link>
                    <Link href="/contact" className="btn btn-secondary">Contact Me</Link>
                </div>
            </div>
            <div className="md:w-2/5 mt-10 md:mt-0 animate-slide-up">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* This would be your profile image */}
                    <div className="w-full h-full rounded-lg bg-linear-to-br from-(--primary) to-(--accent) opacity-80"></div>
                    <div className="absolute inset-2 bg-(--card) rounded-lg flex items-center justify-center">
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
    );
}