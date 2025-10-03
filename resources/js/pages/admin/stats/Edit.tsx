import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import StatForm from './CreateEditForm';

interface StatProps {
    stat?: {
        id: number;
        icon: string;
        label: string;
        value: string;
        description: string;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stat/Edit',
        href: '/admin/stats/edit',
    },
];

const StatEdit: React.FC<StatProps> = ({ stat }) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Stat`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Stat</h1>
                <div className="bg-white shadow rounded-lg p-6 max-w-lg">
                    <StatForm stat={stat} />
                </div>
            </div>
        </AppLayout>
    );
};

export default StatEdit;
