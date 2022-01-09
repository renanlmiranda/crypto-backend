export interface iLoginBody {
  username: string;
  password: string;
}

export interface iToken {
  id: number;
  iat: string;
  exp: string;
}
