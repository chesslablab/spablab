const styles = {
  panel: {
    background: '#f6f6f6',
  },
  movesTable: {
    table: {
      maxHeight: 300,
    },
    tableContainer: {
      height: 300,
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
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
