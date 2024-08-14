interface IApiResponse {
  isOk: Boolean;
  message: string;
  data: any;
}

interface ITask {
  id?: number;
  title: string;
  content: string;
  isFavorite: boolean;
  colorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type IColor = {
  id: number;
  color: string;
  value: string;
};
