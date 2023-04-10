import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { createOrder, getAllOrders } from '../services/orderService';
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

  const handleCreateOrder = async (order: Order) => {
    const newOrder = await createOrder(order);
    setOrders([...orders, newOrder]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="orderManagement component">
      <h2>Betsellverwaltung: </h2>
      <button className="toggleOrderFormBtn" onClick={toggleForm}>{showForm ? 'X Fertig' : 'Bestellung anlegen'}</button>
      {showForm && <OrderForm onSubmit={handleCreateOrder} />}
      <OrderList orders={orders} />
    </div>
  );
};

export default OrderManagement;
