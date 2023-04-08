import React from 'react';
import './App.css';
import EntityManagement from './views/EntityManagement';
import OrderManagement from './views/OrderManagement';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Entitäten-Verwaltung</h1>
      <EntityManagement />
      <h1>Bestullngs-Verwaltung</h1>
      <OrderManagement />
    </div>
  );
};

export default App;
