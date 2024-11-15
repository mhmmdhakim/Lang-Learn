import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { progressService } from "../services/progressService";
import { lessons, getLessonById } from "../config/Lessons";
import { LoadingScreen } from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

const LessonsPage = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionsCount, setQuestionsCount] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userProgress = await progressService.getProgress(user.uid);
        setProgress(userProgress);

        // Calculate total questions for each level and lesson
        const questionStats = {};
        Object.entries(lessons).forEach(([level, levelData]) => {
          questionStats[level] = {
            total: 0,
            lessons: {},
          };

          levelData.lessons.forEach((lesson) => {
            questionStats[level].lessons[lesson.id] = {
              total: 0,
              subLessons: {},
            };

            lesson.subLessons.forEach((subLesson) => {
              const questionCount = subLesson.practice?.questions?.length || 0;
              questionStats[level].lessons[lesson.id].total += questionCount;
              questionStats[level].lessons[lesson.id].subLessons[subLesson.id] =
                questionCount;
              questionStats[level].total += questionCount;
            });
          });
        });

        setQuestionsCount(questionStats);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user.uid]);

  const isLessonCompleted = (lessonId) => {
    return progress?.completedLessons?.includes(lessonId);
  };

  const isLessonAvailable = (level) => {
    const levels = ["beginner", "intermediate", "advanced"];
    const currentLevelIndex = levels.indexOf(progress?.currentLevel);
    const lessonLevelIndex = levels.indexOf(level);
    return lessonLevelIndex <= currentLevelIndex;
  };

  const renderProgressIndicator = (level, lessonId, subLessonId) => {
    const totalQuestions =
      questionsCount[level]?.lessons[lessonId]?.subLessons[subLessonId] || 0;
    const completedQuestions =
      progress?.completedQuestions?.[subLessonId]?.length || 0;

    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{
              width: `${
                totalQuestions ? (completedQuestions / totalQuestions) * 100 : 0
              }%`,
            }}
          />
        </div>
        <span className="text-xs text-gray-600">
          {completedQuestions}/{totalQuestions}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <LoadingScreen message="Loading lessons and progress..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Learning Path</h1>

        {Object.entries(lessons).map(([level, levelData]) => (
          <div
            key={level}
            className={`mb-12 ${!isLessonAvailable(level) ? "opacity-50" : ""}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">{levelData.title}</h2>
                <div className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {level}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Total Questions: {questionsCount[level]?.total || 0}
              </div>
            </div>

            <p className="text-gray-600 mb-6">{levelData.description}</p>

            <div className="space-y-6">
              {levelData.lessons.map((lesson) => (
                <div key={lesson.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{lesson.title}</h3>
                    <div className="text-sm text-gray-600">
                      Questions:{" "}
                      {questionsCount[level]?.lessons[lesson.id]?.total || 0}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {lesson.subLessons.map((subLesson) => (
                      <Link
                        key={subLesson.id}
                        to={
                          isLessonAvailable(level)
                            ? `/lesson/${subLesson.id}`
                            : "#"
                        }
                        className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                          isLessonCompleted(subLesson.id)
                            ? "bg-green-50 border-green-200"
                            : "bg-white"
                        } ${
                          !isLessonAvailable(level) ? "cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{subLesson.title}</h4>
                          <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                            {subLesson.duration}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                subLesson.type === "theory"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {subLesson.type}
                            </span>

                            {isLessonCompleted(subLesson.id) && (
                              <span className="text-green-600 flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Completed
                              </span>
                            )}
                          </div>
                          {renderProgressIndicator(
                            level,
                            lesson.id,
                            subLesson.id
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
