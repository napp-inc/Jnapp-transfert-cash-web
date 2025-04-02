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

export default customStyles;