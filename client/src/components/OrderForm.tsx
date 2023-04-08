import React, { useState } from 'react';
import { Order } from '../types/Order';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [sum, setSum] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      orderNumber,
      title,
      position,
      sum: sum ? sum : 0,
    };

    onSubmit(newOrder);

    setOrderNumber('');
    setTitle('');
    setPosition('');
    setSum(undefined);
  };

  return (
    <form  className="orderForm" onSubmit={handleSubmit}>
      <label htmlFor="orderNumber">Order Number:</label>
      <input
        id="orderNumber"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />

      <label htmlFor="title">Titel:</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="position">Position:</label>
      <input
        id="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <label htmlFor="sum">Summe:</label>
      <input
        id="sum"
        type="number"
        value={sum || ''}
        onChange={(e) => setSum(Number(e.target.value))}
      />

      <button type="submit">Hinzufügen</button>
    </form>
  );
};

export default OrderForm;
