import React from 'react';
import './index.css';
import OrderManagement from './views/OrderManagement';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Bestellungen verwalten</h1>
      <OrderManagement />
    </div>
  );
};

export default App;
