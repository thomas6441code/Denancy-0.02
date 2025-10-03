import { useForm } from '@inertiajs/react';
import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { XCircle, CheckCircle2, Upload, Plus, Trash2 } from 'lucide-react';
import IconComponent from '@/components/web/shared/IconComponent';

interface ServiceFormProps {
    service?: {
        id?: number;
        title: string;
        image: string;
        icon: string;
        description: string;
        long_description: string;
        features: string[];
    };
    errors?: Record<string, string>;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, errors }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(service?.image || '');

    const { data, setData, post, put, processing, recentlySuccessful } = useForm({
        title: service?.title || '',
        image: service?.image || null,
        icon: service?.icon || '',
        description: service?.description || '',
        long_description: service?.long_description || '',
        features: service?.features || [''],
    });

    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setData('image', file);

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (service?.id) {
            post(`/admin/services/${service.id}`, {
                data: { ...data, _method: 'PUT' },
                forceFormData: true,
                preserveScroll: true,

            });
        } else {
            post('/admin/services', {
                data,
                forceFormData: true,
                preserveScroll: true,
            });
        }

    };

    const handleArrayChange = (index: number, value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...data.features];
        newFeatures.splice(index, 1);
        setData('features', newFeatures.length > 0 ? newFeatures : ['']);
    };

    // Set image preview when service has an image
    useEffect(() => {
        if (service?.image && !imagePreview) {
            setImagePreview(service.image);
        }
    }, [service?.image, imagePreview]);

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {service?.id ? 'Edit Service' : 'Create New Service'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Fill in the service details below. All fields marked with * are required.
                    </p>
                </div>

                {/* Basic Information Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Service Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter service title"
                            />
                            {errors?.title && (
                                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        {/* Icon Selection */}
                        <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                                Icon *
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter icon name or code"
                                />
                                {data.icon && (
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <IconComponent icon={data.icon} className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                            {errors?.icon && (
                                <p className="mt-2 text-sm text-red-600">{errors.icon}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Image Upload Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Service Image</h3>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Image Preview */}
                        <div className="flex-shrink-0">
                            <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Service preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">No image selected</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upload Controls */}
                        <div className="flex-1">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image {!service?.id && '*'}
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Recommended: 800x600px or larger. Supported formats: JPG, PNG, WebP
                                {service?.image && " - Leave empty to keep current image"}
                            </p>
                            {errors?.image && (
                                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Descriptions Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Service Descriptions</h3>

                    <div className="space-y-6">
                        {/* Short Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Short Description *
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Brief description of the service (displayed in listings)"
                            />
                            {errors?.description && (
                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Detailed Description */}
                        <div>
                            <label htmlFor="long_description" className="block text-sm font-medium text-gray-700 mb-2">
                                Detailed Description *
                            </label>
                            <textarea
                                id="long_description"
                                rows={5}
                                value={data.long_description}
                                onChange={(e) => setData('long_description', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Comprehensive description of the service (displayed on service detail page)"
                            />
                            {errors?.long_description && (
                                <p className="mt-2 text-sm text-red-600">{errors.long_description}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Service Features</h3>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add Feature
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleArrayChange(index, e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                </div>
                                {data.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove feature"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors?.features && (
                        <p className="mt-3 text-sm text-red-600">{errors.features}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex-1">
                        {/* Success Message */}
                        {recentlySuccessful && (
                            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-medium text-green-800">Success!</h3>
                                    <p className="text-sm text-green-700">
                                        Service {service?.id ? 'updated' : 'created'} successfully!
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {errors && Object.keys(errors).length > 0 && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-medium text-red-800">
                                        Please fix the form errors
                                    </h3>
                                    <p className="text-sm text-red-700">
                                        Check the highlighted fields below
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {service?.id ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                service?.id ? 'Update Service' : 'Create Service'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;
