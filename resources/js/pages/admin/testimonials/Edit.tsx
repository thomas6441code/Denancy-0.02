import React from 'react';
import { Head } from '@inertiajs/react';
import TestimonialForm from './CreateEditForm';
import AppLayout from '@/layouts/app-layout';

interface testimonial {
    'id': number;
    'name': string;
    'role': string;
    'content': string;
    'rating': number;
    'image': string;
    'category': string;
}


interface service {
    id: number;
    title: string;
}

interface FormProps {

    services: service[];
    testimonial: testimonial;

}


const TestimonialsEdit: React.FC<FormProps> = ({ testimonial, services }) => {
    return (
        <AppLayout>
            <Head title={`Edit ${testimonial.name}`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Testimonial: {testimonial.name}</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <TestimonialForm service={services} testimonial={testimonial} />
                </div>
            </div>
        </AppLayout>
    );
};

export default TestimonialsEdit;