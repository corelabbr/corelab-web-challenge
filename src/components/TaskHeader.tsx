import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface TaskHeaderProps {
  task: {
    title: string;
    isFavorite?: boolean;
  };
  isEditing: boolean;
  title: string;
  setTitle: (title: string) => void;
  onToggleFavorite: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task, isEditing, title, setTitle, onToggleFavorite }) => (
  <div className="flex items-start justify-between">
    {isEditing ? (
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full font-semibold text-lg border-b border-gray-300 focus:outline-none bg-transparent"
        autoFocus
      />
    ) : (
      <h3 className="font-semibold text-lg leading-tight">{task.title}</h3>
    )}
    <Button onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }} variant="ghost" size="sm" className="p-1 h-auto">
      <Star className={`w-5 h-5 ${task.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`} />
    </Button>
  </div>
);

export default TaskHeader;