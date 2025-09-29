import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from '@/layouts/web-layout';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    console.log(auth);
    return (
        <WebLayout>

            <div className="relative min-h-screen text-gray-900 flex h-20 flex-col items-center justify-center py-6 sm:py-12">
                Hello Home Page...
            </div>

        </WebLayout>
    );
}
