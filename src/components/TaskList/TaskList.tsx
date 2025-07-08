import { Box } from '@mui/material';
import { ITask } from '../../interfaces/Tasks';
import TaskCard from '../TaskCard/TaskCard';

interface TaskListProps {
  tasks: ITask[]
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      overflow: 'visible',
    }}>
      {tasks.map((task, index) => <TaskCard {...task} key={index} />)}
    </Box>
  );
}

export default TaskList;
