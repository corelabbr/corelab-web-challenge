import { useState } from 'react';
import { IconButton, Popover, List, ListItem, ListItemText, Box, ListItemButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ITask } from '../../interfaces/Tasks';
import { useDeleteTask, useUpdateStatus } from '../../hooks';
import { TaskColors, TaskStatusList } from '../../constants';
import EditTaskDialog from '../dialogs/EditTaskDialog/EditTaskDialog';

interface MoreOptionsPopoverProps extends ITask {
  updateColor: (id: number, color: string) => void;
}

enum ButtonActions {
  edit,
  delete,
  move,
  color
}

const MoreOptionsPopover = (props: MoreOptionsPopoverProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [mainAnchorEl, setMainAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);

  const task: ITask = {
    color: props.color,
    description: props.description,
    favorite: props.favorite,
    id: props.id,
    title: props.title,
    status: props.status
  }

  const deleteMutation = useDeleteTask();
  const statusMutation = useUpdateStatus();

  const { id, updateColor, status } = props;

  const handleClick = (event: any) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setColorAnchorEl(null);
    setStatusAnchorEl(null);
    setMainAnchorEl(null);
  };

  const handleOption = (option: number, event: any) => {
    switch (option) {
      case ButtonActions.edit: {
        setOpenEditDialog(true)
        break;
      }
      case ButtonActions.move: {
        setStatusAnchorEl(event.currentTarget);
        break;
      }
      case ButtonActions.delete: {
        deleteMutation.mutate({ id }, {
          onSuccess: () => handleClose()
        })
        break;
      }
      case ButtonActions.color: {
        setColorAnchorEl(event.currentTarget);
        break;
      }
    }
  }

  const handleColor = (id: number, color: string) => {
    updateColor(id, color);
    handleClose();
  }

  const handleStatus = (id: number, status: number) => {
    statusMutation.mutate({ id, status }, {
      onSuccess: () => handleClose()
    })
  }

  const handleEdit = () => {
    setOpenEditDialog(false);
    handleClose()
  }

  const openMain = Boolean(mainAnchorEl);
  const openColor = Boolean(colorAnchorEl);
  const openStatus = Boolean(statusAnchorEl);

  const options = [
    { label: 'Edit', value: ButtonActions.edit },
    { label: 'Delete', value: ButtonActions.delete },
    { label: 'Move', value: ButtonActions.move },
    { label: 'Color', value: ButtonActions.color },
  ];

  return (
    <>
      <IconButton aria-label="more options" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      {openEditDialog && <EditTaskDialog open={openEditDialog} onClose={handleEdit} task={task} />}

      {/* Main popover (submenu) */}
      <Popover
        open={openMain}
        anchorEl={mainAnchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List>
          {options.map((option) => (
            <ListItem component='button' key={option.value} onClick={(event) => handleOption(option.value, event)}>
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* Color popover (submenu) */}
      <Popover
        open={openColor}
        anchorEl={colorAnchorEl}
        onClose={() => setColorAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ minWidth: 120 }}>
          <List>
            {TaskColors.map((color) => (
              <ListItemButton key={color.label} onClick={() => handleColor(id, color.hex)}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    bgcolor: color.hex,
                    borderRadius: 0.5,
                    border: '1px solid #ccc',
                    mr: 1,
                  }}
                />
                <ListItemText primary={color.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Popover>

      {/* Status popover (submenu) */}
      <Popover
        open={openStatus}
        anchorEl={statusAnchorEl}
        onClose={() => setStatusAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ minWidth: 120 }}>
          <List>
            {TaskStatusList.filter(item => item.value !== status).map((taskStatus) => (
              <ListItemButton key={taskStatus.label} onClick={() => handleStatus(id, taskStatus.value)}>
                <ListItemText primary={taskStatus.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
}

export default MoreOptionsPopover;