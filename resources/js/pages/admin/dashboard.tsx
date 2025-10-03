import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import React from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
];

export default function Dashboard() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Messages"
                        value={128}
                        icon={<MessageIcon />}
                        trend="up"
                        percentage="12.5%"
                        color="from-blue-500 to-indigo-600"
                        glow="shadow-lg shadow-blue-500/50"
                    />
                    <StatCard
                        title="Pending Messages"
                        value={34}
                        icon={<MailWarningIcon />}
                        trend="down"
                        percentage="8.3%"
                        color="from-yellow-500 to-orange-600"
                        glow="shadow-lg shadow-yellow-500/50"
                    />
                    <StatCard
                        title="Resolved Messages"
                        value={94}
                        icon={<HelpCircleIcon />}
                        trend="up"
                        percentage="15.0%"
                        color="from-green-500 to-teal-600"
                        glow="shadow-lg shadow-green-500/50"
                    />
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({
    title,
    value,
    icon,
    trend,
    percentage,
    color,
    glow
}: Readonly<{
    title: string;
    value: number;
    icon?: React.ReactNode;
    trend?: "up" | "down";
    percentage?: string;
    color: string;
    glow: string;
}>) {
    return (
        <div className={`rounded-xl p-5 ${glow} bg-gradient-to-br ${color} text-white`}>
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm font-medium text-white/80">{title}</div>
                        <div className="text-2xl font-bold mt-1 text-white">{value}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/20">
                        {icon}
                    </div>
                </div>
                {trend && percentage && (
                    <div className="flex items-center mt-3">
                        <span className={`inline-flex items-center ${trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                            {trend === 'up' ? (
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                            <span className="text-xs font-medium">{percentage}</span>
                        </span>
                        <span className="text-xs text-white/60 ml-2">vs last period</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// Icon Components
function MessageIcon() {
    return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    );
}

function MailWarningIcon() {
    return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
}

function HelpCircleIcon() {
    return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
