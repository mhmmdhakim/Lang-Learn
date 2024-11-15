import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useLearning } from "../contexts/LearningContext";
import { Globe, User } from "lucide-react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { userProgress } = useLearning();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/landing");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* User Progress Overview */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-gray-500">Current Level</p>
                <p className="text-2xl font-bold text-blue-600 capitalize">
                  {userProgress.currentLevel}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    userProgress.levelProgress?.[userProgress.currentLevel] || 0
                  )}
                  %
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Completed Lessons</p>
                <p className="text-2xl font-bold text-blue-600">
                  {userProgress.completedLessons?.length || 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Object.values(userProgress.practiceScores || {}).reduce(
                    (a, b) => a + b,
                    0
                  ) /
                    (Object.values(userProgress.practiceScores || {}).length ||
                      1)}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Main Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Lessons Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Lessons
                </h3>
                <p className="text-gray-600 mb-4">
                  Access structured language lessons based on your level.
                </p>
                <Link
                  to="/lessons"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to Lessons
                </Link>
              </div>
            </div>

            {/* Assignments Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Assignments
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete your assigned exercises and tasks.
                </p>
                <Link
                  to="/assignment"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  View Assignments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
