export interface ICreateOrderRequest {
  customerId: string;
  deliveryDate: Date;
  dressType: string;
  quantity: number;

  totalAmount: number;
  advanceAmount: number;

  remarks?: string;
}

export interface IOrder {
  orderNumber: string;

  customerId: string;

  orderDate: Date;
  deliveryDate: Date;

  dressType: string;
  quantity: number;

  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;

  status:
    | "PENDING"
    | "CUTTING"
    | "STITCHING"
    | "TRIAL"
    | "READY"
    | "DELIVERED";

  remarks?: string;

  createdBy: string;
  updatedBy: string;

  isDeleted: boolean;
  deletedAt?: Date | null;
}