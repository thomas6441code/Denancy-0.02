import React from 'react';
import { InputError } from '../InputError';

interface TextareaProps {
    label: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    rows?: number;
    className?: string;
    placeholder?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    rows = 3,
    className = '',
    placeholder = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <textarea
                name={name}
                id={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`block p-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''}`}
            />
            <InputError message={error} className="mt-1" />
        </div>
    );
};