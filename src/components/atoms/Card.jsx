import React from 'react';

export const Card = ({
    children,
    className = '',
    ...props
}) => (
    <div
        className={`
        bg-white rounded-lg p-6
        ${className}
      `}
        {...props}
    >
        {children}
    </div>
);