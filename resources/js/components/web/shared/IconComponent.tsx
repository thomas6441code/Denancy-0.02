import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconComponentProps {
    icon: string;
    className?: string;
    color?: string;
    [key: string]: any;
}

const IconComponent: React.FC<IconComponentProps> = ({
    icon,
    className = '',
    color,
    ...props
}) => {
    const formatIconName = (iconName: string): string => {
        return iconName
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    };

    const iconName = formatIconName(icon);
    const LucideIcon = (LucideIcons as any)[iconName];

    if (!LucideIcon) {
        console.warn(`Icon "${icon}" not found in Lucide Icons`);
        return (
            <div
                className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center"
                title={`Icon "${icon}" not found`}
                {...props}
            >
                <span className="text-xs text-gray-500">?</span>
            </div>
        );
    }

    const combinedClassName = `w-5 h-5 ${className}`.trim();

    return (
        <LucideIcon
            className={combinedClassName}
            color={color}
            {...props}
        />
    );
};

export default IconComponent;
