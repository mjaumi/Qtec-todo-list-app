'use client';

import { usePriorityContext } from '@/contexts/PriorityContext';
import { useTaskContext } from '@/contexts/TaskContext';
import DataNotFound from '../CommonComp/DataNotFound';
import AddTaskDiv from './AddTaskDiv';
import TaskCard from './TaskCard';

const TaskContainer = () => {
  // integration of context hooks here
  const { tasks } = useTaskContext();

  const { priority } = usePriorityContext();

  // function to filter task based on priority here
  const filterTaskByPriority = (task: Task) => {
    if (priority === '') {
      return true;
    }
    return task.priority === priority;
  };

  // rendering task container component here
  return (
    <section>
      <AddTaskDiv />

      <div className='space-y-4 mt-5'>
        {tasks.length ? (
          tasks.filter(filterTaskByPriority).length ? (
            tasks
              .filter(filterTaskByPriority)
              .sort((a, b) => b.taskId - a.taskId)
              .map((task) => <TaskCard key={task.taskId} task={task} />)
          ) : (
            <DataNotFound message='No Tasks Found!' />
          )
        ) : (
          <DataNotFound message='No Tasks Found!! Please, Add Some...' />
        )}
      </div>
    </section>
  );
};

export default TaskContainer;
