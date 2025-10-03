import WebLayout from '@/layouts/web-layout';
import DenancyHelp, { Faqs } from '@/components/web/DenancyFaqs/denancyFaqs';
import TestimonialCard, { Testimonial } from '@/components/web/Testimonial/testimonialSection';
import DynamicElevateSection from '@/components/web/HomeCta/homeCta';
import AboutSection from '@/components/web/HomeCta/HomeWelcome';

export interface ImageItem {
    id: number;
    url: string;
    title?: string;
    description?: string;
}

interface HomeProps {
    images: ImageItem[];
    faqs: Faqs[];
    testimonials: Testimonial[];
}


export default function Home({ images, faqs, testimonials }: Readonly<{ HomeProps:HomeProps[]}>) {
    const topSectionProps = {
        images: images,
        showBanner: "home"
    };

    return (
        <WebLayout topSectionProps={topSectionProps}>
            <div className="md:mt-40 mt-[50vh] md:w-[81%] w-[95%] mx-auto min-h-screen md:py-10 px-5 md:px-0 text-gray-900 flex flex-col items-center justify-center py-6">
                <AboutSection/>
            </div>

            <DynamicElevateSection />

            <div className="md:py-10 md:w-[81%] w-[95%] mx-auto px-5 md:px-0 text-gray-900 flex flex-col items-center justify-center py-6">
                <TestimonialCard testimonials={testimonials} />
                <DenancyHelp faqs={faqs} title="Frequently Asked Questions" />
            </div>
        </WebLayout>
    );
}
