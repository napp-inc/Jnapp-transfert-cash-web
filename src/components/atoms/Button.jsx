'use client';
import React from "react";

export default function Button({ text, onClick, type = 'button', className ="w-full mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  );
}