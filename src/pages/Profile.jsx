import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useLearning } from "../contexts/LearningContext";
import { Globe, User } from "lucide-react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useAuth();
  const { userProgress } = useLearning();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Progress Section */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Learning Progress
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["beginner", "intermediate", "advanced"].map((level) => (
                  <div key={level} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                      {level}
                    </h4>
                    <div className="space-y-2">
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

                      <div className="text-sm text-gray-600">
                        <p>
                          Completed Lessons:{" "}
                          {
                            userProgress.completedLessons.filter((lesson) =>
                              lesson.startsWith(level)
                            ).length
                          }
                        </p>
                        <p>
                          Average Score:{" "}
                          {Object.entries(userProgress.practiceScores || {})
                            .filter(([key]) => key.startsWith(level))
                            .reduce((acc, [_, score]) => acc + score, 0) /
                            Object.entries(
                              userProgress.practiceScores || {}
                            ).filter(([key]) => key.startsWith(level)).length ||
                            0}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
