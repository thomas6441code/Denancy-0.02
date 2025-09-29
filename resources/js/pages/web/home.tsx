import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from '@/layouts/web-layout';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const topSectionProps = {
        title: "Home Us",
        description: "Welcome to Denancy Legends Group - Your trusted partner for innovative solutions and exceptional service delivery in Tanzania and beyond.",
        images: [{
        url: '/images/contact-bg.jpg',
        title: 'Home background.'
        }],
        primaryButtonColor: "blue",
        showBanner: false
    };

    console.log(auth);
    return (
        <WebLayout topSectionProps={topSectionProps}>

            <div className="relative min-h-screen text-gray-900 flex h-20 flex-col items-center justify-center py-6 sm:py-12">
                Hello Home Page...
            </div>

        </WebLayout>
    );
}
