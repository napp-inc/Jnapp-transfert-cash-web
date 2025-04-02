const columns = (columsTable) => {
        const colonnes = columsTable.map(col => ({
            name: col,
            selector: row => row[col.toLowerCase().replace(/ /g, '_')] || '-',
            sortable: true,
            wrap: true
        }));
        return colonnes;
};

export default columns;