import React from 'react';

const Heading = ({ level = 1, onClick, children, className = '', ...props }) => {
    const Tag = `${level}`;

    return React.createElement(
        Tag,
        { className, onClick, ...props },
        children
    );
};

export default Heading;