'use client';
import React from "react";

export default function Select({ name, value, onChange, options, placeholder }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
        >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

