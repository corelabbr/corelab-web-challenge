import { prisma } from "../lib/prisma";
import { CreateTaskParams, ITask } from "../types/task.type";

export default class TaskServices {
  static async getAllTasks() {
    const tasks = await prisma.task.findMany({
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        color: true,
        favorite: true,
      }
    });

    const favoriteTasks = tasks.filter(task => task.favorite);
    const othersTasks = tasks.filter(task => !task.favorite);

    return { favoriteTasks, othersTasks }
  }

  static async findTaskById(id: number) {
    return await prisma.task.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        color: true,
        favorite: true,
      }
    });
  }

  static async createTask({ title, content, color_id, favorite }: CreateTaskParams) {
    return await prisma.task.create({
      data: {
        title: title,
        content: content,
        color_id,
        favorite
      },
      select: {
        id: true,
        title: true,
        content: true,
        color: true,
        favorite: true,
      }
    });
  }

  static async updateTask({ id, title, content, color }: ITask) {
    return await prisma.task.update({
      data: {
        title,
        content,
        color_id: color,
      },
      where: {
        id,
      },
      select:{
        color: true,
        content: true,
        favorite: true,
        id: true,
        title: true,
        color_id: true,
      }
    });
  }

  static async deleteTask(id: number) {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }

  static async toggleFavorite(id: number) {
    const getFavoriteValue = await prisma.task.findFirst({
      where: {
        id,
      },
      select: {
        favorite: true,
      },
    });

    await prisma.task.update({
      data: {
        favorite: !getFavoriteValue?.favorite,
      },
      where: {
        id,
      },
    });
  }

  static async getAllFavorites(){
    return await prisma.task.findMany({
      where: {
        favorite: true
      },
      select: {
        title: true,
        content: true,
        color: true,
        favorite: true,
      }
    })
  }
}
