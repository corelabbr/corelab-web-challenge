import { Task } from '../../types/Task';

let dataTask: Task[] = [
  {
    id: '1',
    title: 'Dusicyon thous',
    body: 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    favorited: false,
    color: '#b9ffdd',
  },
  {
    id: '2',
    title: 'Echimys chrysurus',
    body: 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    favorited: true,
    color: '#ffffff',
  },
  {
    id: '3',
    title: 'Gyps bengalensis',
    body: 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    favorited: true,
    color: '#ffffff',
  },
  {
    id: '4',
    title: 'Macropus agilis',
    body: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    favorited: false,
    color: '#ffffff',
  },
  {
    id: '5',
    title: 'Ursus arctos',
    body: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    favorited: false,
    color: '#ffffff',
  },
];

class TaskService {
  getTasks(): Task[] {
    return dataTask;
  }

  addTask(task: Task): void {
    dataTask.push(task);
  }

  updateTask(newTask: Task): void {
    dataTask = dataTask.map((task) => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return task;
    });
  }

  deleteTask(id: string): void {
    dataTask = dataTask.filter((task) => task.id !== id);
  }
}

export default new TaskService();
