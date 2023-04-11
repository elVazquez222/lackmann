import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { getAllOrders } from '../services/orderService';
import { Order } from '../types/Order';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const handleCreateOrder = async (newOrder: Order) => {
    setOrders([...orders, newOrder]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="orderManagement component">
      <h2>Betsellverwaltung und -übersicht: </h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
      <button className="toggleOrderFormBtn" onClick={toggleForm}>{showForm ? 'X Fertig' : 'Bestellung anlegen'}</button>
      {showForm && <OrderForm onSubmit={handleCreateOrder} />}
      <OrderList orders={orders} />
    </div>
  );
};

export default OrderManagement;
