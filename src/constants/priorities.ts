export interface PriorityOption {
  value: number;
  color: string;
  label: string;
  bgColor: string;
  textColor: string;
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    value: 0,
    color: "#cccccc",
    label: "Sem Prioridade",
    bgColor: "#f8f9fa",
    textColor: "#666",
  },
  {
    value: 1,
    color: "#1976d2",
    label: "Baixa",
    bgColor: "#e3f2fd",
    textColor: "#1976d2",
  },
  {
    value: 2,
    color: "#388e3c",
    label: "Média",
    bgColor: "#e8f5e9",
    textColor: "#388e3c",
  },
  {
    value: 3,
    color: "#f57c00",
    label: "Alta",
    bgColor: "#fff3e0",
    textColor: "#f57c00",
  },
  {
    value: 4,
    color: "#d32f2f",
    label: "Urgente",
    bgColor: "#ffebee",
    textColor: "#d32f2f",
  },
  {
    value: 5,
    color: "#c2185b",
    label: "Crítica",
    bgColor: "#fce4ec",
    textColor: "#c2185b",
  },
];

export const PRIORITY_MAP: Record<number, PriorityOption> =
  PRIORITY_OPTIONS.reduce((map, option) => {
    map[option.value] = option;
    return map;
  }, {} as Record<number, PriorityOption>);
