import { Team } from "@/pages/admin/teams/TeamsAdmin";

const LeadershipSection = ({members}:{members:Team[]}) => {
    return (
        <section className="py-8 pt-5 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">Meet Our Leadership</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        The visionary leaders driving Denancy Legends Group towards excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member, index) => (
                        <div key={index} className="bg-white rounded-xs shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                            {/* Image with Fallback */}
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {member.image_url ? (
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-blue-600 rounded-xs flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-semibold text-sm mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;
