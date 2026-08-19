export type OrderStatus =
  | "PENDING"
  | "CUTTING"
  | "STITCHING"
  | "READY"
  | "DELIVERED";

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: {
    _id: string;
    name: string;
    phone: string;
  };
  deliveryDate: string;
  dressType: string;
  quantity: number;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  remarks?: string;
  status: OrderStatus;
}