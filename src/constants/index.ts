import { TaskStatus } from "../interfaces/Tasks"

export const TaskColors = [
  { label: "None", hex: "#FFF" },
  { label: "Soft Blue", hex: "#DBEAFE" },
  // { label: "Pale Indigo", hex: "#E0E7FF" },
  { label: "Mint Green", hex: "#D1FAE5" },
  { label: "Blush Pink", hex: "#FCE7F3" },
  { label: "Light Amber", hex: "#FEF3C7" },
  // { label: "Powder Cyan", hex: "#CFFAFE" },
  // { label: "Muted Gray", hex: "#F1F5F9" },
  // { label: "Cloud White", hex: "#F9FAFB" },
  { label: "Lilac Mist", hex: "#EDE9FE" },
  // { label: "Peach Cream", hex: "#FFECE3" },
  // { label: "Light Sage", hex: "#ECFDF5" },
  // { label: "Sky Tint", hex: "#E0F2FE" }
]

export const TaskStatusList = [
  { label: 'To do', value: TaskStatus.todo },
  { label: 'Doing', value: TaskStatus.doing },
  { label: 'Done', value: TaskStatus.done },
]