'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

import React from 'react';
import Image from 'next/image';

// PreviewItems Component
const PreviewItems = ({ src, alt, name, count }) => {
	return (
		<div className="preview-alert flex items-center space-x-2">
			<Image src={src} alt={alt} width={32} height={32} className="object-cover" />
			<div className="flex flex-col">
				<p className="text-blue-500 font-semibold">{name}</p>
				<p className="text-blue-500 font-bold text-lg">{count}</p>
			</div>
		</div>
	);
};

// Preview Component
export default function Preview() {
	return (
		<div className="bg-gray-100 p-4 w-[100%]">
			<h2 className="text-black-xl font-bold mb-4 title-size">Aperçu</h2>
			<div className="preview">
				<PreviewItems src="/dashboardIconeActive.svg" alt="Transferts en cours" name="Transferts en cours" count="15" />

				<PreviewItems src="/dashboardIconeActive.svg" alt="Transferts terminés" name="Transferts terminés" count="5" className="text-green-500" />

				<PreviewItems src="/dashboardIconeActive.svg" alt="Alertes en cours" name="Alertes en cours" count="4" className="text-red-500" />

				<PreviewItems src="/dashboardIconeActive.svg" alt="Transferts prévus" name="Transferts prévus" count="15" className="text-yellow-500" />
			</div>
		</div>
	);
}
