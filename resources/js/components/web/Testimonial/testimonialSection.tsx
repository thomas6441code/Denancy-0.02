import { MessageCircleCode } from "lucide-react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  // Duplicate testimonials for infinite loop
  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="py-10 overflow-hidden md:max-w-6xl max-w-full md:px-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Client Testimonials</h2>
            <span className="h-0.5 bg-amber-400 w-60 mx-auto mb-2 block rounded-xs"></span>
            <p className="text-gray-600">What our clients say about us</p>
        </div>

        {/* Continuous Slider */}
        <div className="relative w-full md:w-[90%] mx-auto overflow-hidden">
          <div className="flex animate-scroll-slow">
            {loopTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 flex-shrink-0 p-4"
              >
                <div className="bg-gray-50 p-6 rounded-xs border border-amber-300 h-full flex flex-col justify-between">
                  {/* Quote Icon */}
                  <div className="flex justify-end h-10">
                    <MessageCircleCode className="text-7xl size-10 text-amber-200" />
                  </div>

                  {/* Content */}
                  <p className="text-gray-800 text-sm mb-4 italic line-clamp-4">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921
                          1.902 0l1.07 3.292a1 1 0
                          00.95.69h3.462c.969 0
                          1.371 1.24.588 1.81l-2.8
                          2.034a1 1 0
                          00-.364 1.118l1.07
                          3.292c.3.921-.755 1.688-1.54
                          1.118l-2.8-2.034a1 1 0
                          00-1.175 0l-2.8
                          2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                          1 0 00-.364-1.118L2.98
                          8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                          1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-gray-600 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
