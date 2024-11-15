import React from "react";
import { useLearning } from "../contexts/LearningContext";
import { Link } from "react-router-dom";

export default function Progress() {
  const { userProgress } = useLearning();

  const calculateTotalProgress = () => {
    const { levelProgress } = userProgress;
    const weights = { beginner: 0.4, intermediate: 0.3, advanced: 0.3 };
    return Object.entries(levelProgress)
      .reduce((total, [level, progress]) => {
        return total + progress * weights[level];
      }, 0)
      .toFixed(1);
  };

  const getCompletedLessonsByLevel = (level) => {
    return userProgress.completedLessons.filter((lessonId) =>
      lessonId.startsWith(level)
    ).length;
  };

  const getAverageScore = (level) => {
    const levelLessons = userProgress.completedLessons.filter((lessonId) =>
      lessonId.startsWith(level)
    );

    if (levelLessons.length === 0) return 0;

    const totalScore = levelLessons.reduce(
      (sum, lessonId) => sum + (userProgress.practiceScores[lessonId] || 0),
      0
    );
    return (totalScore / levelLessons.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Overview Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Learning Progress Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Total Progress
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {calculateTotalProgress()}%
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Current Level
                  </h3>
                  <p className="text-3xl font-bold text-green-600 capitalize">
                    {userProgress.currentLevel}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    Completed Lessons
                  </h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {userProgress.completedLessons.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["beginner", "intermediate", "advanced"].map((level) => (
              <div
                key={level}
                className={`bg-white shadow-lg rounded-lg overflow-hidden
                ${
                  userProgress.currentLevel === level
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                      {level}
                    </h3>
                    {userProgress.levelProgress[level] >= 80 && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{userProgress.levelProgress[level]}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${userProgress.levelProgress[level]}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {getCompletedLessonsByLevel(level)} Lessons
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Avg. Score</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {getAverageScore(level)}%
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to="/lessons"
                      className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent
                        text-sm font-medium rounded-md text-white
                        ${
                          level === userProgress.currentLevel
                            ? "bg-blue-600 hover:bg-blue-700"
                            : userProgress.levelProgress[level] >= 80
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      disabled={
                        level !== userProgress.currentLevel &&
                        userProgress.levelProgress[level] < 80
                      }
                    >
                      {level === userProgress.currentLevel
                        ? "Continue Learning"
                        : userProgress.levelProgress[level] >= 80
                        ? "Review Lessons"
                        : "Locked"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
