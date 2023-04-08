export interface Order {
  _id?: string;
  orderNumber: string;
  title: string;
  position: string;
  sum: number;
  applicant?: string;
  costCenter?: string;
  supplier?: string;
  priority?: string;
}