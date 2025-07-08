import { useEffect, useState } from 'react';

import { Tabs, Tab, Box, Typography, useMediaQuery, Divider } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import { useTasksQuery } from './hooks';
import { ActionButton, FilterButton, TabPanel, TaskList } from './components';
import { ITasksQueryParams, TaskStatus } from './interfaces/Tasks';

const App = () => {
  const [filter, setFilter] = useState<ITasksQueryParams>({ color: undefined, favorite: undefined, search: undefined });
  const { data, isLoading, error, refetch } = useTasksQuery(filter);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    refetch();
  }, [filter]);

  const handleFilter = (updatedFilter: ITasksQueryParams) => {
    setFilter(updatedFilter);
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginX: 4 }}>
        <Typography variant="h6" component="h2">
          To-do list App
        </Typography>
        <FilterButton onApply={handleFilter} />
      </Box>
      {isMobile && <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="To do" />
          <Tab label="Doing" />
          <Tab label="Done" />
        </Tabs>
        <TabPanel value={value} index={TaskStatus.todo}>
          <TaskList tasks={data!.results.filter(task => task.status === TaskStatus.todo)} />
        </TabPanel>
        <TabPanel value={value} index={TaskStatus.doing}>
          <TaskList tasks={data!.results.filter(task => task.status === TaskStatus.doing)} />
        </TabPanel>
        <TabPanel value={value} index={TaskStatus.done}>
          <TaskList tasks={data!.results.filter(task => task.status === TaskStatus.done)} />
        </TabPanel>
      </Box>}
      {!isMobile && <Box sx={{ width: '100%', display: 'flex', paddingX: 4, marginBottom: 6, boxSizing: 'border-box', maxHeight: 'calc(100vh - 64px)', overflow: 'scroll' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography>To do</Typography>
          <TaskList tasks={data!.results.filter(task => task.status === TaskStatus.todo)} />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography>Doing</Typography>
          <TaskList tasks={data!.results.filter(task => task.status === TaskStatus.doing)} />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography>Done</Typography>
          <TaskList tasks={data!.results.filter(task => task.status === TaskStatus.done)} />
        </Box>

      </Box>}
      <ActionButton />
    </ThemeProvider>
  );
}

export default App;
