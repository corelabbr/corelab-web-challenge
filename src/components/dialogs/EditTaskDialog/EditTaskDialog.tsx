import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, MenuItem } from '@mui/material';
import { TaskColors, TaskStatusList } from '../../../constants';
import { useUpdateTask } from '../../../hooks';
import { ITask } from '../../../interfaces/Tasks';

interface AddTaskDialogProps {
  task: ITask,
  open: boolean,
  onClose: () => void
}

const EditTaskDialog = ({ open, onClose, task }: AddTaskDialogProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [color, setColor] = useState(task.color);
  const updateMutation = useUpdateTask();

  const handleSave = () => {
    updateMutation.mutate({
      id: task.id,
      favorite: task.favorite,
      title,
      color,
      description,
      status,
    }, { onSuccess: () => onClose() })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task:</DialogTitle>
      <DialogContent sx={{
        minWidth: { sm: 200, md: 450 }
      }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
            fullWidth
          >{
              TaskStatusList.map((taskStatus, index) => <MenuItem value={taskStatus.value} key={index}>{taskStatus.label}</MenuItem>)
            }
          </TextField>
          <TextField
            select
            label="Tag"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
          >{
              TaskColors.map((color, index) => (
                <MenuItem value={color.hex} key={index}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      bgcolor: color.hex,
                      borderRadius: 0.5,
                      border: '1px solid #ccc',
                      mr: 1.5,
                      display: 'flex'
                    }}
                  />
                  {color.label}
                </MenuItem>
              ))
            }
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} autoFocus variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTaskDialog;