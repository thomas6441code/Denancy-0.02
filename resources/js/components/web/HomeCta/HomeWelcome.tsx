import { ImageItem } from "@/pages/web/home";

const AboutSection = ({image}:{image:ImageItem}) => {
    return (
        <section className="py-20 md:mt-0 mt-[70vh]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content (60% width) */}
                    <div className="lg:pr-8 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                            At Denancy Legends Group
                        </h2>

                        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                            <p>
                                We're dedicated to revolutionizing the way clients approach the financial,
                                management and other service issues.
                            </p>

                            <p>
                                With years of experience and a passion for helping others succeed, our team
                                of experts leads in strategizing, consulting and providing professional services.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600"></div>
                                <span className="text-gray-700">Financial Services</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600"></div>
                                <span className="text-gray-700">Management</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600"></div>
                                <span className="text-gray-700">Strategic Consulting</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600"></div>
                                <span className="text-gray-700">Professional Services</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image (40% width) */}
                    <div className="relative">
                        {/* 4:3 Aspect Ratio */}
                        <div className="aspect-[4/3] bg-gray-100 border border-gray-200">
                            <img
                                src={image?.url}
                                alt="Denancy Legends Group Team"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
