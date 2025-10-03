import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import FaqForm from './CreateEditForm';

interface faq {
    id: number;
    question: string;
    answer: string;
    category: string;
}


interface service {
    id: number;
    title: string;
}

interface FaqsFormProps {

    service: service[];
    faq: faq;

}

const FaqsCreate: React.FC<FaqsFormProps> = ({ service, faq }) => {
    return (
        <AppLayout>
            <Head title="Create New Faq" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Faqs</h1>
                <div className="bg-white shadow rounded-lg p-2 max-w-2xl">
                    <FaqForm service={service} faq={faq} />
                </div>
            </div>
        </AppLayout>
    );
};

export default FaqsCreate;