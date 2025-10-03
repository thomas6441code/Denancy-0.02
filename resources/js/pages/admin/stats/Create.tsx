import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import StatForm from './CreateEditForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stats/Create',
        href: '/admin/stats/create',
    },
];

const DepartmentCreate: React.FC = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Stat" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Stat</h1>
                <div className="bg-white shadow rounded-lg p-6 max-w-lg">
                    <StatForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default DepartmentCreate;