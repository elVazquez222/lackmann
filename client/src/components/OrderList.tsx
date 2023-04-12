import React from 'react';
import { updateOrder } from '../services/orderService';
import { Order } from '../types/Order';

interface OrderListProps {
  orders: Order[];
  onUpdateOrders: (newOrders: Order[]) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateOrders }) => {

  const deleteThisOrder = async (deletedOrder: Order) => {
    try {
      await updateOrder(deletedOrder._id!, {...deletedOrder, title: `(gelöscht)${deletedOrder.title}` });
      const updatedOrder = orders.filter(order => order._id! !== deletedOrder._id!);
      onUpdateOrders(updatedOrder);
    } catch (error) {
      console.error(`Error deleting order ${deletedOrder}: ${error}`);
    }
  };

  const getExtraClass = (order: Order) => {
    const extraClass = order.title.includes('(gelöscht)') ? 'deleted' : '';
    return extraClass;
  }

  return (
    <table className="orderList">
      <thead>
        <tr>
          <th>Bestellnummer</th>
          <th>Titel</th>
          <th>Position</th>
          <th>Summe</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={`${order.orderNumber}_${Math.random()}`} className={getExtraClass(order)}>
            <td>{order.orderNumber}</td>
            <td>{order.title}</td>
            <td>{order.position}</td>
            <td style={{textAlign: 'right'}}>{order.sum}€</td>
            <td title="löschen" className="deleteIcon" style={{textAlign: 'center'}} onClick={() => deleteThisOrder(order)}>X</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
