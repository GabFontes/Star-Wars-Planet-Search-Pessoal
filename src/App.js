import React from 'react';
import './App.css';
import HeaderFilters from './components/Header';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <h1>Projeto Star Wars - Trybe</h1>
      <HeaderFilters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
