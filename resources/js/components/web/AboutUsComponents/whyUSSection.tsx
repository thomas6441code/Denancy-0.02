const WhyChooseUs = () => {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Proven Excellence",
            description: "With a track record of successful projects and satisfied clients across multiple industries"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Expert Team",
            description: "Seasoned professionals with decades of combined experience in their respective fields"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Innovation Driven",
            description: "Constantly evolving our strategies to incorporate the latest industry trends and technologies"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Trust & Integrity",
            description: "Building lasting relationships based on transparency, honesty, and mutual respect"
        }
    ];

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose <span className="text-blue-600">Denancy Legends Group?</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover what sets us apart and makes us the preferred partner for businesses seeking exceptional results
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Content */}
                    <div className="space-y-6 md:mx-3">
                        <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-xs">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-gray-900">Our Commitment to Excellence.</h3>
                            </div>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    At Denancy Legends Group, we pride ourselves on our unwavering commitment to excellence,
                                    integrity, and innovation. Our foundation is built on delivering exceptional value through
                                    customized solutions that address the unique challenges and opportunities of each client.
                                </p>
                                <p>
                                    With years of industry experience and a passion for exceeding expectations, our team of
                                    seasoned professionals brings unparalleled expertise to every project. We don't just meet
                                    expectations – we consistently surpass them through meticulous attention to detail and
                                    strategic execution.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xs shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-white/20 text-white flex items-center justify-center rounded-xs">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Partnership Approach</h3>
                            </div>
                            <p className="leading-relaxed text-blue-100">
                                We believe in fostering long-term partnerships based on trust, mutual success, and shared
                                goals. Your success is our success, and we're committed to being a reliable partner throughout
                                your journey to achieving your business objectives.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 rounded-xs border border-gray-200 hover:border-blue-300 group"
                            >
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xs mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
