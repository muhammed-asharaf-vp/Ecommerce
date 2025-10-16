import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    const navigate = useNavigate();
    const [touchDevice, setTouchDevice] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 100
        });
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const isTouchDevice = () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        };
        setTouchDevice(isTouchDevice());
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent successfully! We will get back to you within 24 hours.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-16 bg-gradient-to-br from-[#003631] to-[#002822]">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <div 
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-[#FFEDA8]/20"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        <div className="w-2 h-2 bg-[#FFEDA8] rounded-full animate-pulse"></div>
                        <span className="text-sm font-light tracking-widest text-[#FFEDA8]">
                            CONTACT US
                        </span>
                    </div>
                    <h1 
                        className="text-4xl md:text-5xl font-light text-white mb-4"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Get In Touch
                    </h1>
                    <p 
                        className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Our dedicated team is here to provide exceptional service and support for all your inquiries.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8">
                            <div
                                data-aos="fade-right"
                                data-aos-delay="100"
                            >
                                <h2 className="text-2xl font-light text-white mb-4">Contact Information</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    Reach out to us through any of the following channels. We're always happy to help.
                                </p>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-[#FFEDA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        ),
                                        title: "Phone",
                                        detail: "+91 12345 67890",
                                        subdetail: "Mon-Fri: 9AM-6PM EST",
                                        delay: 200
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-[#FFEDA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        ),
                                        title: "Email",
                                        detail: "concierge@veloce.com",
                                        subdetail: "Response within 24 hours",
                                        delay: 300
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6 text-[#FFEDA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        ),
                                        title: "Boutique",
                                        detail: "123 Luxury Avenue",
                                        subdetail: "Kerala, India 682001",
                                        delay: 400
                                    }
                                ].map((contact, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFEDA8]/30 transition-all duration-300 transform hover:scale-105"
                                        data-aos="fade-right"
                                        data-aos-delay={contact.delay}
                                    >
                                        <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {contact.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{contact.title}</h3>
                                            <p className="text-gray-300">{contact.detail}</p>
                                            <p className="text-gray-400 text-sm">{contact.subdetail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Service Highlights */}
                            <div 
                                className="p-6 rounded-lg bg-white/5 border border-white/10"
                                data-aos="fade-right"
                                data-aos-delay="500"
                            >
                                <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
                                <div className="space-y-3">
                                    {[
                                        "Personalized consultations",
                                        "International warranty",
                                        "Expert maintenance",
                                        "After-sales support"
                                    ].map((service, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center space-x-3"
                                            data-aos="fade-right"
                                            data-aos-delay={600 + (index * 100)}
                                        >
                                            <div className="w-1.5 h-1.5 bg-[#FFEDA8] rounded-full"></div>
                                            <span className="text-gray-300 text-sm">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div 
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                                data-aos="fade-left"
                                data-aos-delay="200"
                            >
                                <div className="mb-8">
                                    <h2 
                                        className="text-2xl font-light text-white mb-2"
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                    >
                                        Send us a Message
                                    </h2>
                                    <p 
                                        className="text-gray-300"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                    >
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300 bg-white/5 text-white placeholder-gray-400"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300 bg-white/5 text-white placeholder-gray-400"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        data-aos="fade-up"
                                        data-aos-delay="600"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300 bg-white/5 text-white placeholder-gray-400"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300 bg-white/5 text-white"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="sales">Sales Inquiry</option>
                                                <option value="support">Customer Support</option>
                                                <option value="warranty">Warranty Service</option>
                                                <option value="repair">Watch Repair</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        data-aos="fade-up"
                                        data-aos-delay="700"
                                    >
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-4 py-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300 bg-white/5 text-white placeholder-gray-400 resize-none"
                                            placeholder="Please describe your inquiry in detail..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#FFEDA8] text-[#003631] py-3 px-6 rounded-lg font-semibold hover:bg-[#FFEDA8]/90 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                                        data-aos="zoom-in"
                                        data-aos-delay="800"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div 
                        className="text-center mb-12"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h2 className="text-3xl font-light text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">Find quick answers to common questions about our services and policies.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "What is your warranty policy?",
                                answer: "All Veloce timepieces come with a comprehensive 2-year international warranty covering manufacturing defects and workmanship.",
                                delay: 200
                            },
                            {
                                question: "Do you offer international shipping?",
                                answer: "Yes, we provide complimentary insured express shipping to over 100 countries with tracking and signature confirmation.",
                                delay: 300
                            },
                            {
                                question: "Can I schedule a virtual consultation?",
                                answer: "Absolutely. Our watch experts are available for personalized virtual appointments to help you find the perfect timepiece.",
                                delay: 400
                            },
                            {
                                question: "How do I service my Veloce watch?",
                                answer: "We recommend professional servicing every 3-5 years. Contact our certified service center for scheduling and maintenance.",
                                delay: 500
                            }
                        ].map((faq, index) => (
                            <div 
                                key={index} 
                                className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFEDA8]/30 transition-all duration-300 transform hover:scale-105"
                                data-aos="flip-up"
                                data-aos-delay={faq.delay}
                            >
                                <h3 className="text-lg font-semibold text-[#FFEDA8] mb-3">{faq.question}</h3>
                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-r from-[#003631] to-[#002822] border-t border-white/10">
                <div 
                    className="max-w-4xl mx-auto px-6 text-center"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    <h2 className="text-2xl font-light text-white mb-4">Ready to Find Your Perfect Timepiece?</h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Explore our exclusive collection of luxury watches crafted with precision and elegance.
                    </p>
                    <button 
                        onClick={() => navigate("/shop")}
                        className="bg-[#FFEDA8] text-[#003631] px-8 py-3 rounded-lg font-semibold hover:bg-[#FFEDA8]/90 transition-colors duration-300 transform hover:scale-105 cursor-pointer"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        Browse Collection
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Contact;