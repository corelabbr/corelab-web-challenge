import { create } from "zustand";

//Post Task Store
type IPostTask = {
  postTask: ITask;
  setPostTaskTitle: (title: string) => void;
  setPostTaskContent: (content: string) => void;
  setPostTaskIsFavorite: (state: boolean) => void;
  clearPostTask: () => void;
};

export const usePostTask = create<IPostTask>((set) => ({
  postTask: {
    title: "",
    content: "",
    isFavorite: false,
    colorId: 1,
  },
  setPostTaskTitle: (value: string) => set((state) => ({ postTask: { ...state.postTask, title: value } })),
  setPostTaskContent: (value: string) => set((state) => ({ postTask: { ...state.postTask, content: value } })),
  setPostTaskIsFavorite: (value: boolean) => set((state) => ({ postTask: { ...state.postTask, isFavorite: value } })),
  clearPostTask: () => set({ postTask: { content: "", isFavorite: false, title: "", colorId: 1 } }),
}));

//Task Store
export type IUpdateTaskFn = (id: number, updatedTask: Partial<ITask>) => void;
type ITaskStore = {
  tasks: ITask[];
  setTasks: (newTask: ITask[]) => void;
  addTask: (task: ITask) => void;
  updateTask: IUpdateTaskFn;
  removeTask: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useTasksStore = create<ITaskStore>((set) => ({
  tasks: [],
  setTasks: (newTasks) => set({ tasks: newTasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
    })),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));

// Color Store
type IColorStore = {
  colors: IColor[];
  setColors: (color: IColor[]) => void;
};

export const useColorStore = create<IColorStore>((set) => ({
  colors: [],
  setColors: (color: IColor[]) => set({ colors: color }),
}));
