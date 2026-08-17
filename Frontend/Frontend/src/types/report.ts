export interface DailyRevenue {
  _id: null;
  totalRevenue: number;
  totalPayments: number;
}

export interface MonthlyRevenue {
  _id: null;
  totalRevenue: number;
  totalPayments: number;
}

export interface ReportOrder {
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
  status: string;
  remarks: string;
  createdAt: string;
}