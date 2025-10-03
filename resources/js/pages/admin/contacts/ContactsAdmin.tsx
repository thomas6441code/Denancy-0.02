import ConfirmationModal from '@/components/web/shared/alertComfirm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckCheck, MailIcon, MessageCircleCodeIcon, RefreshCw, RefreshCwIcon, SearchCheck, SortAsc, SortAscIcon, SortDescIcon, Trash2Icon, UserX2Icon, ClockIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    is_read: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Message',
        href: '/admin/contacts',
    },
];

const MessageTable: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Message;
        direction: 'ascending' | 'descending'
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        messageId: number | null;
        messageName: string;
    }>({
        isOpen: false,
        messageId: null,
        messageName: ''
    });
    const messagesPerPage = 15;

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const filtered = messages.filter(message =>
            message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMessages(filtered);
        setCurrentPage(1);
    }, [searchTerm, messages]);

    const fetchMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/contacts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data.messages);
            setFilteredMessages(data.messages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/api/admin/contacts/read/${id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to mark as read');
            }
            fetchMessages();
        } catch (err) {
            console.error('Error marking as read:', err);
        }
    };

    const markAsUnread = async (id: number) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/api/admin/contacts/unread/${id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to mark as unread');
            }
            fetchMessages();
        } catch (err) {
            console.error('Error marking as unread:', err);
        }
    };

    const handleDeleteClick = (id: number, name: string) => {
        setDeleteModal({
            isOpen: true,
            messageId: id,
            messageName: name
        });
    };

    const deleteMessage = async (id: number) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/api/admin/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
            fetchMessages();
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    const requestSort = (key: keyof Message) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const safeSort = <T extends Record<string, unknown>>(
        array: T[],
        sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null
    ): T[] => {
        if (!sortConfig) return [...array];

        return [...array].sort((a, b) => {
            let aValue: unknown = a[sortConfig.key];
            let bValue: unknown = b[sortConfig.key];

            // Handle null/undefined cases
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return sortConfig.direction === 'ascending' ? 1 : -1;
            if (bValue == null) return sortConfig.direction === 'ascending' ? -1 : 1;

            // Convert to comparable values
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                // Try to parse as date
                const dateA = new Date(aValue).getTime();
                const dateB = new Date(bValue).getTime();

                if (!isNaN(dateA) && !isNaN(dateB)) {
                    aValue = dateA;
                    bValue = dateB;
                }
            }

            // Perform comparison
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const sortedMessages = safeSort(filteredMessages, sortConfig);

    // Stats
    const totalMessages = messages.length;
    const readMessages = messages.filter(q => q.is_read).length;
    const unreadMessages = messages.filter(q => !q.is_read).length;

    // Pagination logic
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);
    const totalPages = Math.ceil(sortedMessages.length / messagesPerPage);

    const getSortIcon = (key: keyof Message) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <SortAsc className="ml-1 inline opacity-30" />;
        }
        return sortConfig.direction === 'ascending'
            ? <SortAscIcon className="ml-1 inline" />
            : <SortDescIcon className="ml-1 inline" />;
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="text-black md:px-6 px-4 py-8">
                <div className="flex justify-between items-center mb-2">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold mb-4">Messages Management</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage all available messages in your system.
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={fetchMessages}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <RefreshCwIcon className="h-4 w-4 mr-2" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Display - Modern Glowing Style */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Total Messages"
                        value={totalMessages}
                        icon={<MessageCircleCodeIcon className="h-5 w-5 text-white" />}
                        color="from-indigo-500/80 to-indigo-700/80"
                        glow="shadow-indigo-500/30"
                        trend="up"
                        percentage="Available Messages"
                    />
                    <StatCard
                        title="Read"
                        value={readMessages}
                        icon={<CheckCheck className="h-5 w-5 text-white" />}
                        color="from-green-400/80 to-green-600/80"
                        glow="shadow-green-500/30"
                        trend="up"
                        percentage={totalMessages > 0 ? `${Math.round((readMessages / totalMessages) * 100)}%` : "0%"}
                    />
                    <StatCard
                        title="Pending"
                        value={unreadMessages}
                        icon={<RefreshCw className="h-5 w-5 text-white" />}
                        color="from-yellow-400/80 to-yellow-600/80"
                        glow="shadow-yellow-500/30"
                        trend="down"
                        percentage={totalMessages > 0 ? `${Math.round((unreadMessages / totalMessages) * 100)}%` : "0%"}
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg max-w-full overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="relative flex-1 max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchCheck className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search message by name or email..."
                                    className="block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="text-sm text-gray-500">
                                Showing {currentMessages.length} messages
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-8 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto max-w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('name')}
                                            >
                                                <div className="flex items-center">
                                                    Name
                                                    {getSortIcon('name')}
                                                </div>
                                            </th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('subject')}
                                            >
                                                <div className="flex items-center">
                                                    Subject
                                                    {getSortIcon('subject')}
                                                </div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentMessages.length > 0 ? (
                                            currentMessages.map((message) => (
                                                <tr
                                                    key={message.id}
                                                    className={message.is_read ? 'bg-white' : 'bg-blue-50'}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                                                        <div className="text-sm text-gray-500">{message.email}</div>
                                                    </td>
                                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {message.phone || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                                                        <div className="line-clamp-2">{message.subject}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {message.is_read ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Read
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    if (message.is_read) {
                                                                        markAsUnread(message.id);
                                                                    } else {
                                                                        setSelectedMessage(message);
                                                                    }
                                                                }}
                                                                className={`p-1 rounded ${
                                                                    message.is_read
                                                                        ? 'text-green-600 hover:text-green-900 hover:bg-green-50'
                                                                        : 'text-orange-600 hover:text-orange-900 hover:bg-orange-50'
                                                                }`}
                                                                title={message.is_read ? 'Mark as Unread' : 'View Message'}
                                                            >
                                                                <CheckCheck className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(message.id, message.name)}
                                                                className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                                                                title="Delete"
                                                            >
                                                                <Trash2Icon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No messages found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex-1 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{indexOfFirstMessage + 1}</span> to{' '}
                                                <span className="font-medium">
                                                    {Math.min(indexOfLastMessage, sortedMessages.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{sortedMessages.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <span className="sr-only">Previous</span>&larr;
                                                </button>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                            currentPage === page
                                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <span className="sr-only">Next</span>&rarr;
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <ConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, messageId: null, messageName: '' })}
                    onConfirm={() => {
                        if (deleteModal.messageId) {
                            deleteMessage(deleteModal.messageId);
                        }
                    }}
                    title="Delete Message"
                    message={`Are you sure you want to delete the message from "${deleteModal.messageName}"? This action cannot be undone.`}
                    confirmText="Delete Message"
                    cancelText="Keep Message"
                    type="danger"
                />

                {/* Email Modal */}
                {selectedMessage && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="p-2 bg-white/20 rounded-xl">
                                                <MailIcon className="h-6 w-6 text-white" />
                                            </div>
                                            <h2 className="text-2xl font-bold">Reply to {selectedMessage.name}</h2>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/80 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Message Details */}
                            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                                {/* Customer Information Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 flex items-center">
                                            <UserX2Icon className="h-4 w-4 mr-2 text-blue-500" />
                                            Contact Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 block mb-1">Full Name</label>
                                                <p className="font-medium text-slate-900">{selectedMessage.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 block mb-1">Email Address</label>
                                                <a
                                                    href={`mailto:${selectedMessage.email}`}
                                                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center space-x-1"
                                                >
                                                    <span>{selectedMessage.email}</span>
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Message Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 block mb-1">Subject</label>
                                                <p className="font-medium text-slate-900">{selectedMessage.subject}</p>
                                            </div>
                                            {selectedMessage.phone && (
                                                <div>
                                                    <label className="text-xs font-medium text-slate-500 block mb-1">Phone</label>
                                                    <p className="font-medium text-slate-900">{selectedMessage.phone}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 flex items-center">
                                        <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Message Content
                                    </h3>
                                    <div className="prose prose-sm max-w-none text-slate-700 bg-white rounded-lg p-4">
                                        {selectedMessage.message.split('\n').map((paragraph, index) => (
                                            <p key={index} className="mb-3 last:mb-0">
                                                {paragraph || <br />}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
                                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>Received {formatDate(selectedMessage.created_at)}</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                                        >
                                            Close Preview
                                        </button>
                                        <button
                                            onClick={() => {
                                                markAsRead(selectedMessage.id);
                                                setSelectedMessage(null);
                                            }}
                                            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm flex items-center space-x-2"
                                        >
                                            <MailIcon className="h-4 w-4" />
                                            <span>Mark as Seen</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default MessageTable;

interface StatCardProps {
    title: string;
    value: number;
    icon?: React.ReactNode;
    trend?: "up" | "down";
    percentage?: string;
    color: string;
    glow: string;
}

function StatCard({
    title,
    value,
    icon,
    trend,
    percentage,
    color,
    glow
}: Readonly<StatCardProps>) {
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
