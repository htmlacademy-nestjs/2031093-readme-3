export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  dateRegistered: Date;
  avatar?: string;
}
