import React from "react";

export default function MenuSection({ children, isHidden = false, isMobile = false }) {
    return <div className={`${isHidden && isMobile ? 'hidden' : ''} md:block`}>{children}</div>;
}
