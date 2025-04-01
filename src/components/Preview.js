'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiBackendRoute } from '../endPointsAndKeys';

const PreviewItems = ({ src, alt, name, count, style }) => {
	return (
		<div className="preview-alert flex items-center space-x-2">
			<Image src={src} alt={alt} width={32} height={32} className="object-cover" />
			<div className="flex flex-col gap-5 preview-alert-sub">
				<p className={style}>{name}</p>
				<p className={style}>{count}</p>
			</div>
		</div>
	);
};

export default function Preview() {
	const [nombres, setNombres] = useState({
		transfertsEnCours: 0,
		transfertsTermines: 0,
		alertesEnCours: 0,
		transfertsPrevus: 0,
	});

	useEffect(() => {
		fetch(`${apiBackendRoute}`)
			.then((response) => response.json())
			.then((data) => {
				setNombres({
					transfertsEnCours: data.transfertsEnCours || 0,
					transfertsTermines: data.transfertsTermines || 0,
					alertesEnCours: data.alertesEnCours || 0,
					transfertsPrevus: data.transfertsPrevus || 0,
				});
			})
			.catch((error) => console.error('Error:', error));
	}, []);

	return (
		<div className="bg-gray-100 p-4 w-[100%] items-center">
			<h2 className="text-black-xl font-bold mb-4 title-size">Aperçu</h2>
			<div className="preview">
				<PreviewItems
					src="/previewIcones/transferts.svg"
					alt="Transferts en cours"
					name="Transferts en cours"
					count={nombres.transfertsEnCours}
					style={'sm:text-2xl text-xs text-blue-500 font-bold'}
				/>

				<PreviewItems
					src="/previewIcones/finished.svg"
					alt="Transferts terminés"
					name="Transferts terminés"
					count={nombres.transfertsTermines}
					style={'sm:text-2xl text-xs text-blue-500 font-bold'}
				/>

				<PreviewItems src="/previewIcones/alerts.svg" alt="Alertes en cours" name="Alertes en cours" count={nombres.alertesEnCours} style={'sm:text-2xl text-xs text-red-500 font-bold'} />

				<PreviewItems
					src="/previewIcones/scheduled.svg"
					alt="Transferts prévus"
					name="Transferts prévus"
					count={nombres.transfertsPrevus}
					style={'sm:text-2xl text-xs text-yellow-500 font-bold'}
				/>
			</div>
		</div>
	);
}
