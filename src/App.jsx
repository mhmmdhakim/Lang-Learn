import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LearningProvider } from "./contexts/LearningContext";
import PrivateRoute from "./components/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lessons from "./pages/Lesson";
import LessonDetail from "./pages/LessonDetail";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import { Suspense } from "react";
import Profile from "./pages/Profile";
import Assignment from "./pages/Assignment";

function App() {
  return (
    <Router>
      <AuthProvider>
        <LearningProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes with authentication check */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lessons"
                element={
                  <PrivateRoute>
                    <Lessons />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lesson/:lessonId"
                element={
                  <PrivateRoute>
                    <LessonDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/practice/:practiceId"
                element={
                  <PrivateRoute>
                    <Practice />
                  </PrivateRoute>
                }
              />
              <Route
                path="/progress"
                element={
                  <PrivateRoute>
                    <Progress />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Progress />
                  </PrivateRoute>
                }
              />
              <Route
                path="/assignment"
                element={
                  <PrivateRoute>
                    <Progress />
                  </PrivateRoute>
                }
              />

              {/* Redirect unknown routes to landing for public users */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </LearningProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
