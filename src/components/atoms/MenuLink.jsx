'use client';
import Link from 'next/link';

export const MenuLink = ({ href, children, isActive = false }) => {
    return (
        <Link href={href} passHref>
            <span className={`text-lg ${isActive ? 'text-yellow-500 font-bold' : 'text-gray-700'}`}>
                {children}
            </span>
        </Link>
    );
};