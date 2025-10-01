import { Target, Eye, Heart, Shield, Zap, Star, Users } from 'lucide-react';

const MissionVisionPhilosophy = () => {
    return (
        <section className="py-12 pt-5">
            <div className="max-w-7xl mx-auto">
                {/* Mission & Vision & Philosophy in 3-column grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mission */}
                    <div className="bg-blue-50 p-4 rounded-xs border border-blue-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-xs">
                                <Target className="w-4 h-4" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Providing innovative, reliable, and customer-centric solutions
                            across mining support, financial consultancy, management strategies, and
                            car hire and logistics management. We are dedicated to empowering our
                            clients by delivering exceptional services that drive growth, efficiency, and
                            success while upholding the highest standards of professionalism, integrity,
                            and sustainability.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-amber-50 p-4 rounded-xs border border-amber-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-amber-500 text-white flex items-center justify-center rounded-xs">
                                <Eye className="w-4 h-4" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            To be a trusted leader in delivering diverse, high-quality
                            services that create lasting value for our clients and communities. We aim to
                            set benchmarks of excellence across industries, fostering innovation,
                            building enduring partnerships, and contributing to a sustainable and
                            prosperous future.
                        </p>
                    </div>

                    {/* Philosophy */}
                    <div className="bg-gray-50 p-4 rounded-xs border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-gray-600 text-white flex items-center justify-center rounded-xs">
                                <Heart className="w-4 h-4" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Our Philosophy</h3>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                            Rooted in trust, innovation, and excellence. We are committed to
                            understanding our clients' unique needs, delivering high-quality, tailored solutions, and
                            fostering long-term relationships built on integrity.
                        </p>

                        {/* Philosophy Pillars */}
                        <div className="space-y-3 grid-cols-2 grid">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xs">
                                    <Shield className="w-3 h-3" />
                                </div>
                                <span className="text-xs text-gray-700">Trust & Integrity</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-green-100 text-green-600 flex items-center justify-center rounded-xs">
                                    <Zap className="w-3 h-3" />
                                </div>
                                <span className="text-xs text-gray-700">Innovation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-amber-100 text-amber-600 flex items-center justify-center rounded-xs">
                                    <Star className="w-3 h-3" />
                                </div>
                                <span className="text-xs text-gray-700">Excellence</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-purple-100 text-purple-600 flex items-center justify-center rounded-xs">
                                    <Users className="w-3 h-3" />
                                </div>
                                <span className="text-xs text-gray-700">Collaboration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionPhilosophy;
