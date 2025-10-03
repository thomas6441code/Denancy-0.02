import { Factory, BarChart3, Wallet, PackageSearch } from 'lucide-react';

const ServicesBanner = () => {
  const services = [
    {
      title: "MINING SUPPORT & SERVICES",
      description: "We acquire a growing competitive target to the hiring industry. From operation assistance to online logistics coordinator, our team remains sensitive in an industry, and effectively, contributing to the success of your projects.",
      icon: Factory,
    },
    {
      title: "MANAGEMENT STRATEGIES",
      description: "We help organizations optimize their priorities through strategic planning, process improvement, and leadership development. Our tailored solutions enable businesses to adapt to existing markets and drive sustainable growth.",
      icon: BarChart3,
    },
    {
      title: "FINANCIAL CONSULTANCY",
      description: "With recent financial claims, we offer guidance on investment strategies, risk management, and financial planning. Our goal is to empower businesses and individuals with the focus and knowledge to achieve their financial objectives.",
      icon: Wallet,
    },
    {
      title: "LOGISTIC MANAGEMENT",
      description: "Whether you need reliable transportation solutions, or who do not logistical management, we are invited to support us to keep your time from. Our third important, well-maintained, and successful by a team of logistics professionals.",
      icon: PackageSearch,
    }
  ];

  // Dynamic color generation based on index
  const getColorClasses = (index: number) => {
    const colors = [
      { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600' },
      { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600' },
      { bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600' },
      { bg: 'from-purple-500 to-purple-600', text: 'text-purple-600' },
      { bg: 'from-blue-500 to-blue-600', text: 'text-purple-600' },
      { bg: 'from-emerald-500 to-emerald-600', text: 'text-orange-600' },
      { bg: 'from-purple-500 to-purple-600', text: 'text-emerald-600' }
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="py-16 md:px-6 w-full">
      <div className="container mx-auto max-w-6xl">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colorClasses = getColorClasses(index);

            return (
              <div
                key={index}
                className="group bg-white p-6 border border-gray-200 rounded-xs shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-gray-300"
              >
                {/* Icon + Title inline */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex items-center justify-center w-14 h-14 bg-gradient-to-r ${colorClasses.bg} rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className={`text-base font-bold leading-snug flex-1 ${colorClasses.text}`}>
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm font-normal leading-relaxed border-t border-gray-100 pt-4 group-hover:border-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;
