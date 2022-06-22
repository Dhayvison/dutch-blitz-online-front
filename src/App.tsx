import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Table from './pages/Table';

import './App.css';
import 'animate.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lobby />}></Route>
        <Route path='/game' element={<Table />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
