import { useState } from 'react';
import { Fab, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddTaskDialog from '../dialogs/AddTaskDialog/AddTaskDialog';

const FloatingButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fab
        variant={isMobile ? "circular" : "extended"}
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpen}
      >
        <AddIcon />
        {!isMobile && <>Create Task</>}
      </Fab>
      {open && <AddTaskDialog open={open} onClose={handleClose} />}
    </>
  );
}

export default FloatingButton;
