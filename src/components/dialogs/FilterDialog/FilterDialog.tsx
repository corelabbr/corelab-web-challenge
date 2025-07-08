import { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { TaskColors } from '../../../constants';
import { ITasksQueryParams } from '../../../interfaces/Tasks';

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: ({ color, favorite, search }: ITasksQueryParams) => void;
}

export const FilterDialog: FC<FilterDialogProps> = ({ open, onClose, onApply }) => {
  const [search, setSearch] = useState('');
  const [color, setColor] = useState(TaskColors[0].hex);
  const [filterByColor, setFilterByColor] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const handleApply = () => {
    onApply({ search, color: filterByColor ? color : undefined, favorite: onlyFavorites ? true : undefined });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Tasks</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Search"
          fullWidth
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={filterByColor}
              onChange={(e) => setFilterByColor(e.target.checked)}
            />
          }
          label="Filter by color?"
        />

        {filterByColor && <TextField
          select
          label="Color"
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
        </TextField>}

        <FormControlLabel
          control={
            <Switch
              checked={onlyFavorites}
              onChange={(e) => setOnlyFavorites(e.target.checked)}
            />
          }
          label="Only favorites?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">Apply</Button>
      </DialogActions>
    </Dialog>
  );
};
