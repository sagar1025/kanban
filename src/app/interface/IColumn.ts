import ITask from "./ITask";

export default interface IColumn {
    id: number;
    name: string;
    tasks?: Array<ITask>;
}