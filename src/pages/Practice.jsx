// src/components/Practice.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { progressService } from "../services/progressService";
import { practiceService } from "../config/Practice";
import { getPracticeById, getNextLesson } from "../config/lessons";
import LoadingSpinner from "../components/LoadingSpinner";

const Practice = () => {
  const { practiceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [practice, setPractice] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPracticeAndHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get practice data with associated lessonId
        const practiceData = getPracticeById(practiceId);
        if (!practiceData) {
          throw new Error("Practice not found");
        }

        setPractice(practiceData);

        // Get next lesson using the associated lessonId
        if (practiceData.lessonId) {
          const nextLesson = getNextLesson(practiceData.lessonId);
          setNextLessonId(nextLesson);
        }

        // Fetch history if user is authenticated
        if (user?.uid) {
          const historyData = await practiceService.getUserPracticeHistory(
            user.uid,
            practiceId
          );
          setHistory(historyData);
        }
      } catch (error) {
        console.error("Error fetching practice:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (practiceId) {
      fetchPracticeAndHistory();
    }
  }, [practiceId, user?.uid]);

  const handleSubmit = async () => {
    if (!practice || !practice.questions) {
      setError("Invalid practice data");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Calculate score
      const totalQuestions = practice.questions.length;
      let correctCount = 0;

      practice.questions.forEach((question) => {
        if (userAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });

      const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
      setScore(calculatedScore);

      // Save attempt if user is authenticated
      if (user?.uid) {
        await practiceService.savePracticeAttempt(
          user.uid,
          practiceId,
          userAnswers,
          calculatedScore
        );

        // Update progress if score meets threshold and we have a lessonId
        if (calculatedScore >= 70 && practice.lessonId) {
          await progressService.updateProgress(
            user.uid,
            practice.lessonId,
            calculatedScore
          );
        }
      }

      // Show results and handle navigation
      const message = `Practice completed!\nScore: ${calculatedScore}%\nCorrect answers: ${correctCount}/${totalQuestions}`;
      const shouldProceed = window.confirm(
        `${message}\n\n${
          calculatedScore >= 70
            ? "Would you like to proceed to the next lesson?"
            : "Would you like to review the lesson and try again?"
        }`
      );

      if (shouldProceed) {
        if (calculatedScore >= 70 && nextLessonId) {
          navigate(`/lesson/${nextLessonId}`);
        } else if (practice.lessonId) {
          navigate(`/lesson/${practice.lessonId}`);
        }
      }
    } catch (error) {
      console.error("Error submitting practice:", error);
      setError("Failed to submit practice");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
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

  // Rest of the component remains the same...
  return <div className="max-w-4xl mx-auto p-6">{/* Existing JSX... */}</div>;
};

export default Practice;
