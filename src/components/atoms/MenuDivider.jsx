'use client';
import React from 'react';

export default function MenuDivider({ isHidden = false, isMobile = false }) {
    return <hr className={`${isHidden && isMobile ? 'hidden' : ''} md:block my-4 border-gray-300`} />;
}
