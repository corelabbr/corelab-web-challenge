import React, { useState } from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Plus } from 'lucide-react';

type FormData = {
  title: string;
  description?: string;
  color: string;
  isFavorite: boolean;
};

type AddTaskFormProps = {
  onAdd: (data: FormData) => void;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    color: "#ffffff",
    isFavorite: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      setFormData({
        title: "",
        description: "",
        color: "#ffffff",
        isFavorite: false,
      });
    }
  };

  const colorOptions: string[] = [
    '#ffffff', '#ffeb3b', '#4caf50', '#2196f3', 
    '#ff9800', '#e91e63', '#9c27b0', '#607d8b'
  ];

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Título da tarefa"
              required
              className="font-semibold"
            />
          </div>
          
          <div>
            <Textarea
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descrição (opcional)"
              rows={3}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Cor:</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-6 h-6 rounded-full border-2 ${
                    formData.color === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Tarefa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;