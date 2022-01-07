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
  last_name: string;
  password: string;
  email: string;
  status: string;
  role: string;
  created_at: Date;
}
