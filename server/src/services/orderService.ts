import Order from "../models/Order";

export const createOrder = async (orderData: Order) => {
  const order = new Order(orderData);
  await order.save();
  return order.toObject();
};

export const getAllOrders = async () => {
  const orders = await Order.find().lean();
  return orders;
};

export const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId).lean();
  return order;
};

export const updateOrder = async (
  orderId: string,
  orderData: Order
) => {
  console.log('orderData', orderData)
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    orderData,
    { new: true }
  ).lean();
  return updatedOrder;
};

export const deleteOrder = async (orderId: string) => {
  const deletedOrder = await Order.findByIdAndDelete(orderId).lean();
  return deletedOrder;
}