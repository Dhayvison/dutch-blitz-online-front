import * as React from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

function App() {
  React.useEffect(() => {
    const socket = socketIOClient('http://localhost:3333/');
  }, []);

  return (
    <h1>Hola</h1>
  );
}

export default App;
