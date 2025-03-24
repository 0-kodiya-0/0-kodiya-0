'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send the actual email using a server endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md border border-gray-300 bg-(--card) focus:border-(--primary) focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md border border-gray-300 bg-(--card) focus:border-(--primary) focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md border border-gray-300 bg-(--card) focus:border-(--primary) focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-3 rounded-md border border-gray-300 bg-(--card) focus:border-(--primary) focus:outline-none"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn btn-primary w-full flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </div>

                {submitStatus === 'success' && (
                    <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md text-center animate-fade-in">
                        Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-center animate-fade-in">
                        There was an error sending your message. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
}