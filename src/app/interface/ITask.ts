
export default interface ITask {
    id: number;
    title: string;
    description?: string;
    //TO DO - subTasks array
    columnId: number;
}