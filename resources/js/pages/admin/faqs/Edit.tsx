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

const FaqsEdit: React.FC<FaqsFormProps> = ({ faq, service }) => {
    return (
        <AppLayout>
            <Head title={`Edit Faq`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit faq</h1>
                <div className="bg-white shadow rounded-lg p-2 max-w-xl">
                    <FaqForm faq={faq} service={service} />
                </div>
            </div>
        </AppLayout>
    );
};

export default FaqsEdit;