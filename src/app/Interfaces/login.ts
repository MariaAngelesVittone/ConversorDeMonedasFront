export interface Login {
  username: string;
  password: string;
}

export interface DecodedToken {
  sub: string;
  given_name: string;
  Rol: string;
  exp: number;
}
