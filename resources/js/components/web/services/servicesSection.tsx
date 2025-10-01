import { useState, useEffect, useRef } from 'react';

const ServicesSection = () => {
    const [visibleServices, setVisibleServices] = useState([]);
    const sectionRef = useRef(null);

    const services = [
        {
            title: "MINING SUPPORT & SERVICES",
            description: "We specialize in providing comprehensive support to the mining industry. From exploration assistance to on-site logistical coordination, our team ensures operations run smoothly, safely, and efficiently, contributing to the success of your projects.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            features: ["Exploration Assistance", "On-site Coordination", "Safety Management", "Operational Efficiency"],
            image: "/images/services/truck-potrait.png"
        },
        {
            title: "FINANCIAL CONSULTANCY",
            description: "With expert financial advisors, we offer guidance on investment strategies, risk management, and financial planning. Our goal is to empower businesses and individuals with the tools and knowledge to achieve their financial objectives.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            features: ["Investment Strategies", "Risk Management", "Financial Planning", "Wealth Building"],
            image: "/images/services/financy.jpg"
        },
        {
            title: "MANAGEMENT STRATEGIES",
            description: "We help organizations optimize their operations through strategic planning, process improvement, and leadership development. Our tailored solutions enable businesses to adapt to changing markets and drive sustainable growth.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            features: ["Strategic Planning", "Process Improvement", "Leadership Development", "Market Adaptation"],
            image: "/images/services/strategy.jpg"
        },
        {
            title: "LOGISTIC MANAGEMENT",
            description: "Whether you need reliable transportation solutions or end-to-end logistics management, we deliver services designed to keep you on the move. Our fleet is modern, well-maintained, and supported by a team of logistics professionals.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            features: ["Transportation Solutions", "End-to-End Logistics", "Modern Fleet", "Professional Team"],
            image: "/images/services/logistics.jpg"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleServices(prev => {
                            if (!prev.includes(index)) {
                                return [...prev, index];
                            }
                            return prev;
                        });
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const serviceElements = sectionRef.current?.querySelectorAll('.service-item');
        serviceElements?.forEach((element, index) => {
            element.dataset.index = index;
            observer.observe(element);
        });

        return () => {
            serviceElements?.forEach(element => observer.unobserve(element));
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-5 md:px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We offer a multi range of services within a company and the below listed are our core services that Denancy provides.
                        We have been dedicated to delivering innovative, reliable, and customer-focused solutions.
                    </p>
                </div>

                {/* Services - Full width with alternating layout */}
                <div className="space-y-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className={`service-item bg-white rounded-xs shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-700 ${
                                visibleServices.includes(index)
                                    ? 'opacity-100 translate-x-0 blur-0'
                                    : index % 2 === 0
                                        ? 'opacity-0 -translate-x-8 blur-sm'
                                        : 'opacity-0 translate-x-8 blur-sm'
                            }`}
                            style={{
                                transitionDelay: `${index * 200}ms`,
                                transitionProperty: 'opacity, transform, filter'
                            }}
                        >
                            <div className={`flex flex-col lg:flex-row ${
                                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                            } min-h-[500px] lg:min-h-[600px]`}>
                                {/* Image Section - Full height */}
                                <div className="lg:w-2/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-200">
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                                onError={(e) => {
                                                    //e.target.style.display = 'none';
                                                    const fallback = e.target.parentElement.querySelector('.image-fallback');
                                                    if (fallback) fallback.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className="image-fallback absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center hidden">
                                            <div className="text-white text-center p-8">
                                                <div className="w-20 h-20 bg-white/20 rounded-xs flex items-center justify-center mx-auto mb-4">
                                                    {service.icon}
                                                </div>
                                                <p className="text-xl font-medium">{service.title.split('&')[0]}</p>
                                                <p className="text-white/80 mt-2">Service Image</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Content Section */}
                                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-xs transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 transform transition-transform duration-300 hover:translate-x-2">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed text-lg mb-8 transform transition-transform duration-500 hover:translate-y-1">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="mb-8">
                                        <h4 className="text-base font-semibold text-gray-900 mb-4 uppercase tracking-wide transform transition-transform duration-300 hover:translate-x-1">
                                            Key Features:
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {service.features.map((feature, featureIndex) => (
                                                <div
                                                    key={featureIndex}
                                                    className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2 hover:text-blue-600"
                                                >
                                                    <div className="w-3 h-3 bg-amber-500 rounded-xs flex-shrink-0 transform transition-transform duration-300 hover:scale-125"></div>
                                                    <span className="text-gray-700 transition-colors duration-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Animated Border Effect */}
                                    <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-full transform transition-all duration-500 hover:w-32 hover:scale-110"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA with enhanced animation */}
                <div className={`text-center mt-16 transition-all duration-1000 ${
                    visibleServices.length >= 2
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-8 scale-95'
                }`}>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 lg:p-12 rounded-xs shadow-2xl max-w-4xl mx-auto transform transition-all duration-500 hover:scale-105">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
                        <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                            Let's discuss how our comprehensive services can drive your success forward.
                        </p>
                        <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xs transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                            Start Your Journey Today
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .service-item {
                    transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                                filter 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .service-item.visible {
                    animation: fadeInUp 0.8s ease-out;
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;
