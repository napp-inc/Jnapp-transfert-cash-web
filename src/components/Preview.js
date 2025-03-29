'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

import React from 'react';
import Image from 'next/image';

// PreviewItems Component
const PreviewItems = ({ src, alt, name, count, style }) => {
	return (
		<div className="preview-alert flex items-center space-x-2">
			<Image src={src} alt={alt} width={32} height={32} className="object-cover" />
			<div className="flex flex-col gap-5">
				<p className= {style}>{name}</p>
				<p className={style}>{count}</p>
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
				<PreviewItems src="/previewIcones/transferts.svg" alt="Transferts en cours" name="Transferts en cours" count="15" style={"text-blue-500 font-bold"}  />

				<PreviewItems src="/previewIcones/finished.svg" alt="Transferts terminés" name="Transferts terminés" count="4" style={"text-blue-500 font-bold"} />

				<PreviewItems src="/previewIcones/alerts.svg" alt="Alertes en cours" name="Alertes en cours" count="4" style={"text-red-500 font-bold"} />

				<PreviewItems src="/previewIcones/scheduled.svg" alt="Transferts prévus" name="Transferts prévus" count="15" style={"text-yellow-500 font-bold"} />
			</div>
		</div>
	);
}
