import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { createOrder, getAllOrders } from '../services/orderService';
import { Order } from '../types/Order';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

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

  return (
    <div className="orderManagement">
      <h2>Order Management</h2>
      <OrderForm onSubmit={handleCreateOrder} />
      <OrderList orders={orders} />
    </div>
  );
};

export default OrderManagement;
