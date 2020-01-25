import { Step } from './models/step.model';
import { LearningPath, Operation } from './models/learning-path.model';

const defaultSteps: Step[] = [
    // Todo
];

export const defaultLearningPath: LearningPath = {
    id: 0,
    name: "Standard Lernpfad",
    createdAt: new Date(),
    isDefault: true,
    operation: Operation.KATARAKT,
    steps: defaultSteps
}