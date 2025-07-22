import { useEffect, useState } from 'react'
import './App.css'
import { createTask, deleteTask, fetchTasks, updateTaskDone, type Task } from './api/tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks()
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await createTask(newTitle.trim());
      setNewTitle("");
      await loadTasks();
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  };


  return (
    <div className="min-h-screen bg-rose-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 font-sans tracking-tight">
      <h1 className="text-5xl font-semibold mb-10 text-center text-rose-600 dark:text-rose-300">
        ✧ My Tasks ✧
      </h1>

      {loading && (
        <p className="text-sm italic text-rose-500 dark:text-rose-300 mb-4">Loading your beautiful tasks…</p>
      )}
      {error && (
        <p className="text-rose-600 dark:text-rose-300 font-medium mb-4">Error: {error}</p>
      )}

      <ul className="space-y-5 mb-12">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-start justify-between bg-white dark:bg-gray-800 border border-rose-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={task.done}
                onChange={async (e) => {
                  try {
                    await updateTaskDone(task.id, e.target.checked);
                    await loadTasks();
                  } catch (err: any) {
                    setError(err.message || "Failed to update task");
                  }
                }}
                className="mt-1 h-5 w-5 text-rose-500 bg-rose-100 dark:bg-gray-700 border-gray-300 rounded-full focus:ring-rose-400"
              />
              <div>
                <p
                  className={`text-lg font-medium ${task.done
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-gray-100"
                    }`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Created: {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-sm text-rose-500 hover:text-rose-700 dark:hover:text-rose-300 transition underline underline-offset-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-5 py-3 border border-rose-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-xl placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 dark:hover:bg-rose-400 transition"
        >
          Save
        </button>
      </form>
    </div>

  );
}

export default App
