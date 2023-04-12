import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { getAllOrders } from '../services/orderService';
import { Order } from '../types/Order';

const OrderManagement: React.FC = () => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getAllOrders();
      const filteredOrders = fetchedOrders.filter(order => !order.title.includes('(gelöscht)'));
      setOrders(fetchedOrders);
      setFilteredOrders(filteredOrders)
    };

    fetchOrders();
  }, []);

  const handleCreateOrder = async (newOrder: Order) => {
    setOrders([...orders, newOrder]);
    updateOrders();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleUpdatedOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    updateOrders();
  };

  const toggleDeletedOrders = () => {
    setShowDeleted(!showDeleted);
  };

  const updateOrders = async () => {
    const fetchedOrders = await getAllOrders();
    const filteredOrders = fetchedOrders.filter(order => !order.title.includes('(gelöscht)'));
    setOrders(fetchedOrders);
    setFilteredOrders(filteredOrders)
  };

  return (
    <div className="orderManagement component">
      <h2>Betsellverwaltung und -übersicht: </h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
      <button className="toggleOrderFormBtn" onClick={toggleForm}>{showForm ? 'X Fertig' : 'Bestellung anlegen'}</button>
      {showForm && <OrderForm onSubmit={handleCreateOrder} />}

      <OrderList orders={showDeleted ? orders : filteredOrders} onUpdateOrders={handleUpdatedOrders} />

      <div className="filterBox">
        <label htmlFor="deletedOrders">Gelöschte Bestellungen anzeigen:</label>
        <input type="checkbox" id="deletedOrders" checked={showDeleted} onChange={toggleDeletedOrders} />
      </div>
    </div>
  );
};

export default OrderManagement;
