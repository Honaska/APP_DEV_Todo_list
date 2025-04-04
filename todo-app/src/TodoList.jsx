import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Create App.css for styling

const API_URL = 'http://127.0.0.1:8000/posts/'; // Replace with your API URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', content: '', completed: false });
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(API_URL, newTask);
      fetchTasks();
      setNewTask({ title: '', content: '', completed: false });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async () => {
    try {
      await axios.put(`${API_URL}${editTask.id}/`, editTask);
      fetchTasks();
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>To Do List</h1>

      <button onClick={handleToggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                if (editTask && editTask.id === task.id) {
                    setEditTask({...editTask, completed: e.target.checked})
                } else {
                  setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: e.target.checked } : t)));
                }
              }}
            />
            {editTask && editTask.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editTask.content}
                  onChange={(e) => setEditTask({ ...editTask, content: e.target.value })}
                />
                <button onClick={updateTask}>Save</button>
                <button onClick={() => setEditTask(null)}>Cancel</button>
              </div>
            ) : (
              <span>
                {task.title} - {task.content}
                <button onClick={() => setEditTask({ ...task })}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;