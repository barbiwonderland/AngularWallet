export interface IUser {
  id: number;
  info: Info;
  accounts: Accounts;
}

export interface Accounts {
  pesos?: any;
  dolar: number;
}

export interface Info {
  password: string;
  user: string;
  email: string;
  name: string;
  surname: string;
}