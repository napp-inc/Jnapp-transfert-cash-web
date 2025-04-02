'use client';
import React from "react";
export default function Input({ type, value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
    />
  );
}