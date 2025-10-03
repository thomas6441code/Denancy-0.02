import React from 'react';
import { InputError } from '../InputError';

interface FileInputProps {
    label: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    className?: string;
    accept?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
    label,
    name,
    onChange,
    error,
    required = false,
    className = '',
    accept = '',
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <input
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                accept={accept}
                className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${error ? 'border-red-500' : ''}`}
            />
            <InputError message={error} className="mt-1" />
        </div>
    );
};