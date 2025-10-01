import { Link } from "@inertiajs/react";
import { Phone, Mail, Globe, Clock, Shield, FileText, ChevronRight, Building, HardHat, BarChart3, Users, Truck, ArrowRight} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative">
        {/* Footer Content with Crystal Background */}
        <div className="relative rounded-t-xs bg-gradient-to-br from-slate-900 via-blue-800 to-slate-800 text-white overflow-hidden px-2 md:px-0">
            {/* Crystal Background Pattern */}
            <div className="absolute inset-0">
                {/* Animated Crystal Orbs */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

                {/* Crystal Shard Patterns */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="crystalShards" width="100" height="100" patternUnits="userSpaceOnUse">
                        {/* Crystal Shard 1 */}
                        <path d="M20 20L40 10L60 20L50 40L30 50L20 30Z" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                        {/* Crystal Shard 2 */}
                        <path d="M80 30L90 15L95 35L85 45L75 40Z" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
                        {/* Crystal Shard 3 */}
                        <path d="M10 70L25 60L35 75L20 85L5 80Z" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
                        {/* Crystal Shard 4 */}
                        <path d="M70 80L85 65L95 85L80 95L65 90Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#crystalShards)" />
                    </svg>
                </div>

                {/* Geometric Crystal Grid */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="crystalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M30 0L45 15L30 30L15 15L30 0Z" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                        <path d="M0 30L15 45L30 30L15 15L0 30Z" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                        <path d="M30 60L45 45L30 30L15 45L30 60Z" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                        <path d="M60 30L45 15L30 30L45 45L60 30Z" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                        {/* Small inner crystals */}
                        <path d="M30 15L35 20L30 25L25 20Z" fill="none" stroke="currentColor" strokeWidth="0.2"/>
                        <path d="M15 30L20 35L25 30L20 25Z" fill="none" stroke="currentColor" strokeWidth="0.2"/>
                        <path d="M45 30L40 35L35 30L40 25Z" fill="none" stroke="currentColor" strokeWidth="0.2"/>
                        <path d="M30 45L25 40L30 35L35 40Z" fill="none" stroke="currentColor" strokeWidth="0.2"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#crystalGrid)" />
                    </svg>
                </div>

                {/* Floating Crystal Particles */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-cyan-400/30 rounded-full blur-sm animate-bounce"></div>
                    <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-blue-400/40 rounded-full blur-sm animate-bounce delay-300"></div>
                    <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-indigo-400/20 rounded-full blur-sm animate-bounce delay-700"></div>
                    <div className="absolute top-2/3 left-1/10 w-3 h-3 bg-cyan-300/25 rounded-full blur-sm animate-bounce delay-1000"></div>
                    <div className="absolute top-1/5 left-4/5 w-2 h-2 bg-blue-300/35 rounded-full blur-sm animate-bounce delay-500"></div>
                </div>
            </div>

            {/* Main Content with Responsive Padding */}
            <div className="relative max-w-7xl mx-auto px-[4%] md:px-[8%] pt-20">

                {/* Top Section */}
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 mb-6">
                    {/* Company Info - 4 columns */}
                    <div className="lg:col-span-5">
                        <div className="md:flex-row inline-block flex-col items-center justify-center mb-6 w-full">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                                <Building className="w-7 h-7 text-slate-900 font-bold" />
                            </div>

                            <div className="inline-block">
                                <h2 className="text-2xl inline-block font-bold text-white mb-1">Denancy Legends</h2>
                                <p className="text-amber-400 font-medium text-base">Group of Companies</p>
                            </div>
                        <div>
                    </div>
                </div>

                <p className="text-gray-200 leading-relaxed text-base mb-6 max-w-lg">
                    Delivering innovative solutions in mining support, financial consultancy,
                    strategic management, and logistics with excellence and reliability.
                </p>

                {/* Social Links */}
                <div className="flex space-x-3 mb-8">

                    {/* Facebook - Modern */}
                    <div className="w-8 h-8 bg-amber-400 rounded-xs flex items-center justify-center hover:bg-amber-400 transition-all duration-300 cursor-pointer group hover:scale-110 hover:rotate-12">
                        <svg className="w-5 h-5 text-gray-900 group-hover:text-slate-900 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                        </svg>
                    </div>

                    {/* LinkedIn - Modern */}
                    <div className="w-8 h-8 bg-amber-400 rounded-xs flex items-center justify-center hover:bg-amber-400 transition-all duration-300 cursor-pointer group hover:scale-110 hover:-rotate-12">
                        <svg className="w-5 h-5 text-gray-900 group-hover:text-slate-900 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                        <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx={4} cy={4} r={2}/>
                        </svg>
                    </div>

                    {/* Instagram - Modern */}
                    <div className="w-8 h-8 bg-amber-400 rounded-xs flex items-center justify-center hover:bg-amber-400 transition-all duration-300 cursor-pointer group hover:scale-110 hover:-rotate-12">
                        <svg className="w-5 h-5 text-gray-900 group-hover:text-slate-900 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x={2} y={2} width={20} height={20} rx={5} ry={5}/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                        <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1={17.5} y1={6.5} x2={17.51} y2={6.5}/>
                        </svg>
                    </div>

                    {/* WhatsApp - New Icon */}
                    <div className="w-8 h-8 bg-amber-400 rounded-xs flex items-center justify-center hover:bg-amber-400 transition-all duration-300 cursor-pointer group hover:scale-110 hover:-rotate-12">
                        <svg className="w-5 h-5 text-gray-900 group-hover:text-slate-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.17-3.495-8.416"/>
                        </svg>
                    </div>

                </div>

            </div>


                    {/* Quick Links - 2 columns */}
                    <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-6 text-amber-400 flex items-center">
                        <ChevronRight className="w-5 h-5 mr-2" />
                        Quick Links
                    </h3>
                    <div className="space-y-3 text-base">
                        <Link href="/" className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors group">
                        <ArrowRight className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform" />
                        Home
                        </Link>
                        <Link href="/aboutus" className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors group">
                        <ArrowRight className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform" />
                        About Us
                        </Link>
                        <Link href="/services" className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors group">
                        <ArrowRight className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform" />
                        Services
                        </Link>
                        <Link href="/contactus" className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors group">
                        <ArrowRight className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform" />
                        Contact Us
                        </Link>
                    </div>
                    </div>

                    {/* Services - 3 columns */}
                    <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-6 text-amber-400 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Services
                    </h3>
                    <div className="space-y-3 text-base">
                        <div className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors cursor-pointer group">
                        <HardHat className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                        Mining
                        </div>
                        <div className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors cursor-pointer group">
                        <BarChart3 className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                        Finance
                        </div>
                        <div className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors cursor-pointer group">
                        <Users className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                        Management
                        </div>
                        <div className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors cursor-pointer group">
                        <Truck className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                        Logistics
                        </div>
                    </div>
                    </div>

                    {/* Contact Info - 3 columns */}
                    <div className="lg:col-span-3">
                    <h3 className="text-lg font-semibold mb-6 text-amber-400 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Contact
                    </h3>
                    <div className="space-y-4 text-base">
                        <div className="flex items-start group">
                        <Phone className="w-4 h-4 text-amber-400 mt-1 mr-3" />
                        <div>
                            <p className="text-white font-medium">+255 658 209 911</p>
                            <p className="text-cyan-200 text-sm">Mon-Fri, 8AM-6PM</p>
                        </div>
                        </div>
                        <div className="flex items-start group">
                        <Mail className="w-4 h-4 text-amber-400 mt-1 mr-3" />
                        <div>
                            <p className="text-white font-medium">info@denancy.co.tz</p>
                            <p className="text-cyan-200 text-sm">Quick response</p>
                        </div>
                        </div>
                        <div className="flex items-start group">
                        <Globe className="w-4 h-4 text-amber-400 mt-1 mr-3" />
                        <div>
                            <p className="text-white font-medium">www.denancy.co.tz</p>
                            <p className="text-cyan-200 text-sm">Our website</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-500/90 my-3"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between py-4 mb-5 items-center">
                    <div className="flex items-center text-gray-300 mb-4 md:mb-0">
                        <Clock className="w-4 h-4 mr-2 text-amber-400" />
                        <span className="text-sm">
                            © {new Date().getFullYear()} Denancy Legends Group. All rights reserved.
                        </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                    <Link href="/privacy" className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors">
                        <Shield className="w-4 h-4 mr-1" />
                        Privacy
                    </Link>
                    <Link href="/terms" className="flex items-center text-cyan-200 hover:text-amber-400 transition-colors">
                        <FileText className="w-4 h-4 mr-1" />
                        Terms
                    </Link>
                    </div>
                </div>

            </div>
        </div>
    </footer>
  );
}
