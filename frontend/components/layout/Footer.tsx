import Link from 'next/link';

export default function Footer() {
    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/sanithu' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/sanithu' },
        { name: 'Twitter', url: 'https://twitter.com/sanithu' },
        { name: 'Email', url: 'mailto:hello@sanithu.dev' }
    ];

    return (
        <footer className="py-8 px-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="font-mono text-sm mb-4 md:mb-0">
                    <span className="text-(--syntax-comment)">{`// Designed & Built by Sanithu Jayakody`}</span>
                </div>
                <div className="flex space-x-6">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.url}
                            className="text-sm text-(--syntax-comment) hover:text-(--foreground) transition-colors"
                            target={link.name === 'Email' ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}