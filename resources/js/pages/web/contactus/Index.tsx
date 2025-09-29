import { useState } from 'react';
import WebLayout from '@/layouts/web-layout'
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Index = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

    console.log('Submitting form data:', csrfToken, formData);
    try {
      const response = await fetch('/api/contactus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(formData),

      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        console.log('Form submitted successfully');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const topSectionProps = {
    title: "Contact Us",
    description: "Get in touch with our team for any inquiries or support.",
    images: [{
    url: '/images/contact-bg.jpg',
    title: 'Contact Us Background'
    }],
    primaryButtonColor: "blue",
    showBanner: true
  }

  return (
    <WebLayout topSectionProps={topSectionProps}>
      <div className="min-h-screen bg-gray-50 pb-10 pt-20">
        <div className="max-w-6xl mx-auto text-gray-900">
            <div className="grid grid-cols-1 my-10 md:grid-cols-6 gap-12">
                {/* Contact Information */}
                <div className="md:col-span-3 space-y-4">

                <div className="bg-white shadow-sm p-4 rounded-xs">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Info</h2>
                    <div className="space-y-8 grid grid-cols-1 md:grid-cols-2">
                        {/* Phone */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0 rounded-xs">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            </div>
                            <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Phone</h3>
                            <p className="text-gray-600 text-sm">+255 658 209 911</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-green-100 flex items-center justify-center flex-shrink-0 rounded-xs">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            </div>
                            <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                            <p className="text-gray-600 text-sm">info@denancy.co.tz</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-purple-100 flex items-center justify-center flex-shrink-0 rounded-xs">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            </div>
                            <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Address</h3>
                            <p className="text-gray-600 text-sm">123 Business District</p>
                            <p className="text-gray-600 text-sm">Dar es Salaam</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white shadow-sm p-2 rounded-xs">
                    <div className="bg-gray-200 h-60 flex items-center justify-center rounded-xs">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.041234123456!2d39.2081234!3d-6.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjguNCJTIDM5wrAxMic1Mi4xIkU!5e0!3m2!1sen!2stz!4v1234567890"
                        width="100%"
                        title='Company Location Map'
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    </div>
                </div>

                </div>

                {/* Contact Form */}
                <div className="md:col-span-3 bg-white shadow-sm p-6 rounded-xs">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Send Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                            </label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none text-sm"
                            placeholder="Your full name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none text-sm"
                            placeholder="Your email"
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                            </label>
                            <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none text-sm"
                            placeholder="Your phone number"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject *
                            </label>
                            <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none text-sm"
                            >
                            <option value="">Select a subject</option>
                            <option value="general-inquiry">General Inquiry</option>
                            <option value="services">Services Information</option>
                            <option value="partnership">Partnership</option>
                            <option value="support">Technical Support</option>
                            <option value="other">Other</option>
                            </select>
                        </div>
                        </div>

                        {/* Message */}
                        <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none text-sm resize-vertical"
                            placeholder="How can we help you?"
                        />
                        </div>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm animate-fade-in">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-green-800 font-semibold text-sm">Success!</h3>
                                        <p className="text-green-700 text-sm mt-1">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                                    </div>
                                    <button
                                        className="ml-auto flex-shrink-0 text-green-400 hover:text-green-600 transition-colors"
                                        onClick={() => setSubmitStatus("")}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm animate-fade-in">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-red-800 font-semibold text-sm">Error</h3>
                                        <p className="text-red-700 text-sm mt-1">Sorry, there was an error sending your message. Please try again or contact us directly.</p>
                                    </div>
                                    <button
                                        className="ml-auto flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                                        onClick={() => setSubmitStatus("")}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}



                        {/* Submit Button */}
                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xs font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                            </div>
                        ) : (
                            'Send Message'
                        )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </WebLayout>
  )
}

export default Index
