export interface INote {
  _id?: string;
  title: string;
  body: string;
  colorId: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  updateTimestamp?: boolean;
}
