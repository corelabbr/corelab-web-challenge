import { Box, Typography } from '@mui/material';
import { ITask } from '../../interfaces/Tasks';
import FavoriteToggle from '../FavoriteToggle/FavoriteToggle';
import MoreOptionsPopover from '../MoreOptionsPopover/MoreOptionsPopover';
import { useUpdateColor } from '../../hooks';
import { useState } from 'react';

interface TaskCardProps extends ITask { }

const TaskCard = (props: TaskCardProps) => {
  const { color, title, description, id, favorite } = props;
  const colorMutation = useUpdateColor();
  const [selectedColor, setSelectedColor] = useState(color);

  const updateColor = (id: number, color: string) => {
    colorMutation.mutate({ id, color }, {
      onSuccess: () => {
        setSelectedColor(color)
      }
    })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      bgcolor: selectedColor,
      boxShadow: 3,
      p: 2,
      borderRadius: 2,
    }}>
      <Box sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center'
      }}>
        <MoreOptionsPopover updateColor={updateColor}
          {...props} />
        <FavoriteToggle taskId={id} isFavorite={favorite} />
        <Typography variant="body1" component="span">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" component="span">
        {description}
      </Typography>
    </Box>
  );
}

export default TaskCard;
