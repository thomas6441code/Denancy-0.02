import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from '@/layouts/web-layout';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    console.log(auth);
    return (
        <WebLayout>

            <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 py-6 sm:py-12">
                Hello Home Page...
            </div>

        </WebLayout>
    );
}
