import { useState, useEffect, useRef } from 'react';
import IconComponent from '../shared/IconComponent';

export interface Stats {
    id: number;
    icon: string;
    label: string;
    value: string;
    description: string;
}

const StatisticsSection = ({stats}:{stats:Stats[]}) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

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
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xs border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <AnimatedCounter
                                    value={stat.value}
                                    isVisible={isVisible}
                                    duration={2500}
                                    delay={stat.id * 300}
                                />

                                <div className="my-4">
                                    <IconComponent className='text-3xl md:text-4xl text-white' icon={stat.icon} />
                                </div>

                                <h3 className="text-white font-bold text-lg mb-2">
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
                        Join the growing value of satisfied clients who trust Denancy Legends Group.
                    </p>
                </div>
            </div>
        </section>
    );
};

// Helper function to parse value and extract numeric part and suffix
const parseValue = (value: string): { numericValue: number; suffix: string } => {
    // Remove any whitespace and convert to string
    const stringValue = String(value).trim();

    // Extract numeric part (digits and decimal points)
    const numericMatch = stringValue.match(/^(\d+(?:\.\d+)?)/);
    const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;

    // Extract suffix (everything after the numeric part)
    const suffix = stringValue.replace(/^(\d+(?:\.\d+)?)/, '').trim();

    return { numericValue, suffix };
};

// Animated Counter Component
const AnimatedCounter = ({ value = "0", isVisible = true, duration = 2000, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Parse the value to get numeric part and suffix
    const { numericValue, suffix } = parseValue(value);

    useEffect(() => {
        if (isVisible && !hasAnimated && numericValue > 0) {
            const timer = setTimeout(() => {
                setHasAnimated(true);

                let start = 0;
                const end = numericValue;

                // Calculate increment time based on duration and target value
                const incrementTime = Math.max(1, duration / end);

                const timerId = setInterval(() => {
                    start += 1;
                    setCount(Math.min(start, end));

                    if (start >= end) {
                        clearInterval(timerId);
                    }
                }, incrementTime);

                return () => clearInterval(timerId);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isVisible, numericValue, duration, delay, hasAnimated]);

    // If value is 0 or not a valid number, just display the original value
    if (numericValue === 0 || !isVisible || !hasAnimated) {
        return (
            <div className="text-3xl md:text-4xl font-bold text-white">
                {value}
            </div>
        );
    }

    return (
        <div className="text-3xl md:text-4xl font-bold text-white">
            {count}{suffix}
        </div>
    );
};

export default StatisticsSection;
