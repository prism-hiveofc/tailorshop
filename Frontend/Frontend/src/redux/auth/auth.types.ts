export interface IUser {
  _id: string;
  username: string;
  email: string;
  phone: string;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;

  loading: boolean;

  error: string | null;
}