import { API_URL } from "./api-config";

export const createOrder = async (orderData: any): Promise<any> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const getAllOrders = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/orders`);
  return response.json();
};

export const getOrderById = async (orderId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/orders/${orderId}`);
  return response.json();
};

export const updateOrder = async (
  orderId: string,
  orderData: any
): Promise<any> => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const deleteOrder = async (orderId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'DELETE',
  });
  return response.json();
};
