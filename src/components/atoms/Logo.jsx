'use client';

export default function Logo({ src, alt, size }) {
    return <img src={src} alt={alt} className={size + " mx-auto mb-6 rounded-full"} />;
}