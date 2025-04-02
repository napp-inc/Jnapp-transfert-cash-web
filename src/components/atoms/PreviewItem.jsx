"use client";

import React from "react";
import Image from 'next/image';

const PreviewItems = ({ src, alt, name, count, style }) => {
    return (
        <div className="preview-alert flex items-center space-x-2">
            <Image src={src} alt={alt} width={32} height={32} className="object-cover" />
            <div className="flex flex-col gap-5 preview-alert-sub">
                <p className={style}>{name}</p>
                <p className={style}>{count}</p>
            </div>
        </div>
    );
};
export default PreviewItems;