import React from 'react';
import { InputError } from '../InputError';

interface TextInputProps {
    label: string;
    name?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    className = '',
    placeholder = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`block w-full px-4 py-2 h-12 rounded-md border border-gray-200 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm ${error ? 'border-red-500' : ''}`}
            />
            <InputError message={error} className="mt-1" />
        </div>
    );
};