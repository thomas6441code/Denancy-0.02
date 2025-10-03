import React from 'react';
import { Head } from '@inertiajs/react';
import ServiceForm from './CreateEditForm';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services/Create',
        href: '/admin/services/create',
    },
];

const ServicesCreate: React.FC = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Service" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Service</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <ServiceForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default ServicesCreate;