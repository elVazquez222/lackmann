import { Router } from 'express';
import * as orderService from '../services/orderService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

router.get('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
});

router.put('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await orderService.updateOrder(orderId, req.body);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

router.delete('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (deletedOrder) {
      res.json(deletedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

export default router;
