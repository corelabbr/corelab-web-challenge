import { Button } from "./ui/button";
import { Trash2, Palette } from "lucide-react";

interface TaskActionsProps {
  showColors: boolean;
  onToggleColors: () => void;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ showColors, onToggleColors, onDelete, onCancel, onSave }) => (
  <div className="flex items-center justify-between">
    <div className="flex gap-3">
      <Button onClick={(e) => { e.stopPropagation(); onToggleColors(); }} variant="ghost" size="icon" className="text-gray-500 hover:text-gray-800">
        <Palette className="w-5 h-5" />
      </Button>
      <Button onClick={(e) => { e.stopPropagation(); onDelete(); }} variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
    {!showColors && (
      <div className="flex gap-2">
        <Button onClick={(e) => { e.stopPropagation(); onCancel(); }} variant="ghost" size="sm">Cancel</Button>
        <Button onClick={(e) => { e.stopPropagation(); onSave(); }} size="sm" className="bg-black text-white hover:bg-gray-800">Save</Button>
      </div>
    )}
  </div>
);

export default TaskActions;

