export interface Color {
    id: string;
    name: string;
    hex: string;
  }
  
  export const DEFAULT_COLORS: Color[] = [
    { id: 'white', name: 'Branco', hex: '#FFFFFF' },
    { id: 'light-blue', name: 'Azul Claro', hex: '#BAE2FF' },
    { id: 'mint', name: 'Verde Menta', hex: '#B9FFDD' },
    { id: 'yellow', name: 'Amarelo Claro', hex: '#FFE8AC' },
    { id: 'peach', name: 'Pêssego', hex: '#FFCAB9' },
    { id: 'coral', name: 'Vermelho Coral', hex: '#F99494' },
    { id: 'sky', name: 'Azul Céu', hex: '#9DD6FF' },
    { id: 'lavender', name: 'Lavanda', hex: '#ECA1FF' },
    { id: 'lime', name: 'Verde Limão', hex: '#DAFF8B' },
    { id: 'orange', name: 'Laranja', hex: '#FFA285' },
    { id: 'light-gray', name: 'Cinza Claro', hex: '#CDCDCD' },
    { id: 'gray', name: 'Cinza', hex: '#979797' },
    { id: 'brown', name: 'Marrom', hex: '#A99A7C' },
  ]; 