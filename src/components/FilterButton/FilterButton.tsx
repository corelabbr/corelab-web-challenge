import { useState } from "react";
import { Fab, IconButton, useMediaQuery, useTheme } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterDialog } from "../dialogs/FilterDialog/FilterDialog";
import { ITasksQueryParams } from "../../interfaces/Tasks";

interface FilterButtonProps {
  onApply: ({ color, favorite, search }: ITasksQueryParams) => void;
}

const FilterButton = ({ onApply }: FilterButtonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  return (
    <>
      {isMobile && <IconButton
        color="secondary"
        sx={{
          backgroundColor: 'white',
          boxShadow: 3,
          '&:hover': { backgroundColor: 'white' },
        }}
        onClick={() => setOpen(true)}
      >
        <FilterListIcon />
      </IconButton>}

      {!isMobile && <Fab
        variant="extended"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        <FilterListIcon />
        {!isMobile && <>Filter Tasks</>}
      </Fab>}

      {open && <FilterDialog open={open} onClose={() => setOpen(false)} onApply={onApply} />}
    </>
  )
}

export default FilterButton;