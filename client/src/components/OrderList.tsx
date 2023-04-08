import React from 'react';
import { Order } from '../types/Order';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order._id || order.orderNumber}>
          <strong>Order Number:</strong> {order.orderNumber} | <strong>Title:</strong> {order.title} | <strong>Position:</strong> {order.position} | <strong>Sum:</strong> {order.sum}
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
