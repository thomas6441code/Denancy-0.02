// resources/js/Components/Navbar.tsx
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Phone, MapPin, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full overflow-x-hidden bg-amber-400 fixed top-0 left-0 z-50">
      {/* Top bar with parallelogram - Hidden on mobile */}
      <div className="hidden lg:flex justify-center text-sm text-gray-700 relative">
        <div className="bg-gray-200 w-11/12 max-w-7xl py-3 pt-2 px-6 transform -skew-x-12 flex items-center justify-between border-b border-gray-200">
          {/* Inner content un-skewed */}
          <div className="flex w-full items-center justify-between transform skew-x-12">
            {/* Left links */}
            <div className="flex space-x-6 text-blue-900 font-semibold">
              <Link href="/contactus" className="flex items-center hover:text-blue-700 transition-colors group">
                <MapPin className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="whitespace-nowrap">Locate Denancy</span>
              </Link>
              <Link href="/contactus" className="flex items-center hover:text-blue-700 transition-colors group">
                <Mail className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="whitespace-nowrap">Contact Us</span>
              </Link>
              <div className="flex items-center hover:text-blue-700  whitespace-nowrap">
                <Phone className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                +255 658 209 911
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4 font-semibold">
              <div className="relative">
              </div>
              <button className="border text-blue-900 px-4 py-1.5 rounded-xs font-semibold hover:border-amber-400 transition-all duration-300 whitespace-nowrap text-sm transform hover:scale-105">
                Need Of Consolation ?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-gray-200 text-sm text-gray-700 py-2 px-4 w-full">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 px-2">
            <Link href="tel:+255 658 209 911" className="flex items-center text-blue-900 font-semibold text-xs sm:text-sm transition-colors duration-300">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="whitespace-nowrap">+255 658 209 911</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border text-blue-900 px-4 py-1.5 rounded-xs font-semibold hover:border-amber-400 transition-all duration-300 whitespace-nowrap text-xs transform hover:scale-105">
              Get Consolation
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Wrapper */}
      <div className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-sm' : ''}`}>
        {/* Main navbar with parallelogram */}
        <nav className="flex justify-center mt-[-4px] lg:mt-[-8px] w-full">
          <div className={`
            bg-gradient-to-r from-blue-900 to-blue-800 text-white
            w-full lg:w-4/5 max-w-7xl py-5 lg:py-4 px-4 lg:px-8
            transform -skew-x-12
            flex items-center justify-between
            border-t-2 lg:border-t-4 border-yellow-400
            mx-2 lg:mx-0
            transition-all duration-500
            ${isScrolled ? 'py-2 lg:py-3 shadow-xl' : 'py-3 lg:py-4'}
          `}>
            {/* Inner content un-skewed */}
            <div className="flex w-full items-center justify-between transform skew-x-12">
              {/* Logo */}
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-400 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg transition-all duration-500 hover:rotate-45">
                  <span className="text-blue-900 font-bold text-sm lg:text-lg transition-all duration-300">DL</span>
                </div>
                <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-yellow-400 whitespace-nowrap transition-all duration-300">
                  Denancy Legends
                </h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex space-x-6 lg:space-x-8 font-medium text-sm lg:text-md">
                <Link
                  href="/"
                  className="hover:text-yellow-400 transition-all duration-300 relative group whitespace-nowrap"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500 ease-out"></span>
                </Link>
                <Link
                  href="/aboutus"
                  className="hover:text-yellow-400 transition-all duration-300 relative group whitespace-nowrap"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500 ease-out"></span>
                </Link>
                <Link
                  href="/services"
                  className="hover:text-yellow-400 transition-all duration-300 relative group whitespace-nowrap"
                >
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500 ease-out"></span>
                </Link>
                <Link
                  href="/contactus"
                  className="hover:text-yellow-400 transition-all duration-300 relative group whitespace-nowrap"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500 ease-out"></span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-yellow-400 hover:text-yellow-300 transition-all duration-500 p-1 transform hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-8 h-8 transform transition-all duration-500 rotate-90 scale-110" />
                ) : (
                  <Menu className="w-8 h-8 transform transition-all duration-500" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu with Smooth Animation - Full Screen */}
        <div className={`
            lg:hidden fixed inset-0 top-0 left-0 w-full h-full max-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white
            overflow-y-auto transform-gpu z-50
            transition-all duration-700 ease-in-out
            ${isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-full pointer-events-none'
            }
            `}>
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-60">
                <button
                className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                <X className="w-8 h-8 text-yellow-400" />
                </button>
            </div>

            {/* Menu Content */}
            <div className="min-h-screen flex flex-col justify-center px-6 py-8">
                {/* Logo Section */}
                <div className={`
                    transform transition-all duration-700 ease-out
                    ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                    `}
                    style={{ transitionDelay: '100ms' }}
                >
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-600/30 shadow-lg">
                            {/* Replace with your actual logo */}
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">DLG</div>
                                <div className="text-xs text-gray-300 mt-1">Denancy Legends</div>
                            </div>
                            {/* Alternative: If you have an image logo */}
                            {/* <img
                                src="/logo.png"
                                alt="Denancy Legends Group"
                                className="w-16 h-16 object-contain"
                            /> */}
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-4 mb-8">
                    {["Home", "About Us", "Services", "Contact Us"].map((item, i) => (
                        <div
                        key={i}
                        className={`
                            transform transition-all duration-700 ease-out
                            ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}
                        `}
                        style={{ transitionDelay: `${i * 150 + 300}ms` }}
                        >
                        <Link
                            href={`/${item.toLowerCase().replace(" ", "")}`}
                            className="
                            block py-3 px-4
                            bg-blue-800/30 hover:bg-blue-700/50
                            transition-all duration-500
                            text-lg font-semibold
                            border-l-3 border-yellow-400
                            hover:border-yellow-300
                            hover:translate-x-4 hover:shadow-2xl
                            rounded-r-xl
                            group
                            backdrop-blur-sm
                            "
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="flex items-center text-white group-hover:text-yellow-300 transition-colors duration-300">
                            {item}
                            </span>
                        </Link>
                        </div>
                    ))}
                </div>

                {/* Social Links Section */}
                <div className={`
                    transform transition-all duration-700 ease-out
                    ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                    `}
                    style={{ transitionDelay: '900ms' }}
                    >
                    <h3 className="text-lg font-semibold text-yellow-400 mb-6 text-center">
                        Follow Us
                    </h3>

                    <div className="flex justify-center space-x-4 mb-6">
                        {/* Facebook */}
                        <div className="w-8 h-8 bg-blue-800/50 rounded-xl flex items-center justify-center hover:bg-amber-400 transition-all duration-500 cursor-pointer group hover:scale-110 hover:rotate-12 backdrop-blur-sm">
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-slate-900 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                        </svg>
                        </div>

                        {/* LinkedIn */}
                        <div className="w-8 h-8 bg-blue-800/50 rounded-xl flex items-center justify-center hover:bg-amber-400 transition-all duration-500 cursor-pointer group hover:scale-110 hover:-rotate-12 backdrop-blur-sm">
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-slate-900 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                            <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx={4} cy={4} r={2}/>
                        </svg>
                        </div>

                        {/* Instagram */}
                        <div className="w-8 h-8 bg-blue-800/50 rounded-xl flex items-center justify-center hover:bg-amber-400 transition-all duration-500 cursor-pointer group hover:scale-110 hover:rotate-12 backdrop-blur-sm">
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-slate-900 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x={2} y={2} width={20} height={20} rx={5} ry={5}/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                            <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1={17.5} y1={6.5} x2={17.51} y2={6.5}/>
                        </svg>
                        </div>

                        {/* WhatsApp */}
                        <div className="w-8 h-8 bg-blue-800/50 rounded-xl flex items-center justify-center hover:bg-amber-400 transition-all duration-500 cursor-pointer group hover:scale-110 hover:-rotate-12 backdrop-blur-sm">
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-slate-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.17-3.495-8.416"/>
                        </svg>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className={`
                    transform transition-all duration-700 ease-out
                    ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                    `}
                    style={{ transitionDelay: '1100ms' }}
                    >
                    <div className="text-center space-y-3">
                        <div className="flex items-center justify-center text-yellow-400">
                        <Phone className="w-5 h-5 mr-2" />
                        <span className="text-lg font-semibold">+255 658 209 911</span>
                        </div>
                        <div className="text-gray-300 text-sm">
                        <p>Mon-Fri, 8AM-6PM</p>
                        <p className="mt-1">info@denancy.co.tz</p>
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom */}
                <div className={`
                    mt-12 pt-8 border-t border-blue-700/50
                    transform transition-all duration-700 ease-out
                    ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                    `}
                    style={{ transitionDelay: '1300ms' }}
                    >
                    <p className="text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} Denancy Legends Group
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Decorative bottom border - Hidden on mobile */}
      <div className="flex justify-center">
        <div className="w-4/5 max-w-7xl h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform -skew-x-12 transition-all duration-500"></div>
      </div>
    </header>
  );
}
