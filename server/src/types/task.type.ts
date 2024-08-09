export interface CreateTaskParams{
    title: string;
    content: string;
    favorite?: boolean;
    color_id?: number;
}

export interface ITask{
    id: number;
    title: string;
    content: string;
    color?: number;
}