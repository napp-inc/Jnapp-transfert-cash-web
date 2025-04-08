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
            minWidth: '150px', // Largeur minimale pour éviter le troncage
            maxWidth: '500px', // Limite la largeur maximale si nécessaire
            paddingLeft: '1rem',
            paddingRight: '1rem',
            fontSize: '1rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#6b7280',
            textAlign: 'left', // Alignement du texte pour une meilleure lisibilité
            whiteSpace: 'nowrap', // Évite le retour à la ligne
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
            minWidth: '150px', // Largeur minimale pour éviter le troncage
            maxWidth: '300px', // Limite la largeur maximale si nécessaire
            paddingLeft: '1rem',
            paddingRight: '1rem',
            fontSize: '0.9rem', // Taille de police légèrement réduite pour économiser de l'espace
            whiteSpace: 'nowrap', // Évite le retour à la ligne
            textAlign: 'left', // Alignement du texte pour une meilleure lisibilité
        },
    },
};

export default customStyles;