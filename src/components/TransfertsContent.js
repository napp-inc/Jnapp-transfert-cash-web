// Composant parent DashboardContent.jsx
'use client';
import TransfertsNow from './TransferetsNow';

export default function DashboardContent() {
	return (
		<div className="sm:4/5 w-5/5 bg-gray-100 py-10 pl-10">
			<TransfertsNow />
		</div>
	);
}
