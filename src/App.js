import Chess from 'features/Chess';

const App = () => {
  return (
    <Chess
      props={{
        api: {
          prot: 'https',
          host: 'pchess.net',
          port: '443'
        },
        ws: {
          prot: 'wss',
          host: 'pchess.net',
          port: '8443'
        }
      }}
    />
  );
}

export default App;
