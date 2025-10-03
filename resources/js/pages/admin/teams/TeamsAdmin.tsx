import { FC, useState, useEffect } from 'react';
import { Trash2, Edit, Image as ImageIcon, Loader2, Plus, X, Users, Award, UserCheck, Mail } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ConfirmationModal from '@/components/web/shared/alertComfirm';

interface Team {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Team Members',
        href: '/admin/teams',
    },
];

const TeamsAdmin: FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [editingMember, setEditingMember] = useState<Team | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [image_url, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        loading: false,
        success: false,
        error: null,
        message: '',
        fieldErrors: {}
    });

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        messageId: number | null;
        messageName: string;
    }>({
        isOpen: false,
        messageId: null,
        messageName: ''
    });

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            resetForm();
        }
    }, [isModalOpen]);

    const fetchTeams = async () => {
        try {
            const response = await fetch('/admin/team');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: 'Failed to fetch teams',
                message: 'Please try again later',
                fieldErrors: {}
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionState({
            loading: true,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('role', role);
        formData.append('bio', bio);
        if (image_url) formData.append('image_url', image_url);
        formData.append('_method', editingMember ? 'PUT' : 'POST');

        try {
            const url = editingMember
                ? `/admin/teams/${editingMember.id}`
                : '/admin/teams';

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422 && data.errors) {
                    setSubmissionState({
                        loading: false,
                        success: false,
                        error: 'Please fix the form errors',
                        message: 'Please correct the highlighted fields',
                        fieldErrors: data.errors
                    });
                    return;
                }
                throw new Error(data.message || 'Failed to submit member');
            }

            resetForm();
            await fetchTeams();
            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: `Member ${editingMember ? 'updated' : 'created'} successfully!`,
                fieldErrors: {}
            });

            setTimeout(() => {
                setIsModalOpen(false);
            }, 1500);

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: `Failed to ${editingMember ? 'update' : 'create'} member`,
                message: error instanceof Error ? error.message : 'Member request failed! Please try again.',
                fieldErrors: {}
            });
        }
    };

    const handleEdit = (member: Team) => {
        setEditingMember(member);
        setName(member.name);
        setRole(member.role);
        setBio(member.bio);
        setPreview(member.image_url);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number, name: string) => {
        setDeleteModal({
            isOpen: true,
            messageId: id,
            messageName: name
        });
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/admin/teams/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete member');
            }

            await fetchTeams();
            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: 'Member deleted successfully!',
                fieldErrors: {}
            });
        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: 'Failed to delete member',
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                fieldErrors: {}
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setEditingMember(null);
        setName('');
        setRole('');
        setBio('');
        setImage(null);
        setPreview('');
        setSubmissionState({
            loading: false,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });
    };

    const openCreateModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    // Stats
    const totalMembers = teams.length;
    const leadershipCount = teams.filter(member =>
        member.role.toLowerCase().includes('lead') ||
        member.role.toLowerCase().includes('director') ||
        member.role.toLowerCase().includes('head')
    ).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team Management" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 text-black py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div className="mb-6 sm:mb-0">
                            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Team Management
                            </h1>
                            <p className="mt-2 text-gray-600 max-w-2xl">
                                Manage your team members, their roles, and profiles in one place.
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Team Member
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Members"
                            value={totalMembers}
                            icon={<Users className="h-6 w-6 text-white" />}
                            color="from-blue-500 to-blue-600"
                            trend="up"
                        />
                        <StatCard
                            title="Leadership"
                            value={leadershipCount}
                            icon={<Award className="h-6 w-6 text-white" />}
                            color="from-purple-500 to-purple-600"
                            trend="stable"
                        />
                        <StatCard
                            title="Active"
                            value={totalMembers}
                            icon={<UserCheck className="h-6 w-6 text-white" />}
                            color="from-green-500 to-green-600"
                            trend="up"
                        />
                    </div>

                    {/* Success/Error Messages */}
                    {(submissionState.success || submissionState.error) && (
                        <div className={`mb-6 p-4 rounded-xs my-2 ${
                            submissionState.success
                                ? 'bg-green-50 border-green-500 text-green-700'
                                : 'bg-red-50 border-red-500 text-red-700'
                        }`}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {submissionState.success ? (
                                        <div className="w-6 h-6 bg-green-300  rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center">
                                            <X className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium">
                                        {submissionState.success ? 'Success!' : 'Error'}
                                    </p>
                                    <p className="text-sm mt-1">
                                        {submissionState.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Team Grid */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                            <div className="text-sm text-gray-500">
                                {totalMembers} {totalMembers === 1 ? 'member' : 'members'}
                            </div>
                        </div>

                        {teams.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-12 h-12 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No team members yet</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Start building your team by adding the first member. Showcase their expertise and roles.
                                </p>
                                <button
                                    onClick={openCreateModal}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add First Member
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teams.map((member) => (
                                    <div
                                        key={member.id}
                                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className="relative overflow-hidden rounded-t-2xl">
                                            <img
                                                src={member.image_url}
                                                alt={member.name}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button
                                                    onClick={() => handleEdit(member)}
                                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-blue-600 hover:text-blue-800 hover:bg-white transition-colors duration-200 shadow-lg"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(member.id, member.name)}
                                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:text-red-800 hover:bg-white transition-colors duration-200 shadow-lg"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                                            <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                                            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{member.bio}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <ConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, messageId: null, messageName: '' })}
                    onConfirm={() => {
                        if (deleteModal.messageId) {
                            handleDelete(deleteModal.messageId);
                        }
                    }}
                    title="Delete Member"
                    message={`Are you sure you want to delete the member "${deleteModal.messageName}"? This action cannot be undone.`}
                    confirmText="Delete Member"
                    cancelText="Keep Member"
                    type="danger"
                />

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-8 border-b border-gray-100">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {editingMember ? 'Update member information' : 'Add a new member to your team'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Profile Image
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                                {preview ? (
                                                    <div className="relative w-full h-full">
                                                        <img
                                                            src={preview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover rounded-2xl"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                                            <ImageIcon className="w-8 h-8 text-white" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-10">
                                                        <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                                                        <p className="text-sm text-gray-600 font-medium">
                                                            Click to upload image
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            PNG, JPG, WEBP up to 5MB
                                                        </p>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    required={!editingMember}
                                                />
                                            </label>
                                        </div>
                                        {submissionState.fieldErrors?.image_url && (
                                            <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.image_url[0]}</p>
                                        )}
                                    </div>

                                    {/* Name Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter full name"
                                            required
                                        />
                                        {submissionState.fieldErrors?.name && (
                                            <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.name[0]}</p>
                                        )}
                                    </div>

                                    {/* Role Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Role/Position
                                        </label>
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="e.g., Software Engineer, Product Manager"
                                            required
                                        />
                                        {submissionState.fieldErrors?.role && (
                                            <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.role[0]}</p>
                                        )}
                                    </div>

                                    {/* Bio Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Bio/Description
                                        </label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Brief description about the team member..."
                                            required
                                        />
                                        {submissionState.fieldErrors?.bio && (
                                            <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.bio[0]}</p>
                                        )}
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            disabled={submissionState.loading}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                                        >
                                            {submissionState.loading ? (
                                                <span className="flex items-center justify-center">
                                                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                    {editingMember ? 'Updating...' : 'Creating...'}
                                                </span>
                                            ) : (
                                                editingMember ? 'Update Member' : 'Create Member'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            disabled={submissionState.loading}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default TeamsAdmin;

// StatCard Component
interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    trend: 'up' | 'down' | 'stable';
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
    return (
        <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-blue-100 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-1">{value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {icon}
                </div>
            </div>
        </div>
    );
};
