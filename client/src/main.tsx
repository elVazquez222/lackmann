import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navigation from './components/Navigation';
import './index.css';
import EntityManagement from './views/EntityManagement';
import OrderManagement from './views/OrderManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <OrderManagement />,
  },
  {
    path: "/entities",
    element: <EntityManagement />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="app">
      <Navigation />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
