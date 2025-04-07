export interface TodoFiltersProps {
  selectedColor: string | null;
  showOnlyFavorites: boolean;
  onColorSelect: (color: string | null) => void;
  onFavoriteToggle: (showOnlyFavorites: boolean) => void;
} 