
export default function columns(columsTable) {
    const colonnes = columsTable.map(col => ({
        name: col,
        selector: row => row[col.toLowerCase()] || '-',
        sortable: true,
        wrap: true
    }));
    
    return colonnes;
};