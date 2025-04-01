'use client';
import TransfertsInProgress from '../hooks/Transferts';
import { apiBackendRoute } from '../endPointsAndKeys';

export default function DataTable({ apiUrl = `${apiBackendRoute}/api/transferts` }) {
	const { data, loading, error } = TransfertsInProgress(apiUrl);

	const columns = ['Transfert', 'Date', 'Chargé', 'Validateur', 'Véhicule', 'Sac', 'Trajet', 'Alertes', 'Montant', 'Status'];

	return (
		<div className="bg-gray-100 p-4 w-[100%] items-center">
			<h2 className="text-black-xl font-bold mb-4 title-size">Transferts récents</h2>
			<div className="transferts-table overflow-auto hide-scrollbar">
				<table className="bg-white-100 divide-y divide-gray-200">
					<thead>
						<tr>
							{columns.map((col, idx) => (
								<th key={idx} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{loading && (
							<tr colSpan={columns.length} className="px-4 py-8 text-center">
								<td colSpan={columns.length} className="px-4 py-8 text-center">Chargement...</td>
							</tr>
						)}

						{error && (
							<tr colSpan={columns.length} className="px-4 py-8 text-center">
								<td colSpan={columns.length} className="px-4 py-8 text-center">⚠️ {error}</td>
							</tr>
						)}
						{data.length === 0 ? (
							<tr>
								<td colSpan={columns.length} className="px-4 py-8 text-center"></td>
							</tr>
						) : (
							data.map((item) => (
								<tr key={item.id} className="hover:bg-gray-50">
									{columns.map((col, idx) => (
										<td key={idx} className="px-4 py-2 whitespace-nowrap">
											{item[col.toLowerCase().replace(/ /g, '_')] || '-'}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
