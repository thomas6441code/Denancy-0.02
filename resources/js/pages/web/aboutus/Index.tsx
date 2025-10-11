import React from 'react'
import WebLayout from '@/layouts/web-layout';
import LeadershipSection from '@/components/web/AboutUsComponents/leadersSection';
import IntroductionSection from '@/components/web/AboutUsComponents/heroSection';
import WhyChooseUs from '@/components/web/AboutUsComponents/whyUSSection';
import StatisticsSection from '@/components/web/AboutUsComponents/servicesSection';
import MissionVisionPhilosophy from '@/components/web/AboutUsComponents/missionVisionSection';
import { ImageItem } from '../home';
import { Stats } from '@/pages/admin/stats/StatsAdmin';
import { Team } from '@/pages/admin/teams/TeamsAdmin';
import { Service } from '@/pages/admin/services/Index';


const Index = ({images, image, stats,members}:{images:ImageItem[], image:Service, stats:Stats[], members:Team[]}) => {

    const topSectionProps = {
        images: images,
        primaryButtonColor: "blue",
        primaryButtonHoverColor: "amber",
        secondaryButtonColor: "amber",
        secondaryButtonHoverColor: "blue",
        showBanner:'about',
        bannerDescription: 'Your Trusted Partner for Innovative Solutions and Exceptional Service Delivery in Tanzania and Beyond.',
        bannerTitle: 'About Denancy Legends Group',
        phoneNumber: '+255658209911',
    };

  return (
    <WebLayout topSectionProps={topSectionProps}>

        <div className="md:w-[81%] w-[95%] px-3 mx-auto min-h-screen text-gray-900 flex flex-col items-center justify-center py-6">
            <IntroductionSection image={image} />
            <MissionVisionPhilosophy />
            <WhyChooseUs />
        </div>

          <StatisticsSection stats={stats} />

        <div className="md:w-[81%] w-[95%] mx-auto min-h-screen text-gray-900 flex flex-col items-center justify-center">
            <LeadershipSection members={members} />
        </div>

        {/* Bottom CTA */}
        <div className="text-center my-8 mt-5">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 py-12 shadow-lg">
                <h3 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    Join our growing list of satisfied clients who have transformed their challenges into
                    opportunities with our expert guidance and support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => window.location.href = "/contactus"} className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 transition-all duration-300 rounded-xs hover:scale-105">
                        Get Started Today
                    </button>
                </div>
            </div>
            <div className="h-2 bg-amber-400"></div>
        </div>

    </WebLayout>
  )
}

export default Index
