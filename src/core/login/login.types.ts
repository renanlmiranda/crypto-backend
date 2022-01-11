export interface iLoginBody {
  email: string;
  password: string;
}

export interface iToken {
  id: number;
  iat: string;
  exp: string;
}
