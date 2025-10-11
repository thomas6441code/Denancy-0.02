interface ElevateSectionProps {
    title?: string;
    subtitle?: string;
    primaryButton?: string;
    secondaryButton?: string;
    features?: Array<{
        icon: React.ReactNode;
        title: string;
        description: string;
    }>;
}

const DynamicElevateSection: React.FC<ElevateSectionProps> = ({
    title = "Ready To Elevate Your Business Or Services?",
    subtitle = "Explore Our Range of Tailored Services and Take the First Step Towards Financial Literacy.",
    primaryButton = "Explore Services",
    secondaryButton = "Learn More",
    features = [
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Rapid Growth",
            description: "Accelerate your business with proven strategies."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Secure Future",
            description: "Build financial stability with expert guidance."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Expert Support",
            description: "Dedicated team for your financial journey."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m0 0L5 7m4-4l4 4m6 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.343M16 3l4 4m0 0l-4 4m4-4H16" />
                </svg>
            ),
            title: "Innovative Solutions",
            description: "Cutting-edge tools to streamline your finances."
        }
    ]
}) => {
    return (
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-10 px-4 md:px-14">
            <div className="min-w-full text-center">
                {/* Main Heading */}
                <h2 className="text-3xl font-serif italic md:text-[2.7rem] font-bold mb-6 leading-tight">
                    {title.split('Your')[0]}Your{' '}
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                        {title.split('Your')[1]}
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button onClick={()=> window.location.href = "/services"} className="bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25">
                        {primaryButton}
                    </button>
                    <button onClick={()=> window.location.href = "/contactus"} className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold py-2 px-7 transition-all duration-300 transform hover:scale-105">
                        {secondaryButton}
                    </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="p-4 md:p-6">
                            <div className="w-12 h-12 bg-amber-500 flex items-center justify-center mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-blue-200">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DynamicElevateSection;
