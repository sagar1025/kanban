import IColumn from "./IColumn";

export interface IBoard {
    id: number;
    name: string;
    columns?: Array<IColumn>;
}