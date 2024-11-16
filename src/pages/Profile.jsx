import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLearning } from "../contexts/LearningContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useAuth();
  const { userProgress } = useLearning();
  const navigate = useNavigate();

  const calculateLevelStats = (level) => {
    // Pastikan nilai default diberikan jika userProgress atau data terkait kosong
    const completedLessons =
      userProgress?.completedLessons?.filter((lesson) =>
        lesson.startsWith(level)
      ) || [];

    const practiceScores =
      Object.values(userProgress?.practiceScores || {}).filter(([key]) =>
        key.startsWith(level)
      ) || [];

    const totalPractices = practiceScores.length;
    const passingPractices = practiceScores.filter(
      ([_, score]) => score >= 70
    ).length;

    const averageScore =
      totalPractices > 0
        ? practiceScores.reduce((acc, [_, score]) => acc + score, 0) /
          totalPractices
        : 0;

    const bestScore =
      totalPractices > 0
        ? Math.max(...practiceScores.map(([_, score]) => score))
        : 0;

    const progressPercent = Math.round(
      userProgress?.levelProgress?.[level] || 0
    );

    return {
      completedLessons: completedLessons.length,
      totalPractices,
      passingPractices,
      averageScore: Math.round(averageScore),
      bestScore: Math.round(bestScore),
      progressPercent,
    };
  };

  const getLevelStatus = (level, stats) => {
    if (stats.progressPercent >= 100) return "Mastered";
    if (stats.progressPercent >= 70) return "Advanced";
    if (stats.progressPercent >= 40) return "In Progress";
    if (stats.progressPercent > 0) return "Started";
    return "Not Started";
  };

  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Learning Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          Current Level: {userProgress?.currentLevel || "N/A"}
        </p>
      </div>

      {/* Overall Progress Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <div className="mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold">Overall Progress</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{
                  width: `${Math.round(
                    userProgress?.levelProgress?.[userProgress.currentLevel] ||
                      0
                  )}%`,
                }}
              />
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600">
            {Math.round(
              userProgress?.levelProgress?.[userProgress.currentLevel] || 0
            )}
            %
          </span>
        </div>
      </div>

      {/* Level Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["beginner", "intermediate", "advanced"].map((level) => {
          const stats = calculateLevelStats(level);
          const status = getLevelStatus(level, stats);

          return (
            <div
              key={level}
              className="overflow-hidden bg-white rounded-lg shadow"
            >
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold capitalize">{level}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      status === "Mastered"
                        ? "bg-green-100 text-green-800"
                        : status === "Advanced"
                        ? "bg-blue-100 text-blue-800"
                        : status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : status === "Started"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{stats.progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${stats.progressPercent}%` }}
                    />
                  </div>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-lg font-semibold">
                      {stats.completedLessons} Lessons
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Passing Practices</p>
                    <p className="text-lg font-semibold">
                      {stats.passingPractices}/{stats.totalPractices}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Avg. Score</p>
                    <p className="text-lg font-semibold">
                      {stats.averageScore}%
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Best Score</p>
                    <p className="text-lg font-semibold">{stats.bestScore}%</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>;
};

export default Profile;
