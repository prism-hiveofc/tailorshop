export interface Customer {
  _id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  status: boolean;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  alternatePhone?: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  address: string;
}