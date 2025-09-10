export interface Task {
  _id: string;
  name: string;
  description?: string;
  color?: number;
  favorite?: boolean;
  complete?: boolean;
  startDate: Date;
  endDate?: Date | null;
  __v?: number;
}
