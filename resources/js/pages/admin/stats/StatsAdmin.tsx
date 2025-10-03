import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

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
            <Head title="Faqs & Stats " />

            <div className="md:px-6 px-4 py-8">
                {/* Header with actions */}
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900 dar:text-white">Stats Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dar:text-gray-400">
                            Manage all available Stats in your system
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


                {/* Stats table */}
                <div className="bg-white dar:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dar:divide-gray-700">
                            <thead className="bg-gray-50 dar:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Icon
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Label
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Value
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {stats?.map((stat, index: number) => (
                                    <tr key={stat.id} className="hover:bg-gray-50 dar:hover:bg-gray-700/50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex flex-1 items-center">
                                                    <div className="text-sm font-medium text-sky-900">
                                                        {stat.icon}
                                                    </div>
                                                    <div className="text-sm ml-2 font-medium text-gray-900">
                                                        {stat.icon}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {stat.label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {stat.value}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {stat.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center gap-3">
                                                <Link
                                                    href={`/admin/stats/edit/${stat.id}`}
                                                    className="text-blue-600 hover:text-blue-900 dar:text-blue-400 dar:hover:text-blue-300 p-1 rounded-md hover:bg-blue-50 dar:hover:bg-blue-900/30"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    method="delete"
                                                    href={`/admin/stats/destroy/${stat.id}`}
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 dar:text-red-400 dar:hover:text-red-300 p-1 rounded-md hover:bg-red-50 dar:hover:bg-red-900/30"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination would go here */}
                {stats?.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dar:text-gray-400">
                            No Stats found. Create your first stat!
                        </div>
                        <Link
                            href='/admin/stats/create'
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add New stat
                        </Link>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
