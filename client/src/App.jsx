
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://student-assignment-tracker-api-yfpm.onrender.com/api/assignments";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    dueDate: "",
    priority: "Medium",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAssignments = async () => {
    try {
      const response = await axios.get(API);
      setAssignments(response.data);
      setError("");
    } catch {
      setError("Could not load assignments. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addAssignment = async (event) => {
    event.preventDefault();
    try {
      await axios.post(API, form);
      setForm({
        title: "",
        subject: "",
        dueDate: "",
        priority: "Medium",
      });
      setError("");
      await loadAssignments();
    } catch {
      setError("Could not add assignment. Check your entries and backend.");
    }
  };

  const toggleStatus = async (item) => {
    try {
      await axios.put(`${API}/${item._id}`, {
        status: item.status === "Completed" ? "Pending" : "Completed",
      });
      await loadAssignments();
    } catch {
      setError("Could not update assignment.");
    }
  };

  const deleteAssignment = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      await loadAssignments();
    } catch {
      setError("Could not delete assignment.");
    }
  };

  const completed = assignments.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <main className="app">
      <header className="hero">
        <div className="hero-icon">📚</div>
        <p className="eyebrow">STUDENT PRODUCTIVITY</p>
        <h1>Assignment Tracker</h1>
        <p className="subtitle">
          Keep your coursework organized, one task at a time.
        </p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span>Total assignments</span>
          <strong>{assignments.length}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{assignments.length - completed}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>
      </section>

      <section className="panel">
        <h2>＋ Add an assignment</h2>
        <form onSubmit={addAssignment} className="assignment-form">
          <label>
            Assignment title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. React project report"
              required
            />
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              required
            />
          </label>

          <label>
            Due date
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Priority
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <button className="add-button" type="submit">
            Add assignment
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>Your assignments</h2>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <div className="empty">
            <span>📝</span>
            <h3>No assignments yet</h3>
            <p>Add your first assignment using the form above.</p>
          </div>
        ) : (
          <div className="assignment-list">
            {assignments.map((item) => (
              <article className="assignment-card" key={item._id}>
                <div className="assignment-info">
                  <h3 className={item.status === "Completed" ? "done" : ""}>
                    {item.title}
                  </h3>
                  <p>{item.subject} · Due {item.dueDate}</p>
                  <div className="tags">
                    <span className={`priority ${item.priority.toLowerCase()}`}>
                      {item.priority} priority
                    </span>
                    <span className="status">{item.status}</span>
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="complete-button"
                    onClick={() => toggleStatus(item)}
                  >
                    {item.status === "Completed" ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteAssignment(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>Student Assignment Tracker · MERN Stack Project</footer>
    </main>
  );
}

export default App;
