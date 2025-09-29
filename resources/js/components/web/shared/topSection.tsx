import { ArrowRight, PhoneCall } from 'lucide-react';

interface ImageItem {
  url: string;
  title?: string;
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
  showBanner?: boolean;
  phoneNumber?: string;
}

const TopSection = ({
  title = "Contact Us",
  description = "Connect with Denancy Legends Group - Your trusted partner for innovative solutions and exceptional service delivery in Tanzania and beyond.",
  images = [{
    url: 'https://www.skyportcargo.co.tz/images/slides/1750352432_2149853158.jpg',
    title: 'Contact Background'
  }],
  primaryButtonColor = "blue",
  primaryButtonHoverColor = "blue-700",
  secondaryButtonColor = "green",
  secondaryButtonHoverColor = "green-700",
  bannerTitle = "Ready to Start Your Project? Let's Talk Today!",
  bannerDescription = "Get in touch with our expert team for personalized solutions",
  showBanner = true,
  phoneNumber = "+255658209911"
}: TopSectionProps) => {

  // Get the first image for background (you can extend this for multiple images/carousel)
  const backgroundImage = images[0]?.url || '';

  return (
    <div className="relative h-[60vh] md:min-h-[600px] max-h-[650px] pt-24">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full">
          <div
            className="w-full h-full bg-cover object-cover inset-0 absolute bg-center"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              filter: 'brightness(0.7)'
            }}
            aria-label={images[0]?.title || 'Background image'}
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-center">
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-4xl pt-5 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100">
                {title}
              </span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              {description}
            </p>
            <div id='contact-form' className="flex flex-col mt-6 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-md">
              <a
                href="#contact-form"
                className={`bg-${primaryButtonColor}-600 hover:bg-${primaryButtonHoverColor} px-6 py-3 rounded-xs font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                Send Message <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className={`bg-${secondaryButtonColor}-600 hover:bg-${secondaryButtonHoverColor} px-6 py-3 rounded-xs font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                Call Now <PhoneCall className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      {showBanner && (
        <div className="absolute hidden md:flex shadow-lg bg-white bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-4xl px-6 z-30 border border-gray-200">
          <div className="w-full py-5">
            <h2 className="text-xl text-gray-800 text-center font-bold">
              {bannerTitle}
            </h2>
            <p className="text-gray-600 text-center text-sm mt-1">
              {bannerDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSection;
