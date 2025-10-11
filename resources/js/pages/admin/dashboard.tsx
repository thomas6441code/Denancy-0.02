import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
    phone?: string;
}

interface DashboardProps {
    messages: Message[];
    stats: {
        totalMessages: number;
        unreadMessages: number;
        readMessages: number;
        messagesTrend: number;
        responseRate: number;
    };
    chartData: {
        labels: string[];
        data: number[];
    };
    subjectDistribution: { subject: string; count: number }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard({ messages, stats, chartData, subjectDistribution }: DashboardProps) {
    const recentMessages = messages.slice(0, 10);

    // Transform data for Recharts
    const barChartData = chartData.labels.map((label, index) => ({
        name: label,
        messages: chartData.data[index]
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-600">Welcome to your admin dashboard</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Messages"
                        value={stats.totalMessages}
                        icon={<MessageIcon className='text-blue-500 bg-blue-100 p-2' />}
                        trend={stats.messagesTrend > 0 ? "up" : "down"}
                        percentage={`${Math.abs(stats.messagesTrend)}%`}
                        color="blue"
                    />
                    <StatCard
                        title="Unread Messages"
                        value={stats.unreadMessages}
                        icon={<MailWarningIcon className='text-orange-500 bg-amber-100 p-2' />}
                        trend="down"
                        percentage="8.3%"
                        color="orange"
                    />
                    <StatCard
                        title="Response Rate"
                        value={stats.responseRate}
                        icon={<TrendingUpIcon className='text-green-500 bg-green-100 p-2' />}
                        trend="up"
                        percentage="5.2%"
                        color="green"
                        suffix="%"
                    />
                    <StatCard
                        title="Avg. Response Time"
                        value={2.4}
                        icon={<ClockIcon className='text-purple-500 bg-purple-100 p-2' />}
                        trend="down"
                        percentage="12.1%"
                        color="purple"
                        suffix="hrs"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Messages Trend Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages Trend (Last 7 Days)</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar
                                        dataKey="messages"
                                        fill="#3B82F6"
                                        radius={[4, 4, 0, 0]}
                                        className="hover:opacity-80"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Subject Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages by Subject</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={subjectDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ subject, percent }) => `${subject} (${(percent * 100).toFixed(0)}%)`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                    >
                                        {subjectDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Messages Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                            <span className="text-sm text-gray-500">
                                Showing {recentMessages.length} of {messages.length} messages
                            </span>
                        </div>
                    </div>
                    <div className="overflow-x-auto hide-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentMessages.map((message) => (
                                    <MessageTableRow key={message.id} message={message} />
                                ))}
                            </tbody>
                        </table>
                        {recentMessages.length === 0 && (
                            <div className="text-center py-12">
                                <MessageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-gray-500">No messages found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Message Table Row Component
function MessageTableRow({ message }: { message: Message }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150 hide-scrollbar">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                        message.is_read ? 'bg-green-400' : 'bg-blue-500 animate-pulse'
                    }`} />
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        message.is_read
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}>
                        {message.is_read ? 'Read' : 'New'}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium  text-gray-900">{message.name}</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {message.subject}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{message.email}</div>
                {message.phone && (
                    <div className="text-xs text-gray-500">{message.phone}</div>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate" title={message.message}>
                    {message.message}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(message.created_at).toLocaleDateString()}
                <div className="text-xs text-gray-400">
                    {new Date(message.created_at).toLocaleTimeString()}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                    <button onClick={()=>window.location.href='/admin/contacts'} className="text-blue-600  hover:text-blue-900 transition-colors">
                        View
                    </button>
                </div>
            </td>
        </tr>
    );
}

// Updated StatCard Component
function StatCard({
    title,
    value,
    icon,
    trend,
    percentage,
    color,
    suffix = ''
}: Readonly<{
    title: string;
    value: number;
    icon?: React.ReactNode;
    trend?: "up" | "down";
    percentage?: string;
    color: "blue" | "green" | "orange" | "purple";
    suffix?: string;
}>) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
        green: 'from-green-500 to-green-600 shadow-green-500/25',
        orange: 'from-orange-500 to-orange-600 shadow-orange-500/25',
        purple: 'from-purple-500 to-purple-600 shadow-purple-500/25'
    };

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 text-white shadow-lg`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-white/80 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold mt-1">
                        {value}{suffix}
                    </p>
                    {trend && percentage && (
                        <div className="flex items-center mt-2">
                            <span className={`inline-flex items-center text-xs ${
                                trend === 'up' ? 'text-green-200' : 'text-red-200'
                            }`}>
                                {trend === 'up' ? (
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {percentage}
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}

// Icon Components
function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    );
}

function MailWarningIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
