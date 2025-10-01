import React from 'react'
import WebLayout from '@/layouts/web-layout';
import ServicesSection from '@/components/web/services/servicesSection';

const Index = () => {

    const topSectionProps = {
        title: "Our Services",
        description: "Discover the comprehensive range of services we offer to help your business grow.",
        images: [{
        url: '/images/services/truck-mine.png',
        title: 'Services Background'
        }],
        primaryButtonColor: "blue",
        bannerTitle: "Ready to Get Started with our services?",
        bannerDescription: "Choose from our wide range of professional services."
    };

  return (
    <WebLayout topSectionProps={topSectionProps}>

        <div className="min-h-screen md:mt-20 mt-[10vh] md:w-[81%] w-[95%] mx-auto text-gray-900 flex flex-col items-center justify-center py-6 md:px-6 px-3">
            <ServicesSection />
        </div>

    </WebLayout>
  )
}

export default Index
