export interface TodoListInterface {
    id: number;
    title: string;
    notes: string;
    color: string;
    favorited: boolean;
    className?: string; // Adicionei a propriedade className para permitir a personalização de classes CSS em alguns componentes
}