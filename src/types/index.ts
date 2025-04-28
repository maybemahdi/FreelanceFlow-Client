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
