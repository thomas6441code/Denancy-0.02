import React from 'react'
import WebLayout from '@/layouts/web-layout';


const Index = () => {

    const topSectionProps = {
        title: "About Us",
        description: "Learn about our mission, vision, and the team behind our success.",
        images: [{
        url: '/images/about-bg.jpg',
        title: 'About Us Background'
        }],
        primaryButtonColor: "purple",
        showBanner: false
    };

  return (
    <WebLayout topSectionProps={topSectionProps}>

       <div className="relative min-h-screen text-gray-900 flex h-20 flex-col items-center justify-center py-6 sm:py-12">
                Hello About US Page...
            </div>

    </WebLayout>
  )
}

export default Index
