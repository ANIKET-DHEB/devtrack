import "../styles/MyTasks.css";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

function MyTasks() {
  const { tasks } = useTasks();

  return (
    <div className="my-tasks">
      <h1>My Tasks</h1>

      <p>View and manage all your tasks.</p>

      <div className="my-tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              priority={task.priority}
              dueDate={task.dueDate}
              status={task.status}
            />
          ))
        ) : (
          <div className="no-tasks">
            <h3>No tasks available</h3>

            <p>
              Add a task from the Dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;