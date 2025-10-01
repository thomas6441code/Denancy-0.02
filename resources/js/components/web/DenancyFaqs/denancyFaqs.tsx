import { useState } from 'react';

interface Faqs {
    'id': number;
    'question': string;
    'answer': string;
    'category': string;
}

const DenancyHelp = ({ faqs, title }: { faqs: Faqs[], title: string }) => {
    const [activeIndex, setActiveIndex] = useState(10);
    const [activeCategory, setActiveCategory] = useState('All');

    // Get unique categories
    const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

    // Filter FAQs by category
    const filteredFaqs = activeCategory === 'All'
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? 10 : index);
    };

    return (
        <div className="my-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600">Find answers to common questions</p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-1 font-medium transition-all duration-300 ${
                                activeCategory === category
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                    : 'bg-white outline-amber-200 outline-1 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ List - Ultra Compact */}
                <div className="space-y-2 md:px-5 md:max-w-4xl mx-auto">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`bg-white p-3 border-l-2 transition-all duration-200 ${
                                activeIndex === index
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                        >
                            <button
                                onMouseEnter={() => toggleAccordion(index)}
                                className="w-full text-left flex items-start gap-3"
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[0.9rem] font-medium text-gray-900 leading-tight">
                                        {faq.question}
                                    </h3>
                                    <div className={`transition-all duration-300 overflow-hidden ${
                                        activeIndex === index ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
                                    }`}>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                                 <span className="text-sm  font-medium text-blue-600 bg-blue-100 px-2 py-1 mt-0.5">
                                    {faq.category}
                                </span>
                                <svg
                                    className={`w-3 h-3 text-gray-400 mt-1 flex-shrink-0 transform transition-transform ${
                                        activeIndex === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredFaqs.length === 0 && (
                    <div className="text-center py-12">
                        <svg
                            className="w-16 h-16 text-gray-400 mx-auto mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M11 14H9a2 2 0 01-2-2V9a2 2 0 012-2h5a2 2 0 012 2v1"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No questions found
                        </h3>
                        <p className="text-gray-500">
                            Try selecting a different category or check back later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DenancyHelp;
