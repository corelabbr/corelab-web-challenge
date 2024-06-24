import { CustomColorKey } from "@/utils/customColors";

export interface CardProps {
  id?: number;
  title: string;
  favorite: boolean;
  description: string;
  color: string;
}

export interface CardComponentProps extends CardProps {
  index: number;
  isEditing: boolean;
  isColorPickerOpen: boolean;
  onColorPickerToggle: () => void;
  onCloseColorPicker: () => void;
  onEditToggle: () => void;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  onFavoriteToggle: () => void;
  onColorSelect: (color: CustomColorKey) => void;
  onDeleteTodo: () => void;
}
