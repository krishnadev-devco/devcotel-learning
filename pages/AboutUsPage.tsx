import React, { useState } from 'react';

interface AboutUsPageProps {
    handleNavClick: (page: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ handleNavClick }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setError('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        try {
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push({ ...formData, date: new Date().toISOString() });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (err) {
            console.error(err);
            setError('Failed to save your message. Please try again.');
        }
    };

    return (
        <div className="about-us-page">
            <div className="container">
                <section className="all-courses-header">
                    <h1>About Devcotel</h1>
                    <p>Your trusted partner in skill development and career advancement.</p>
                </section>

                <section className="about-story">
                    <h2>Our Journey</h2>
                    <div className="about-section-content">
                        <div className="about-section-text">
                            <p>
                                Our journey began in 2025 with a clear vision: to create a platform that genuinely helps students land their dream job. We saw a gap between traditional education and the fast-evolving tech industry, and we wanted to bridge it. Devcotel was born out of a passion for empowering the next generation of professionals through targeted skill development, mentorship, and strong industry connections.
                            </p>
                        </div>
                        <div className="about-section-image">
                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Team collaborating on a project" />
                        </div>
                    </div>
                </section>
                
                 <section className="impact-stats">
                    <div className="impact-stat">
                        <h3>200+</h3>
                        <p>Students Guided</p>
                    </div>
                     <div className="impact-stat">
                        <h3>50+</h3>
                        <p>Industry Partnerships</p>
                    </div>
                     <div className="impact-stat">
                        <h3>95%</h3>
                        <p>Career Placement Rate</p>
                    </div>
                </section>

                <section className="about-mission">
                    <h2>Devcotel Assured</h2>
                     <div className="about-section-content reverse">
                        <div className="about-section-text">
                            <p>
                                We have partnered with multiple leading platforms to bring you the best learning resources. When you enroll in a course through Devcotel, you get exclusive offers and discounts on programs that are "Devcotel Assured." This tag is our promise of quality and relevance. Beyond just courses, we actively monitor our users, providing personalized guidance to ensure they not only learn but also excel in their chosen careers. We're with you every step of the way.
                            </p>
                        </div>
                         <div className="about-section-image">
                            <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" alt="Student receiving an offer" />
                        </div>
                    </div>
                </section>
                
                <section className="contact-section-premium">
                     <h2>Get in Touch</h2>
                    <div className="contact-wrapper">
                        <div className="contact-info-panel">
                            <h3>Contact Information</h3>
                            <p>We'd love to hear from you. Whether you have a question about our programs, partnerships, or anything else, our team is ready to answer all your questions.</p>
                            <ul className="contact-details">
                                <li><i className="fas fa-map-marker-alt"></i> 123 Tech Avenue, Silicon Valley</li>
                                <li><i className="fas fa-phone-alt"></i> +1 (555) DEV-COTEL</li>
                                <li><i className="fas fa-envelope"></i> hello@devcotel.com</li>
                            </ul>
                        </div>
                        <div className="contact-form-panel">
                            <h3>Send us a Message</h3>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
                                </div>
                                {error && <p className="form-error">{error}</p>}
                                {isSubmitted && <p className="form-success">Thank you! Your message has been sent.</p>}
                                <button type="submit" className="btn-submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};