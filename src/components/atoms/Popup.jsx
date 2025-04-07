"use client";
import React from 'react';
import Button from '../atoms/Button';

export default function Popup({ message, onClose, className }) {
    if (!message) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 h-1/3 sm:w-1/3 sm:h-1/4 min-h-fit flex flex-col items-center-safe">
                <p className="text-gray-800 mb-4 text-justify text-lg w-full">{message}</p>

                <div className={`flex items-center justify-between align-middle mb-12 min-w-1/2 ${className || ""}`}>
                    <div className="w-1/4">
                        <Button text="OK" type="button" onClick={onClose} className="w-full mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 text-lg font-bold" />
                    </div>
                </div>
            </div>
        </div>
    );
};
