export interface IRegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IRegisterResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
}