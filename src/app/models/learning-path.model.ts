import { Step } from "./step.model";

export enum Operation {
  KATARAKT = "Katarakt"
}

export interface LearningPath {
  id: number;
  createdAt: Date;
  name: string;
  operation: Operation;
  isDefault: boolean;
  steps: Step[];
}
