import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { TaskDetailed } from "./pages/TaskDetailed";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Categories } from "./pages/Categories";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/:taskId" element={<TaskDetailed />} />
                <Route path="/categories" element={<Categories />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
