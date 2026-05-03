import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";

import LandingPage from "./pages/LandingPage";
import {
  fetchDashboard,
  fetchMoodEntries,
  fetchSuggestion,
  saveMood,
} from "./features/mood/moodSlice";

import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "./features/tasks/taskSlice";

import SiteLayout from "./layouts/SiteLayout";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import MoodPage from "./pages/MoodPage";
import ReportsPage from "./pages/ReportsPage";
import TasksPage from "./pages/TasksPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { BrowserRouter } from "react-router-dom";

/* ================= AUTH GUARDS ================= */

const token = localStorage.getItem("token");
// Block pages if NOT logged in
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Block login/signup if already logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : children;
};

/* ================= APP ================= */

const App = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.items);
  const entries = useSelector((state) => state.mood.entries);
  const dashboard = useSelector((state) => state.mood.dashboard);
  const suggestion = useSelector((state) => state.mood.suggestion);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchMoodEntries());
    dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  }, [dispatch]);

  const handleAddTask = async (payload) => {
    await dispatch(addTask(payload));
   // dispatch(fetchDashboard());
  };

  const handleToggleTask = async (task) => {
    await dispatch(
      updateTask({
        id: task._id,
        data: { completed: !task.completed },
      })
    );
    //dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  };

  const handleDeleteTask = async (id) => {
    await dispatch(deleteTask(id));
   // dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  };

  const handleSaveMood = async (payload) => {
    await dispatch(saveMood(payload));
    dispatch(fetchMoodEntries());
   // dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  };

 const downloadWeeklyReport = () => {
  window.open(
    `${import.meta.env.VITE_API_URL}/api/reports/weekly`,
    "_blank"
  );
};

  return (
    
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* ================= MAIN LAYOUT ================= */}
        <Route element={<SiteLayout />}>

          {/* HOME */}

          {/* PROTECTED ROUTES */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <MoodPage entries={entries} onSaveMood={handleSaveMood} />
              </ProtectedRoute>
            }
          />

          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage dashboard={dashboard} suggestion={suggestion} />
    </ProtectedRoute>
  }
/>

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage onDownload={downloadWeeklyReport} />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    
  );
};

export default App;