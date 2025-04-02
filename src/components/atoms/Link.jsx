'use client';
import React from "react";
import Link from 'next/link';

export default function CustomLink({ href, text }) {
  return (
    <Link href={href} className="text-yellow-500 text-center block">
      {text}
    </Link>
  );
}
