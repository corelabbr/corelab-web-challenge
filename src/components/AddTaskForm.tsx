import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, Palette, Star } from 'lucide-react';
import { colorOptions } from "../constants/colors";

interface FormData {
  title: string;
  description: string;
  color: string;
  isFavorite: boolean;
}

interface AddTaskFormProps {
  onAdd: (data: FormData) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    color: '#ffffff',
    isFavorite: false,
  });

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      setFormData({
        title: '',
        description: '',
        color: '#ffffff',
        isFavorite: false,
      });
    }
  };

  const handleColorSelect = (color: string): void => {
    setFormData({ ...formData, color });
  };

  const handleToggleFavorite = (): void => {
    setFormData({ ...formData, isFavorite: !formData.isFavorite });
  };

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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Cor:</label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowColorPicker(!showColorPicker)}
                aria-label="Selecionar cor da tarefa"
              >
                <Palette className="w-5 h-5 text-gray-600" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleToggleFavorite}
                aria-label="Marcar como favorito"
              >
                <Star
                  className={`w-5 h-5 ${formData.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
                />
              </Button>
            </div>
          </div>
          {showColorPicker && (
            <div className="flex flex-wrap gap-2 mt-2">
              {colorOptions.map((color: string) => (
                <button
                  key={color}
                  type="button"
                  className={`w-6 h-6 rounded-full border-2 ${
                    formData.color === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`Selecionar cor ${color}`}
                />
              ))}
            </div>
          )}
          
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