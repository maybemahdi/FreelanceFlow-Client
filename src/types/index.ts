/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProject {
  id: string;
  title: string;
  budget: number;
  deadline: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
  clientId: string;
  ownerId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IClient {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  company?: string;
  notes?: string;
  ownerId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  projects?: any;
}
