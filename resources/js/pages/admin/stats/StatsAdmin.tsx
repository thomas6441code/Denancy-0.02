import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import IconComponent from '@/components/web/shared/IconComponent';

export interface Stats {
    id: number;
    icon: string;
    label: string;
    value: string;
    description: string;
}

interface Props {
    stats: Stats[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stats',
        href: '/admin/stats',
    },
];

export default function StatsIndex({ stats }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Faqs & Stats" />

            <div className="md:px-6 px-4 py-8">
                {/* Header with actions */}
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stats Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage all available stats in your system
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href='/admin/stats/create'
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Stats
                        </Link>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats?.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <IconComponent
                                                icon={stat.icon}
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                #{index + 1}
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {stat.label}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/admin/stats/edit/${stat.id}`}
                                            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            method="delete"
                                            href={`/admin/stats/destroy/${stat.id}`}
                                            as="button"
                                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Value
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>Icon: {stat.icon}</span>
                                    <span>ID: {stat.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {stats?.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="max-w-md mx-auto">
                            <div className="mx-auto h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <PlusIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No stats found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Get started by creating your first stat to display on your website.
                            </p>
                            <Link
                                href='/admin/stats/create'
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add New Stat
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
