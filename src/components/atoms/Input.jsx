'use client';
import React from "react";
export default function Input({ type,step,  value, name, onChange, placeholder,}) {
  return (
    <input
      type={type}
      step={step}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
    />
  );
}