import ISubtask from "./ISubtask";

export default interface ITask {
    id: number;
    title: string;
    description?: string;
    subTasks?: Array<ISubtask>;
    columnId: number;
}