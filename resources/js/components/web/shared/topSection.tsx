import { useState, useEffect } from 'react';
import { ArchiveIcon, PhoneIncoming } from 'lucide-react';
import ServicesBanner from '../servicesBanner';

interface ImageItem {
    url: string;
    title?: string;
    description?: string;
}

export interface TopSectionProps {
  title?: string;
  description?: string;
  images?: ImageItem[];
  primaryButtonColor?: string;
  primaryButtonHoverColor?: string;
  secondaryButtonColor?: string;
  secondaryButtonHoverColor?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  showBanner?: string;
  phoneNumber?: string;
}

const TopSection = ({
  title,
  description,
  images = [
    {
      url: 'https://www.skyportcargo.co.tz/images/slides/1750352432_2149853158.jpg',
      title: 'Contact Background',
    },
  ],
  primaryButtonColor = 'blue',
  primaryButtonHoverColor = 'amber',
  secondaryButtonColor = 'amber',
  secondaryButtonHoverColor = 'blue',
  bannerTitle,
  bannerDescription,
  showBanner,
  phoneNumber = '+255658209911',
}: TopSectionProps) => {
  // State for slideshow
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle slideshow if more than 1 image
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [images]);

  const backgroundImage = images[currentIndex]?.url || '';

  return (
    <div className="relative h-[50vh] md:min-h-[610px] max-h-[650px] pt-24">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full">
          <div
            className="w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              filter: 'brightness(0.7)',
            }}
            aria-label={images[currentIndex]?.title || 'Background image'}
          />
          {/* Animated Dots */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 flex items-center">
        <div className="container mt-5 mx-auto px-4 text-white">
            <div className="relative overflow-hidden">
                {/* Title with slide animation */}
                <div key={`title-${currentIndex}`} className="overflow-hidden">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug max-w-4xl ml-0 md:ml-10 text-left
                                text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]
                                animate-in slide-in-from-left-full duration-1000 ease-out">
                        {images[currentIndex]?.title || 'Background image'}
                    </h1>
                </div>

                {/* Description with staggered slide animation */}
                <div key={`description-${currentIndex}`} className="overflow-hidden">
                    <p className="mt-4 text-sm md:text-lg max-w-3xl ml-0 md:ml-10 text-left
                                text-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)] leading-relaxed
                                animate-in slide-in-from-left-full duration-900 ease-out delay-400">
                        {images[currentIndex]?.description || 'Background image description'}
                    </p>
                </div>
            </div>
            <div className="md:max-w-4xl hidden md:flex pt-5 relative z-10 ml-0 md:ml-10 md:text-left">
                {showBanner != 'home' && showBanner != 'contact' && (
                <div
                    id="contact-form"
                    className="flex flex-col mt-6 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-md"
                >
                    <a
                    href="#contact-form"
                    className={`bg-${primaryButtonColor}-600 hover:bg-${primaryButtonHoverColor} md:px-6 px-4 py-2 md:py-3 rounded-xs font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-sm`}
                    >
                    Send Message <ArchiveIcon className="ml-2 h-5 w-5" />
                    </a>
                    <a
                    href={`tel:${phoneNumber}`}
                    className={`outline-2 outline-${secondaryButtonColor}-400 md:px-6 px-4 py-2 md:py-3 rounded-xs font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-sm`}
                    >
                    Call Now <PhoneIncoming className={`ml-2 p-1  rounded-xs text-white bg-${secondaryButtonColor}-400 h-5 w-5`} />
                    </a>
                </div>
                )}
            </div>
        </div>
        </div>

        {showBanner != 'about' && (
            showBanner == 'home' ? (
                <div className="absolute flex bottom-0 left-1/2 transform -translate-x-1/2 md:translate-y-2/3 translate-y-11/12 w-full px-8 z-30">
                    <ServicesBanner />
                </div>
            ) : (
                <div className="absolute md:flex shadow-md bg-white bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2/3 md:w-full md:max-w-4xl w-[90%] px-6 py-4 z-30 border border-gray-200">
                    <div className="w-full py-5">
                        <h2 className="md:text-3xl text-xl text-blue-800 text-center font-bold">
                            {bannerTitle}
                        </h2>
                        <p className="text-gray-600 text-center md:text-lg max-w-[90%] mx-auto text-sm mt-1">
                            {bannerDescription}
                        </p>
                    </div>
                </div>
            )
        )}

    </div>
  );
};

export default TopSection;
