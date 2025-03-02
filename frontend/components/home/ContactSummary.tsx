import Link from 'next/link';

export default function ContactSummary() {
  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          <span className="gradient-text">Let&apos;s Connect</span>
        </h2>
        <div className="terminal mb-8 mx-auto max-w-lg text-left">
          <p className="flex">
            <span className="text-(--syntax-keyword)">const</span>
            <span className="text-(--syntax-text) mx-2">contact</span>
            <span className="text-(--syntax-operator) mr-2">=</span>
            <span className="text-(--syntax-text)">&#123;</span>
          </p>
          <p className="flex ml-4">
            <span className="text-(--syntax-text)">email:</span>
            <span className="text-(--syntax-string) mx-2">&apos;hello@sanithu.dev&apos;</span>
            <span className="text-(--syntax-text)">,</span>
          </p>
          <p className="flex ml-4">
            <span className="text-(--syntax-text)">github:</span>
            <span className="text-(--syntax-string) mx-2">&apos;github.com/sanithu&apos;</span>
            <span className="text-(--syntax-text)">,</span>
          </p>
          <p className="flex ml-4">
            <span className="text-(--syntax-text)">linkedin:</span>
            <span className="text-(--syntax-string) mx-2">&apos;linkedin.com/in/sanithu&apos;</span>
          </p>
          <p className="flex">
            <span className="text-(--syntax-text)">&#125;;</span>
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">Send a Message</Link>
      </div>
    </section>
  );
}