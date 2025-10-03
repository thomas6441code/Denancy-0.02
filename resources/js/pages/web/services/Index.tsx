import React from 'react'
import WebLayout from '@/layouts/web-layout';
import ServicesSection from '@/components/web/services/servicesSection';
import { TopSectionProps } from '@/components/web/shared/topSection';
import { Service } from '@/pages/admin/services/Index';
import { ImageItem } from '../home';

const Index = ({services, images}:{services:Service[],images:ImageItem[]}) => {

    const topSectionProps:TopSectionProps = {
        images: images,
        primaryButtonColor: "blue",
        bannerTitle: "Ready to Get Started with our services?",
        bannerDescription: "Choose from our wide range of professional services."
    };

  return (
    <WebLayout topSectionProps={topSectionProps}>

        <div className="min-h-screen md:mt-20 mt-[10vh] md:w-[81%] w-[95%] mx-auto text-gray-900 flex flex-col items-center justify-center py-6 md:px-6 px-3">
            <ServicesSection services={services} />
        </div>

    </WebLayout>
  )
}

export default Index
