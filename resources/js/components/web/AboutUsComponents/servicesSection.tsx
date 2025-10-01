import { useState, useEffect, useRef } from 'react';

const StatisticsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        {
            number: 25,
            suffix: '+',
            label: 'Partner Institutions',
            description: 'Trusted by organizations worldwide'
        },
        {
            number: 150,
            suffix: '+',
            label: 'Projects Completed',
            description: 'Successful implementations'
        },
        {
            number: 98,
            suffix: '%',
            label: 'Client Satisfaction',
            description: 'Happy customers served'
        },
        {
            number: 5,
            suffix: '+',
            label: 'Years Experience',
            description: 'Industry expertise'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Our <span className="text-amber-400">Impact</span> in Numbers
                    </h2>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        Delivering excellence and driving success across all our service domains
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xs border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <AnimatedCounter
                                    value={stat.number}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                    duration={2000}
                                    delay={index * 300}
                                />
                                <h3 className="text-white font-bold text-lg mb-2 mt-4">
                                    {stat.label}
                                </h3>
                                <p className="text-blue-200 text-sm">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-12">
                    <p className="text-blue-200 font-serif italic text-lg">
                        Join the growing number of satisfied clients who trust Denancy Legends Group.
                    </p>
                </div>
            </div>
        </section>
    );
};

// Animated Counter Component
const AnimatedCounter = ({ value = 0, suffix = '', isVisible = true, duration = 2000, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isVisible && !hasAnimated) {
            const timer = setTimeout(() => {
                setHasAnimated(true);
                let start = 0;
                const end = value;
                const incrementTime = duration / end;

                const timerId = setInterval(() => {
                    start += 1;
                    setCount(start);
                    if (start >= end) {
                        clearInterval(timerId);
                    }
                }, incrementTime);

                return () => clearInterval(timerId);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isVisible, value, duration, delay, hasAnimated]);

    return (
        <div className="text-3xl md:text-4xl font-bold text-white">
            {count}
            <span className="text-amber-400">{suffix}</span>
        </div>
    );
};

export default StatisticsSection;
