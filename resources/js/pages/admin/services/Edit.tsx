import React from 'react';
import { Head } from '@inertiajs/react';
import ServiceForm from './CreateEditForm';
import AppLayout from '@/layouts/app-layout';

interface Props {
    service: {
        id: number;
        title: string;
        image: string;
        icon: string;
        description: string;
        long_description: string;
        features: string[];
    };
}

const ServicesEdit: React.FC<Props> = ({ service }) => {
    return (
        <AppLayout>
            <Head title={`Edit ${service.title}`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Service: {service.title}</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <ServiceForm service={service} />
                </div>
            </div>
        </AppLayout>
    );
};

export default ServicesEdit;
