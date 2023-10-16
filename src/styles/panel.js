const styles = {
  panel: {
    background: '#f6f6f6',
    border: '1px solid #e0e0e0',
    movesTable: {
      tableContainer: {
        height: 368,
      },
      tableCell: {
        "&:hover": {
          color: '#ffffff',
          background: '#3d8cd9',
          cursor: 'pointer',
        },
        currentMove: {
          color: '#ffffff',
          background: '#1976d2',
          fontWeight: 'bold',
        },
        nMove: {
          background: '#f6f6f6',
        },
      },
      tableRow: {
        background: '#ffffff',
      },
    },
    timer: {
      marginTop: 1.5,
      display: 'flex',
      justifyContent: 'center',
    },
  },
};

export default styles;
