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

export interface IInteraction {
  id: string;
  date: string;
  type: "CALL" | "EMAIL" | "MEET" | "CHAT";
  notes?: string | null;
  projectId: string;
  clientId: string;
  ownerId?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  project?: {
    id: string;
    title: string;
  };
  client?: {
    id: string;
    name: string;
  };
  owner?: {
    id: string;
    name: string;
  } | null;
}


// types.ts
export interface IReminder {
  id: string;
  date: string;
  message: string;
  clientId?: string | null;
  projectId?: string | null;
  ownerId?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    name: string;
  } | null;
  project?: {
    id: string;
    title: string;
  } | null;
  owner?: {
    id: string;
    name: string;
  } | null;
}