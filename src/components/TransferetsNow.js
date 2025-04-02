'use client';
import DataTable from 'react-data-table-component';
import TransfertsInProgress from '../hooks/Transferts';


export default function TransfertsTable({ apiUrl = "api/url" }) {
	const { data, loading, error } = TransfertsInProgress(apiUrl);

	const columns = ['Transfert', 'Date', 'Chargé', 'Validateur', 'Véhicule', 'Sac', 'Trajet', 'Alertes', 'Montant', 'Status'].map(col => ({
		name: col,
		selector: row => row[col.toLowerCase().replace(/ /g, '_')] || '-',
		sortable: true,
		wrap: true
	}));

	const customStyles = {
		headRow: {
			style: {
				backgroundColor: 'white',
				borderBottomWidth: '1px',
				borderColor: '#e5e7eb',
			},
		},
		headCells: {
			style: {
				paddingLeft: '1rem',
				paddingRight: '1rem',
				fontSize: '0.75rem',
				fontWeight: 500,
				textTransform: 'uppercase',
				color: '#6b7280',
			},
		},
		rows: {
			style: {
				backgroundColor: 'white',
				'&:not(:last-of-type)': {
					borderBottom: '1px solid #e5e7eb',
				},
				'&:hover': {
					backgroundColor: '#f9fafb !important',
				},
			},
		},
		cells: {
			style: {
				paddingLeft: '1rem',
				paddingRight: '1rem',
				whiteSpace: 'nowrap',
			},
		},
	};

	return (
		<div className="bg-gray-100 p-4 w-[100%] items-center">
			<div className="flex justify-between w-full">
				<h2 className="text-black-xl font-bold mb-4 title-size">Transferts</h2>
				<div className="flex items-center">
				</div>
			</div>
			<div className="transferts-table overflow-auto hide-scrollbar">
				{error ? (
					<div className="px-4 py-8 text-center">⚠️ {error}</div>
				) : (
					<DataTable
						columns={columns}
						data={data}
						progressPending={loading}
						progressComponent={<div className="px-4 py-8 text-center">Chargement...</div>}
						noDataComponent={<div className="px-4 py-8 text-center">Aucun transfert trouvé</div>}
						customStyles={customStyles}
						highlightOnHover
						pointerOnHover
					/>
				)}
			</div>
		</div>
	);
}
