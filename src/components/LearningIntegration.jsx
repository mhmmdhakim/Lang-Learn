import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context for managing learning state
const LearningContext = createContext();

export const LearningProgress = ({ children }) => {
  const [userProgress, setUserProgress] = useState({
    currentLevel: "beginner",
    completedLessons: [],
    levelProgress: {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    },
    practiceScores: {},
    lessonScores: {},
  });

  // Update progress after completing lesson or practice
  const updateProgress = async (activityId, score, type = "lesson") => {
    setUserProgress((prev) => {
      // Extract level from activityId (e.g., 'beginner-1' -> 'beginner')
      const level = activityId.split("-")[0];

      // Calculate new progress
      const completedLessons = [...prev.completedLessons];
      if (!completedLessons.includes(activityId)) {
        completedLessons.push(activityId);
      }

      // Update scores
      const newScores =
        type === "lesson"
          ? { ...prev.lessonScores, [activityId]: score }
          : { ...prev.practiceScores, [activityId]: score };

      // Calculate level progress
      const levelLessons = completedLessons.filter((id) =>
        id.startsWith(level)
      );
      const levelProgress = {
        ...prev.levelProgress,
        [level]: (levelLessons.length / getTotalLessonsForLevel(level)) * 100,
      };

      return {
        ...prev,
        completedLessons,
        levelProgress,
        [type === "lesson" ? "lessonScores" : "practiceScores"]: newScores,
      };
    });
  };

  const getTotalLessonsForLevel = (level) => {
    // You can adjust these numbers based on your actual lesson content
    const lessonCounts = {
      beginner: 3,
      intermediate: 2,
      advanced: 2,
    };
    return lessonCounts[level] || 0;
  };

  return (
    <LearningContext.Provider value={{ userProgress, updateProgress }}>
      {children}
    </LearningContext.Provider>
  );
};

// Custom hook for using learning context
export const useLearning = () => useContext(LearningContext);

// LessonDetail Component
export const LessonDetail = () => {
  const { userProgress, updateProgress } = useLearning();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lessonId, setLessonId] = useState("beginner-1"); // Example lessonId

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleComplete = async () => {
    // Calculate score based on correct answers
    const totalQuestions = Object.keys(answers).length;
    const correctAnswers = Object.values(answers).filter(
      (a) => a.correct
    ).length;
    const score = (correctAnswers / totalQuestions) * 100;

    // Update progress and navigate to practice
    await updateProgress(lessonId, score, "lesson");
    navigate(`/practice/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Lesson Progress</h2>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(currentSection + 1) * 33.33}%` }}
              />
            </div>
          </div>
          {/* Lesson content would go here */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentSection((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 bg-gray-200 rounded-lg"
              disabled={currentSection === 0}
            >
              Previous
            </button>
            {currentSection === 2 ? (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Complete & Practice
              </button>
            ) : (
              <button
                onClick={() => setCurrentSection((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Practice Component
export const Practice = () => {
  const { userProgress, updateProgress } = useLearning();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [practiceId, setPracticeId] = useState("beginner-1"); // Example practiceId

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    // Move to next exercise or finish practice
    if (currentExercise < 2) {
      // Assuming 3 exercises per practice
      setCurrentExercise((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    const finalScore = (score / 3) * 100; // Assuming 3 exercises total
    await updateProgress(practiceId, finalScore, "practice");
    navigate("/progress");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Practice Session</h2>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(currentExercise + 1) * 33.33}%` }}
              />
            </div>
          </div>
          {/* Practice content would go here */}
          <div className="mt-6 flex justify-between">
            <div className="text-lg">Score: {score}/3</div>
            {currentExercise === 2 ? (
              <button
                onClick={handleFinish}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Finish Practice
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress Component
export const Progress = () => {
  const { userProgress } = useLearning();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Learning Progress</h2>

          {/* Overall Progress */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(userProgress.levelProgress).map(
                ([level, progress]) => (
                  <div key={level} className="bg-gray-50 p-4 rounded-lg">
                    <div className="capitalize font-medium">{level}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(progress)}%
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Completed Lessons */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Completed Lessons</h3>
            <div className="text-3xl font-bold text-green-600">
              {userProgress.completedLessons.length}
            </div>
          </div>

          {/* Recent Scores */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Scores</h3>
            <div className="space-y-2">
              {Object.entries(userProgress.practiceScores).map(
                ([id, score]) => (
                  <div
                    key={id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="capitalize">{id}</span>
                    <span className="font-medium">{Math.round(score)}%</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  LearningProvider,
  LessonDetail,
  Practice,
  Progress,
};
