import React from 'react';
import { Order } from '../types/Order';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <table className="orderList">
      <thead>
        <tr>
          <th>Bestellnummer</th>
          <th>Titel</th>
          <th>Position</th>
          <th>Summe</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={`${order.orderNumber}_${Math.random()}`}>
            <td>{order.orderNumber}</td>
            <td>{order.title}</td>
            <td>{order.position}</td>
            <td>{order.sum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
