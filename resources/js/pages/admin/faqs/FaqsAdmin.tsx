import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Faq {
    id?: number;
    question: string;
    answer: string;
    category: string;
}

interface FaqsProps {
    faqs: Faq[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQs',
        href: '/admin/faqs',
    },
];

export default function FaqsIndex({ faqs }: FaqsProps) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQs Management" />

            <div className="md:px-6 px-4 py-8">
                {/* Flash messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {/* Header with actions */}
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FAQs Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage all frequently asked questions in your system
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href='/admin/faqs/create'
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add FAQ
                        </Link>
                    </div>
                </div>

                {/* FAQs Accordion Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                        {index + 1}
                                    </span>
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {faq.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Link
                                        href={`/admin/faqs/edit/${faq.id}`}
                                        className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                                        title="Edit FAQ"
                                    >
                                        <PencilIcon className="h-3.5 w-3.5" />
                                    </Link>
                                    <Link
                                        method="delete"
                                        href={`/admin/faqs/${faq.id}`}
                                        as="button"
                                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                                        title="Delete FAQ"
                                    >
                                        <TrashIcon className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Question */}
                            <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-2 line-clamp-2">
                                {faq.question}
                            </h3>

                            {/* Answer */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                {faq.answer}
                            </p>

                            {/* View Full Action */}
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                <Link
                                    href={`/admin/faqs/edit/${faq.id}`}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                                >
                                    View & Edit ›
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {faqs.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="max-w-md mx-auto">
                            <div className="mx-auto h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <PlusIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No FAQs found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Get started by creating your first frequently asked question to help your users.
                            </p>
                            <Link
                                href='/admin/faqs/create'
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add New FAQ
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
