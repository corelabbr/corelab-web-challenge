import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import TaskHeader from "./TaskHeader";
import TaskActions from "./TaskActions";
import ColorPicker from "./ColorPicker";
import { colorOptions } from "../constants/colors";

type Task = {
  _id: string;
  title: string;
  description?: string;
  color?: string;
  isFavorite?: boolean;
};

type TaskCardProps = {
  task: Task;
  onUpdate: (id: string, updatedTask: Task) => void;
  onDelete: (id: string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [editedColor, setEditedColor] = useState(task.color || "transparent");
  const [showColors, setShowColors] = useState(false);

  const handleSave = () => {
    onUpdate(task._id, { ...task, title: editedTitle, description: editedDescription, color: editedColor });
    setIsEditing(false);
    setShowColors(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setEditedColor(task.color || "transparent");
    setIsEditing(false);
    setShowColors(false);
  };

  return (
    <Card
      className="w-full max-w-sm transition-all duration-200 hover:shadow-lg cursor-pointer"
      style={{
        backgroundColor: editedColor === "transparent" ? "#fff" : editedColor,
        border: editedColor === "transparent" ? "1px solid #e5e7eb" : "none",
      }}
      onClick={() => setIsEditing(true)}
    >
      <CardContent className="p-4 space-y-3">
        <TaskHeader
          task={task}
          isEditing={isEditing}
          title={editedTitle}
          setTitle={setEditedTitle}
          onToggleFavorite={() => onUpdate(task._id, { ...task, isFavorite: task.isFavorite === undefined ? false : !task.isFavorite })}
        />

        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full text-sm border-b border-gray-300 focus:outline-none bg-transparent resize-none"
            rows={3}
          />
        ) : (
          task.description && <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
        )}

        {isEditing && (
          <div className="pt-3">
            <TaskActions
              showColors={showColors}
              onToggleColors={() => setShowColors(!showColors)}
              onDelete={() => onDelete(task._id)}
              onCancel={handleCancel}
              onSave={handleSave}
            />
            {showColors && (
              <ColorPicker
                colors={colorOptions}
                selected={editedColor}
                onSelect={setEditedColor}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;