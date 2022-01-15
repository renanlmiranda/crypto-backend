export interface iBodyCreateUser {
  name: string;
  last_name: string;
  password: string;
  email: string;
  status: string;
  role: string;
}

export interface iCreatedUser {
  id: number;
  name: string;
  last_name: string;
  password: string;
  email: string;
  status: string;
  role: string;
  created: Date;
}

export interface iUpdateUser {
  name: string;
  last_name: string;
  password: string;
  email: string;
}

export interface iUpdatePasswordUser {
  oldPassword: string;
  password: string;
}
