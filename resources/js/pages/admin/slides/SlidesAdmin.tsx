import { useState, useEffect } from 'react';
import { Trash2, Edit, Image as ImageIcon, Loader2, Plus, X, CheckCircle2, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Slide {
    id: number;
    title: string;
    url: string;
    description: string;
}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Slides',
        href: '/admin/slides',
    },
];

const SlidesAdmin = ({ slide }: { slide: Slide[] }) => {
    const [slides, setSlides] = useState<Slide[]>(slide || []);
    const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        loading: false,
        success: false,
        error: null,
        message: '',
        fieldErrors: {}
    });

    // Reset form when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            resetForm();
        }
    }, [isModalOpen]);

    useEffect(() => {
        setSlides(slide || []);
    }, [slide]); // Added slide dependency

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionState({
            loading: true,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (url) formData.append('url', url);

        // FIX 1: Only add _method for updates, not for creates
        if (editingSlide) {
            formData.append('_method', 'PUT');
        }

        try {
            const endpoint = editingSlide
                ? `/admin/slides/${editingSlide.id}`
                : '/admin/slides';

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            // FIX 2: Use proper method based on operation
            const method = editingSlide ? 'POST' : 'POST'; // POST with _method for PUT

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                    // Don't set Content-Type for FormData - let browser set it
                },
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422 && data.errors) {
                    setSubmissionState({
                        loading: false,
                        success: false,
                        error: 'Please fix the form errors',
                        message: 'Please correct the highlighted fields',
                        fieldErrors: data.errors
                    });
                    return;
                }

                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            // FIX 3: Update slides list properly
            if (data.success && data.data) {
                if (editingSlide) {
                    setSlides(prev => prev.map(slide =>
                        slide.id === editingSlide.id ? data.data : slide
                    ));
                } else {
                    setSlides(prev => [...prev, data.data]);
                }
            }

            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: data.message || `Slide ${editingSlide ? 'updated' : 'created'} successfully!`,
                fieldErrors: {}
            });

            // Close modal after successful submission
            setTimeout(() => {
                setIsModalOpen(false);
                resetForm();
            }, 1500);

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: `Failed to ${editingSlide ? 'update' : 'create'} slide`,
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                fieldErrors: {}
            });
            console.error('Error saving slide:', error);
        }
    };

    const handleEdit = (slide: Slide) => {
        setEditingSlide(slide);
        setTitle(slide.title);
        setDescription(slide.description);
        // FIX 4: Proper URL handling for preview
        setPreview(slide.url.startsWith('http') ? slide.url : `${window.location.origin}${slide.url}`);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        setSubmissionState({
            loading: true,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        try {
            const response = await fetch(`/admin/slides/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            if (data.success) {
                setSlides(prev => prev.filter(slide => slide.id !== id));
                setSubmissionState({
                    loading: false,
                    success: true,
                    error: null,
                    message: data.message || 'Slide deleted successfully!',
                    fieldErrors: {}
                });
            }

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: 'Failed to delete slide',
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                fieldErrors: {}
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUrl(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setEditingSlide(null);
        setTitle('');
        setDescription('');
        setUrl(null);
        setPreview('');
        setSubmissionState({
            loading: false,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });
    };

    const openCreateModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Slides Management" />
            <div className="min-h-screen bg-gray-100 text-black md:px-6 p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl font-bold text-gray-900">Slides Management</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage all available slides in your system.
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Slide
                        </button>
                    </div>

                    {/* Slides List */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Current Slides</h2>

                        {slides.length === 0 ? (
                            <div className="text-center py-12">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No slides</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by creating your first slide.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={openCreateModal}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Slide
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {slides.map((slide) => (
                                    <div key={slide.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                        <div className="relative h-48 bg-gray-100">
                                            <img
                                                src={slide.url.startsWith('http') ? slide.url : `${window.location.origin}${slide.url}`}
                                                alt={slide.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{slide.title}</h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{slide.description}</p>
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(slide)}
                                                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(slide.id)}
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full hide-scrollbar max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold">
                                    {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                {/* Success/Error Messages */}
                                {(submissionState.success || submissionState.error) && (
                                    <div className={`mb-6 p-4 rounded-lg ${
                                        submissionState.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                    }`}>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                {submissionState.success ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className={`text-sm font-medium ${
                                                    submissionState.success ? 'text-green-800' : 'text-red-800'
                                                }`}>
                                                    {submissionState.success ? 'Success!' : submissionState.error}
                                                </h3>
                                                <div className={`text-sm ${
                                                    submissionState.success ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                    {submissionState.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        {/* Title Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                disabled={submissionState.loading}
                                            />
                                            {submissionState.fieldErrors?.title && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {submissionState.fieldErrors.title[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Description Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description *
                                            </label>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                disabled={submissionState.loading}
                                            />
                                            {submissionState.fieldErrors?.description && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {submissionState.fieldErrors.description[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Image Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Image {!editingSlide && '*'}
                                            </label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
                                                    preview ? 'border-gray-300' : 'border-gray-300 hover:border-gray-400'
                                                } bg-gray-50 hover:bg-gray-100`}>
                                                    {preview ? (
                                                        <img
                                                            src={preview}
                                                            alt="Preview"
                                                            className="h-full w-full object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-500">
                                                                Click to upload image
                                                            </p>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        required={!editingSlide}
                                                        disabled={submissionState.loading}
                                                    />
                                                </label>
                                            </div>
                                            {submissionState.fieldErrors?.url && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {submissionState.fieldErrors.url[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Buttons */}
                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                type="submit"
                                                disabled={submissionState.loading}
                                                className={`flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                                    submissionState.loading ? 'opacity-70 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                {submissionState.loading ? (
                                                    <>
                                                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                        {editingSlide ? 'Updating...' : 'Creating...'}
                                                    </>
                                                ) : (
                                                    editingSlide ? 'Update Slide' : 'Create Slide'
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                disabled={submissionState.loading}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default SlidesAdmin;
