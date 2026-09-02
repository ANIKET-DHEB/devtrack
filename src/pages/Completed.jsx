import "../styles/Completed.css";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

function Completed() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div className="completed-page">
      <h1>Completed Tasks</h1>

      <p>
        View all the tasks you have completed.
      </p>

      <div className="completed-list">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
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
          <div className="no-completed-tasks">
            <h3>No completed tasks</h3>

            <p>
              Complete a task from the Dashboard
              and it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Completed;