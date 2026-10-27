export interface Apparat {
  id: number;
  number: string;
  comment: string;
}

export interface Worker {
  id: number;
  surname: string;
  name: string;
  middleName: string;
  phone: string;
}

export interface SpareType {
  id: number;
  name: string;
}

export interface Spare {
  id: number;
  name: string;
  typeId: string;
}

export interface Provider {
  id: number;
  name: string;
  address: string;
  phone: string;
  isFl: boolean;
  isOurFirm: boolean;
}

export interface DealType {
  id: number;
  name: string;
}

export interface ServiceRecord {
  id: number;
  apparatNumber: string;
  changes: string;
  operations: string;
  worker: string;
  date: string;
}

export interface InstallationRecord {
  id: number;
  apparatNumber: string;
  spare: string;
  date: string;
  worker: string;
}

export interface Deal {
  id: number;
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  typeId: string;
  customerId: string;
  providerId: string;
}

export interface SpareOperation {
  id: number;
  count: string;
  dealId: string;
  spareId: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  status: string;
  comment: string;
}

export interface SessionUser {
  id: number;
  name: string;
  username: string;
  email: string;
  registeredAt: string;
}
