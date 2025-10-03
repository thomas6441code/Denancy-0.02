import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon, BookOpenCheck, EyeIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Button } from '@headlessui/react';
import ServiceDetailModal from './ServiceDetailsModel';
import IconComponent from '@/components/web/shared/IconComponent';

export interface Service {
    id?: number;
    title: string;
    image: string;
    icon: string;
    description: string;
    long_description: string;
    features: string[];
};

interface Props {
    services: Service[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: '/admin/services',
    },
];

export default function ServicesIndex({ services }: Readonly<Props>) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { flash } = usePage().props as { flash?: { success?: string } };

    const openModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />

            <div className="md:px-6 px-4 py-8">
                {/* Header with actions */}
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage all available services in your system
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href='/admin/services/create'
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Service
                        </Link>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {/* Services Grid */}
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group"
                            >
                                {/* Service Image */}
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                    {/* Action buttons overlay */}
                                    <div className="absolute top-3 right-3 flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link
                                            href={`/admin/services/edit/${service.id}`}
                                            className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-sm transition-colors"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>
                                        <Button
                                            onClick={() => openModal(service)}
                                            className="p-2 bg-white/90 hover:bg-white text-orange-600 rounded-lg shadow-sm transition-colors"
                                            title="View Details"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                        <Link
                                            method="delete"
                                            href={`/admin/services/destroy/${service.id}`}
                                            as="button"
                                            className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-lg shadow-sm transition-colors"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Service Content */}
                                <div className="p-5">
                                    {/* Title and Icon */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0">
                                             <IconComponent icon={service.icon || '⚡'} className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Features Preview */}
                                    {service.features && service.features.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Key Features
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {service.features.slice(0, 3).map((feature, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <span className="inline-block px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                                                        +{service.features.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <Button
                                            onClick={() => openModal(service)}
                                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                        >
                                            <BookOpenCheck className="h-4 w-4" />
                                            View Details
                                        </Button>

                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <span>{service.features?.length || 0} features</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <PlusIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No services yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Get started by creating your first service to showcase your offerings.
                            </p>
                            <Link
                                href='/admin/services/create'
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Create First Service
                            </Link>
                        </div>
                    </div>
                )}

                {/* Modal */}
                <ServiceDetailModal
                    service={selectedService}
                    onClose={closeModal}
                />
            </div>
        </AppLayout>
    );
}
