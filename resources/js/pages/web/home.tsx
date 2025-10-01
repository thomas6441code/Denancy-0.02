import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from '@/layouts/web-layout';
import DenancyHelp from '@/components/web/DenancyFaqs/denancyFaqs';
import { sampleFaqs, sampleTestimonials } from '@/components/web/DenancyFaqs/sampleData';
import TestimonialCard from '@/components/web/Testimonial/testimonialSection';
import DynamicElevateSection from '@/components/web/HomeCta/homeCta';
import AboutSection from '@/components/web/HomeCta/HomeWelcome';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const topSectionProps = {
        title: "Home Us",
        description: "Welcome to Denancy Legends Group - Your trusted partner for innovative solutions and exceptional service delivery in Tanzania and beyond.",
        images: [
            {
                url: '/images/slides/home.jpg',
                title: 'Denancy Legends Group',
                description: 'Denancy Legends Group - Your trusted partner for innovative solutions and exceptional service delivery in Tanzania and beyond.'
            },
            {
                url: '/images/services/strategy.jpg',
                title: 'Management Consulting.',
                description: 'Denancy Legends Group offers expert management consulting services to help businesses optimize operations, improve efficiency, and drive growth.'
            },
            {
                url: '/images/services/money.jpg',
                title: 'Financial Advisory.',
                description: 'Denancy Legends Group provides comprehensive financial advisory services to assist businesses in making informed decisions and achieving their financial goals.'
            }
        ],
        showBanner: "home"
    };

    console.log(auth);
    return (
        <WebLayout topSectionProps={topSectionProps}>
            <div className="md:mt-40 mt-[50vh] md:w-[81%] w-[95%] mx-auto min-h-screen md:py-10 px-5 md:px-0 text-gray-900 flex flex-col items-center justify-center py-6">
                <AboutSection/>
            </div>

            <DynamicElevateSection />

            <div className="md:py-10 md:w-[81%] w-[95%] mx-auto px-5 md:px-0 text-gray-900 flex flex-col items-center justify-center py-6">
                <TestimonialCard testimonials={sampleTestimonials} />
                <DenancyHelp faqs={sampleFaqs} title="Frequently Asked Questions" />
            </div>
        </WebLayout>
    );
}
