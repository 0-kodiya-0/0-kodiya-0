import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
    title: 'Contact | Sanithu Jayakody Portfolio',
    description: 'Get in touch with Sanithu Jayakody for project inquiries, collaboration opportunities, or just to say hello.',
}

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-4xl font-bold mb-10 gradient-text inline-block">Get In Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="card h-full">
                        <h2 className="text-2xl font-bold mb-6">Let&apos;s Connect</h2>

                        <p className="mb-6">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities
                            to be part of your vision. Whether you have a question or just want to say hi,
                            I&apos;ll try my best to get back to you!
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--primary) mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <a href="mailto:hello@sanithu.dev" className="text-(--primary) hover:text-(--primary-light)">
                                        hello@sanithu.dev
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--primary) mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p>Colombo, Sri Lanka</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="font-semibold mb-3">Connect with me on:</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/sanithu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-(--syntax-comment) hover:text-(--foreground) transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/sanithu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-(--syntax-comment) hover:text-(--foreground) transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/sanithu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-(--syntax-comment) hover:text-(--foreground) transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card h-full">
                        <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}