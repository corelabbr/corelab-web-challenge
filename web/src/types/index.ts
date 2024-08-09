export interface Color {
    id: number;
    name: string;
    code: string;
}

export interface Task {
    id: number;
    title: string;
    content: string;
    color: Color;
    favorite: boolean;
}

export interface CreateTaskParams{
    title: string;
    content: string;
    color_id?: number;
    favorite?: boolean;
}

export interface TasksData {
    favoriteTasks: Task[];
    othersTasks: Task[];
}
