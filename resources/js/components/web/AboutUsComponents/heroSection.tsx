const IntroductionSection = () => {
    return (
        <section className="md:py-16 md:pt-0 pt-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
                            About <span className="text-blue-600">Us</span>
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                    </div>

                    <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-sm">
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p className="text-lg">
                                Welcome to <strong className="text-blue-600">Denancy Legends Group</strong>, a multifaceted service provider committed to
                                excellence across diverse industries. Since our inception, we have been dedicated to
                                delivering innovative, reliable, and customer-focused solutions tailored to meet the
                                unique needs of our clients.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 aspect-video flex items-center justify-center">
                    {/* 4:3 Aspect Ratio */}
                    <div className="aspect-[4/3] bg-gray-100 border border-gray-200">
                        <img
                            src="/images/slides/home.jpg"
                            alt="Denancy Legends Group Team"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;
