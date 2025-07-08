import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, MenuItem } from '@mui/material';
import { TaskColors, TaskStatusList } from '../../../constants';
import { useCreateTask } from '../../../hooks';
interface AddTaskDialogProps {
  open: boolean,
  onClose: () => void
}

const AddTaskDialog = ({ open, onClose }: AddTaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(TaskStatusList[0].value);
  const [color, setColor] = useState(TaskColors[0].hex);
  const createMutation = useCreateTask();

  const handleSave = () => {
    createMutation.mutate({
      description,
      status,
      title,
      color
    }, { onSuccess: () => onClose() })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskDialog;