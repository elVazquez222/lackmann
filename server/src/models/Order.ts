import { Document, Schema, model } from 'mongoose';

interface Order extends Document {
  orderNumber: string;
  title: string;
  position: string;
  sum: number;
  deleted: boolean;
  applicant?: string;
  costCenter?: string;
  supplier?: string;
  priority?: string;
}

const orderSchema = new Schema<Order>({
  orderNumber: { type: String, required: true },
  title: { type: String, required: true },
  position: { type: String, required: true },
  sum: { type: Number, required: true },
  applicant: String,
  costCenter: String,
  supplier: String,
  priority: String,
});

const Order = model<Order>('Order', orderSchema);

export default Order;
