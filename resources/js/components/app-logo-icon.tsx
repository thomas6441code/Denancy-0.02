import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#1e3a8a" />

            {/* D Letter */}
            <path
                d="M10 10h8c5.523 0 10 4.477 10 10s-4.477 10-10 10h-8V10z"
                fill="#fbbf24"
            />
            <path
                d="M12 12v16h6c4.418 0 8-3.582 8-8s-3.582-8-8-8h-6z"
                fill="#1e3a8a"
            />

            {/* L Letter */}
            <rect x="26" y="10" width="4" height="20" fill="#fbbf24" />
            <rect x="26" y="26" width="8" height="4" fill="#fbbf24" />
        </svg>
    );
}
