export interface ICreateCustomerRequest {
  name: string;
  phone: string;
  alternatePhone?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
}