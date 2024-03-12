export interface CustomError {
  message: string;
  field: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
  isApproved: boolean;
  organization: Organization;
}

export interface Organization {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  name: string;
}
