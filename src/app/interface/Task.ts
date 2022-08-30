import IColumn from "./IColumn";

export default interface ITask {
    id: number;
    title: string;
    description?: string;
    //TO DO - subTasks array
    status: IColumn;
}