export class UserModel {
  // tslint:disable-next-line: variable-name
  _id: string;
  username: string;
  token: string;
  refresh_token: string;
  salt: string;
  firstname: string;
  lastname: string;
  role: string;
  // tslint:disable-next-line: variable-name
  delation_date: string;
  createdAt: string;
  updatedAt: string;
  active: string;
  password: string;
}
export enum Role {
  cassa = 'cassa',
  cameriere = 'cameriere',
  cuoco = 'cuoco',
  barista = 'barista'
}
