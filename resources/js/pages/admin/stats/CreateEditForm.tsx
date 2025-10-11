import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextInput } from '@/components/Form/TextInput';
import IconComponent from '@/components/web/shared/IconComponent';

interface StatProps {
    stat?: {
        id: number;
        icon: string;
        label: string;
        value: string;
        description: string;
    }
}

const StatForm: React.FC<StatProps> = ({ stat }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        icon: stat?.icon || '',
        label: stat?.label || '',
        value: stat?.value || '',
        description: stat?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (stat?.id) {
            put(`/admin/stats/${stat.id}`);
        } else {
            post('/admin/stats');
        }
    };

    const handleCancel = () => {
        reset();
        window.history.back();
    };

    return (
        <div className="max-w-2xl mx-auto md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className='bg-white border border-gray-200 shadow-sm'>
                    <CardHeader className='pb-4'>
                        <CardTitle className='text-2xl font-bold text-gray-900'>
                            {stat?.id ? 'Edit Statistic' : 'Create New Statistic'}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-2">
                            {stat?.id
                                ? 'Update the statistic information below.'
                                : 'Fill in the details to create a new statistic.'
                            }
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Icon Input */}
                        <div className="space-y-4">
                            <TextInput
                                label="Icon"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                error={errors.icon}
                                placeholder="e.g., users, dollar-sign, trending-up"
                                helperText="Enter the icon name from Lucide React icons"
                                required
                            />

                            {data.icon && (
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="text-sm text-gray-600">Preview:</span>
                                    <div className="flex items-center space-x-2">
                                          <IconComponent
                                                icon={data.icon}
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                                            />
                                        <span className="text-xs text-gray-500">(icon will be rendered here)</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Label Input */}
                        <TextInput
                            label="Label"
                            value={data.label}
                            onChange={(e) => setData('label', e.target.value)}
                            error={errors.label}
                            placeholder="e.g., Total Users, Revenue, Growth"
                            helperText="The title that describes this statistic"
                            required
                        />

                        {/* Value Input */}
                        <TextInput
                            label="Value"
                            value={data.value}
                            onChange={(e) => setData('value', e.target.value)}
                            error={errors.value}
                            placeholder="e.g., 1,234, $50K, +15%"
                            helperText="The main numerical value to display"
                            required
                        />

                        {/* Description Input */}
                        <div>
                            <TextInput
                                label="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                placeholder="e.g., Registered users, Monthly revenue, Growth rate"
                                helperText="A brief description of what this statistic represents"
                                required
                                multiline
                                rows={3}
                            />
                        </div>

                        {/* Debug Information - Remove in production */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <h4 className="text-sm font-semibold text-yellow-800 mb-2">Debug Info:</h4>
                                <pre className="text-xs text-yellow-700 overflow-auto">
                                    {JSON.stringify({ data, errors, processing }, null, 2)}
                                </pre>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={processing}
                        className="min-w-24 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="min-w-24 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {stat?.id ? 'Updating...' : 'Creating...'}
                            </span>
                        ) : (
                            stat?.id ? 'Update Stat' : 'Create Stat'
                        )}
                    </Button>
                </div>
            </form>

            {/*
            {Object.keys(errors).length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-red-800 mb-2">
                        Please fix the following errors:
                    </h4>
                    <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                        {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>
                                <span className="font-medium capitalize">{field.replace('_', ' ')}:</span> {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}
        </div>
    );
};

export default StatForm;
