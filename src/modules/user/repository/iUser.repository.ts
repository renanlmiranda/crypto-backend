export interface iCreateBody {
  name: string;
  lastName: string;
  password: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
  created: Date;
  password: string;
}

export interface iUserPass {
  id: number;
  name: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
  created: Date;
  password: string;
}

export interface iUpdateUser {
  name?: string;
  lastName?: string;
  password?: string;
}

export interface iUpdatePassword {
  oldPassword: string;
  password: string;
}

export interface iUserRepository {
  create({ name, lastName, email, password }: iCreateBody): Promise<User>;
  update(id: number, body: iUpdateUser): Promise<User>;
  findOne(id: number): Promise<User>;
  findByEmail(email: string): Promise<iUserPass>;
  findByToken(token: string): Promise<iUserPass>;
}
