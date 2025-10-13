
import React, { useState,useEffect } from 'react';
import Navbar from '../Component/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 

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

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
     // Detect touch device
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
    // Handle form submission here
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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Watch Service"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-8 border-2 border-yellow-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-white mb-6">
              Contact Us
            </h1>
            <div className="w-24 h-0.5 bg-yellow-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience unparalleled service and expertise. Our dedicated team is here to assist you with any inquiries about our timepieces.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-0.5 bg-yellow-600 mr-4"></div>
                  <span className="text-yellow-600 uppercase tracking-widest text-sm font-semibold">Get In Touch</span>
                </div>
                <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
                  We're Here to <span className="text-yellow-600">Assist You</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our concierge team is dedicated to providing exceptional service. 
                  Whether you need assistance with a purchase, warranty information, 
                  or expert advice, we're here to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-300">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600 text-lg">+1 (555) 123-VELO</p>
                    <p className="text-gray-500 text-sm">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-300">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 text-lg">concierge@veloce.com</p>
                    <p className="text-gray-500 text-sm">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-300">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Boutique</h3>
                    <p className="text-gray-600 text-lg">123 Luxury Avenue</p>
                    <p className="text-gray-500 text-sm">Geneva, Switzerland 1201</p>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-serif font-light text-gray-900 mb-4">Service Excellence</h3>
                <div className="space-y-3">
                  {[
                    "Personalized watch consultations",
                    "Comprehensive after-sales support",
                    "International warranty services",
                    "Expert maintenance and repairs"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-0.5 bg-yellow-600 mr-4"></div>
                <span className="text-yellow-600 uppercase tracking-widest text-sm font-semibold">Send Message</span>
              </div>
              
              <h2 className="text-3xl font-serif font-light text-gray-900 mb-8">
                Let's Start a <span className="text-yellow-600">Conversation</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300 bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300 bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300 bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300 bg-white"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300 bg-white resize-none"
                    placeholder="Tell us how we can assist you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-0.5 bg-yellow-600"></div>
            </div>
            <h2 className="text-4xl font-serif font-light mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-lg">
              Quick answers to common questions about our services and policies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "What is your warranty policy?",
                answer: "All Veloce timepieces come with a 2-year international warranty covering manufacturing defects."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we provide complimentary express shipping to over 100 countries worldwide."
              },
              {
                question: "Can I schedule a virtual consultation?",
                answer: "Absolutely. Our watch experts are available for personalized virtual appointments."
              },
              {
                question: "How do I service my Veloce watch?",
                answer: "We recommend professional servicing every 3-5 years. Contact our service center for scheduling."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-600/30 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-yellow-600">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-light text-white mb-6">
            Experience the Veloce Difference
          </h2>
          <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Veloce for exceptional timepieces and unparalleled service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=> navigate ("/shop")} 
            className="bg-white text-yellow-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              Browse Collection
            </button>
            {/* <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-yellow-700 transition-all duration-300">
              Book Consultation
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;