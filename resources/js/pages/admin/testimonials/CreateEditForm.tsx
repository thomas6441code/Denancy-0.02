import { useForm } from '@inertiajs/react';
import { useState, useCallback, ChangeEvent } from 'react';
import { CheckCircle2, XCircle, Star, Upload, User, Briefcase, Award, MessageSquare } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
    category: string;
}

interface FormProps {
    testimonial?: Testimonial;
    errors?: Record<string, string>;
}

const TestimonialForm: React.FC<FormProps> = ({ testimonial, errors: inertiaErrors }) => {
    const [imagePreview, setImagePreview] = useState(testimonial?.image || '');

    const { data, setData, post, put, processing, errors } = useForm({
        name: testimonial?.name || '',
        image: null as File | null,
        role: testimonial?.role || '',
        content: testimonial?.content || '',
        rating: testimonial?.rating || 5,
        category: testimonial?.category || 'customer',
    });

    // Combine Inertia errors with component errors
    const allErrors = { ...errors, ...inertiaErrors };

    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('image', file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Use Inertia's built-in form submission
        if (testimonial?.id) {
            put(`/admin/testimonials/${testimonial.id}`, {
                forceFormData: true, // Important for file uploads
            });
        } else {
            post('/admin/testimonials', {
                forceFormData: true, // Important for file uploads
            });
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setData('rating', star)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`w-6 h-6 transition-colors ${
                                star <= rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 hover:text-yellow-300'
                            }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {testimonial?.id ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h1>
                <p className="text-gray-600 mt-2">
                    {testimonial?.id
                        ? 'Update the testimonial details below'
                        : 'Share what your customers are saying about your business'
                    }
                </p>
            </div>

            {/* Error Messages */}
            {Object.keys(allErrors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                            <p className="font-medium text-red-800">Please fix the following errors:</p>
                            <ul className="text-red-700 text-sm mt-1 list-disc list-inside">
                                {Object.entries(allErrors).map(([field, error]) => (
                                    <li key={field}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    {/* Image Upload Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2 text-blue-500" />
                            Profile Image
                            {!testimonial?.id && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : testimonial?.image ? (
                                        <img
                                            src={testimonial.image}
                                            alt="Current"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Upload className="w-12 h-12 text-gray-400" />
                                    )}
                                </div>
                                {(imagePreview || testimonial?.image) && (
                                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                )}
                            </div>

                            <label className="cursor-pointer">
                                <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2">
                                    <Upload className="w-4 h-4" />
                                    <span>{imagePreview || testimonial?.image ? 'Change Image' : 'Upload Image'}</span>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required={!testimonial?.id}
                                />
                            </label>
                            <p className="text-xs text-gray-500 text-center">
                                Recommended: Square image, 400x400px, max 2MB
                            </p>
                        </div>
                        {allErrors.image && (
                            <p className="mt-2 text-sm text-red-600">{allErrors.image}</p>
                        )}
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-500" />
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter customer name"
                                required
                            />
                            {allErrors.name && (
                                <p className="mt-2 text-sm text-red-600">{allErrors.name}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <Briefcase className="w-4 h-4 mr-2 text-green-500" />
                                Role/Position *
                            </label>
                            <input
                                type="text"
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="e.g., CEO, Marketing Manager"
                                required
                            />
                            {allErrors.role && (
                                <p className="mt-2 text-sm text-red-600">{allErrors.role}</p>
                            )}
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                Rating *
                            </label>
                            <div className="flex items-center space-x-4">
                                {renderStars(data.rating)}
                                <span className="text-lg font-semibold text-gray-700">{data.rating}.0</span>
                            </div>
                            {allErrors.rating && (
                                <p className="mt-2 text-sm text-red-600">{allErrors.rating}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <Award className="w-4 h-4 mr-2 text-purple-500" />
                                Category *
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            >
                                <option value="customer">Customer</option>
                                <option value="client">Client</option>
                                <option value="partner">Partner</option>
                                <option value="employee">Employee</option>
                                <option value="other">Other</option>
                            </select>
                            {allErrors.category && (
                                <p className="mt-2 text-sm text-red-600">{allErrors.category}</p>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2 text-indigo-500" />
                            Testimonial Content *
                        </label>
                        <textarea
                            id="content"
                            rows={4}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                            placeholder="Share what they said about your service or product..."
                            required
                            maxLength={500}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Brief and impactful testimonial</span>
                            <span>{data.content.length}/500 characters</span>
                        </div>
                        {allErrors.content && (
                            <p className="mt-2 text-sm text-red-600">{allErrors.content}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        disabled={processing}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                    >
                        {processing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>{testimonial?.id ? 'Updating...' : 'Creating...'}</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                <span>{testimonial?.id ? 'Update Testimonial' : 'Create Testimonial'}</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestimonialForm;
