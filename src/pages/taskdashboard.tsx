import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../css/taskdashboard.css';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Task>({
    id: 0,
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    due_date: '',
  });

  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      // Attach token to axios headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/');
      console.log('Fetched tasks:', res.data);

      // Use the results array from paginated response
      const data = res.data.results || [];
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks', err);
      navigate('/login');
    }
  };


  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}/`);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setFormData(task);
    setShowForm(true);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/tasks/${formData.id}/`, formData);
      } else {
        await api.post('/tasks/', formData);
      }
      setShowForm(false);
      setFormData({ id: 0, title: '', description: '', priority: 'medium', status: 'todo', due_date: '' });
      fetchTasks(); // refresh list from backend
    } catch (err) {
      console.error('Error saving task', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // clear token
    delete api.defaults.headers.common['Authorization']; // remove header
    navigate('/login'); // redirect to login page
  };



  const filteredTasks = tasks.filter(task =>
    (statusFilter === 'all' || task.status === statusFilter) &&
    (priorityFilter === 'all' || task.priority === priorityFilter)
  );

  const summary = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <div className="dashboard">
      <h2>Task Manager</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="summary">
        <span className="badge">Total: {summary.total}</span>
        <span className="badge todo">Todo: {summary.todo}</span>
        <span className="badge progress">In Progress: {summary.inProgress}</span>
        <span className="badge done">Done: {summary.done}</span>
        <button className="new-task-btn" onClick={() => setShowForm(true)}>+ New Task</button>
      </div>

      {/* filters */}
      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* table */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-tasks">No tasks found</td>
            </tr>
          ) : (
            filteredTasks.map(task => (
              <tr key={task.id}>
                <td>
                  <strong>{task.title}</strong><br />
                  <small>{task.description}</small>
                </td>
                <td className={`priority ${task.priority}`}>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.due_date || '—'}</td>
                <td>
                  <button onClick={() => handleEdit(task)}>✏️</button>
                  <button className="delete" onClick={() => handleDelete(task.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* form */}
      {showForm && (
        <div className="task-form">
          <h3>{formData.id ? 'Edit Task' : 'New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
              <option>critical</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>todo</option>
              <option>in_progress</option>
              <option>done</option>
            </select>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;
