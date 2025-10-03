import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, ArrowRight, CheckCircle } from 'lucide-react';
import IconComponent from '@/components/web/shared/IconComponent';

interface Service {
    id?: number;
    title: string;
    image: string;
    icon: string;
    description: string;
    long_description: string;
    features: string[];
}

interface ServiceDetailModalProps {
    service: Service | null;
    onClose: () => void;
    layout?: 'split' | 'full' | 'auto';
    showAllData?: boolean;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
    service,
    onClose,
    layout = 'auto',
    showAllData = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (service) {
            setIsVisible(true);
            setTimeout(() => setIsOpen(true), 10);

            const initialSections = {
                description: !isMobile,
                long_description: !isMobile,
                features: !isMobile,
            };
            setExpandedSections(initialSections);
        }
    }, [service, isMobile]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (!service || !isVisible) return null;

    const shouldShow = (data: any) => showAllData || (data && (Array.isArray(data) ? data.length > 0 : true));

    const getLayoutClasses = () => {
        if (layout === 'full') return { container: 'flex-col', image: 'w-full h-64', content: 'w-full' };
        if (layout === 'split') return { container: 'flex-col lg:flex-row', image: 'lg:w-1/2 h-64 lg:h-96', content: 'lg:w-1/2' };
        return {
            container: isMobile ? 'flex-col' : 'flex-col lg:flex-row',
            image: isMobile ? 'w-full h-64' : 'lg:w-1/2 h-64 lg:h-96',
            content: isMobile ? 'w-full' : 'lg:w-1/2'
        };
    };

    const layoutClasses = getLayoutClasses();

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            ></div>

            {/* Modal Container */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ${
                        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                    <IconComponent icon={service.icon || '⚡'} className="w-6 h-6" />
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                                <p className="text-gray-600 text-sm mt-1">Service Details</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95"
                            aria-label="Close modal"
                        >
                            <X className="text-gray-500 w-6 h-6" />
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className={`flex ${layoutClasses.container} flex-1 overflow-hidden`}>
                        {/* Image Section */}
                        <div className={`${layoutClasses.image} relative flex-shrink-0 overflow-hidden`}>
                            {service.image ? (
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl">{service.icon || '📷'}</span>
                                        </div>
                                        <p className="text-gray-500 font-medium">No image available</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>

                        {/* Content Section */}
                        <div className={`${layoutClasses.content} overflow-y-auto`}>
                            <div className="p-6 space-y-6">
                                {/* Overview Section */}
                                <section className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                                            Overview
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {service.description}
                                    </p>
                                </section>

                                {/* Detailed Description */}
                                {shouldShow(service.long_description) && (
                                    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                        <div
                                            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleSection('long_description')}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                                <div className="w-2 h-6 bg-green-600 rounded-full"></div>
                                                Detailed Information
                                            </h3>
                                            {expandedSections.long_description ? (
                                                <ChevronUp className="text-gray-500 w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="text-gray-500 w-5 h-5" />
                                            )}
                                        </div>
                                        <div
                                            className={`transition-all duration-300 overflow-hidden ${
                                                expandedSections.long_description ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="px-6 pb-6">
                                                <div className="text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-4">
                                                    {service.long_description}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Features Section */}
                                {shouldShow(service.features) && (
                                    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                        <div
                                            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleSection('features')}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    Key Features
                                                </h3>
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {service.features?.length || 0}
                                                </span>
                                            </div>
                                            {expandedSections.features ? (
                                                <ChevronUp className="text-gray-500 w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="text-gray-500 w-5 h-5" />
                                            )}
                                        </div>
                                        <div
                                            className={`transition-all duration-300 overflow-hidden ${
                                                expandedSections.features ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="px-6 pb-6">
                                                <div className="grid gap-3 border-t border-gray-100 pt-4">
                                                    {service.features?.length ? (
                                                        service.features.map((feature, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                                                style={{
                                                                    transitionDelay: `${index * 50}ms`,
                                                                    opacity: expandedSections.features ? 1 : 0,
                                                                    transform: expandedSections.features ? 'translateX(0)' : 'translateX(-20px)',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                            >
                                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                                                    {feature}
                                                                </span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-center py-8 text-gray-500">
                                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                                <span className="text-2xl">📝</span>
                                                            </div>
                                                            No features listed
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailModal;
