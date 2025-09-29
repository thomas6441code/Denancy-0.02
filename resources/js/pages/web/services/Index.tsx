import React from 'react'
import WebLayout from '@/layouts/web-layout';

const Index = () => {

    const topSectionProps = {
        title: "Our Services",
        description: "Discover the comprehensive range of services we offer to help your business grow.",
        images: [{
        url: '/images/services-bg.jpg',
        title: 'Services Background'
        }],
        primaryButtonColor: "green",
        bannerTitle: "Ready to Get Started?",
        bannerDescription: "Choose from our wide range of professional services"
    };

  return (
    <WebLayout topSectionProps={topSectionProps}>

        <div className="relative min-h-screen text-gray-900 flex h-20 flex-col items-center justify-center py-6 sm:py-12">
            Hello Services Page...
        </div>

    </WebLayout>
  )
}

export default Index
