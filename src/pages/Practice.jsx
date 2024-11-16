import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { progressService } from "../services/progressService";
import { practiceService } from "../config/Practice";
import { getPracticeById, getNextLesson } from "../config/Lessons";

const Practice = () => {
  const { practiceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [practice, setPractice] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        setLoading(true);
        setError(null);

        const practiceData = getPracticeById(practiceId);
        if (!practiceData) {
          throw new Error("Practice not found");
        }

        setPractice(practiceData);

        if (practiceData.lessonId) {
          const nextLesson = getNextLesson(practiceData.lessonId);
          setNextLessonId(nextLesson);
        }
      } catch (err) {
        console.error("Error fetching practice:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (practiceId) {
      fetchPractice();
    }
  }, [practiceId]);

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!practice?.questions) {
      setError("Invalid practice data");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const totalQuestions = practice.questions.length;
      let correctCount = 0;

      practice.questions.forEach((question) => {
        if (userAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });

      const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
      setScore(calculatedScore);

      if (user?.uid) {
        await practiceService.savePracticeAttempt(
          user.uid,
          practiceId,
          userAnswers,
          calculatedScore
        );

        if (calculatedScore >= 70 && practice.lessonId) {
          await progressService.updateProgress(
            user.uid,
            practice.lessonId,
            calculatedScore
          );
        }
      }

      // Show results modal with navigation options
      showResultsModal(calculatedScore, correctCount, totalQuestions);
    } catch (err) {
      console.error("Error submitting practice:", err);
      setError("Failed to submit practice");
    } finally {
      setSubmitting(false);
    }
  };

  const showResultsModal = (calculatedScore, correctCount, totalQuestions) => {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 class="text-xl font-bold mb-4">Practice Results</h2>
          <p class="mb-4">Score: ${calculatedScore}%</p>
          <p class="mb-6">Correct answers: ${correctCount}/${totalQuestions}</p>
          <div class="flex flex-col gap-3">
            ${
              calculatedScore >= 70 && nextLessonId
                ? `
              <button onclick="window.navigateToNext()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Continue to Next Lesson
              </button>
            `
                : ""
            }
            <button onclick="window.retryLesson()" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              ${calculatedScore >= 70 ? "Review Lesson" : "Retry Practice"}
            </button>
            <button onclick="window.returnToLessons()" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Return to All Lessons
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Define navigation functions
    window.navigateToNext = () => {
      document.body.removeChild(modal);
      navigate(`/lesson/${nextLessonId}`);
    };
    window.retryLesson = () => {
      document.body.removeChild(modal);
      if (practice.lessonId) {
        navigate(`/lesson/${practice.lessonId}`);
      }
    };
    window.returnToLessons = () => {
      document.body.removeChild(modal);
      navigate("/lessons");
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading practice questions...</span>
      </div>
    );
  }

  if (error || !practice) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error || "Practice not found"}</p>
          <button
            onClick={() => navigate("/lessons")}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
          >
            Return to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/lessons")}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Lessons
        </button>
        {practice.lessonId && (
          <button
            onClick={() => navigate(`/lesson/${practice.lessonId}`)}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            Return to Current Lesson
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Practice Questions</h1>

        <div className="space-y-8">
          {practice.questions.map((question, index) => (
            <div key={question.id} className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">
                {index + 1}. {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-3 rounded border cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={userAnswers[question.id] === option}
                      onChange={() => handleAnswerSelect(question.id, option)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Answers"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
