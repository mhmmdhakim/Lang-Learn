import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { progressService } from "../services/progressService";
import { getLessonById, getNextLesson } from "../config/Lessons";
import LoadingSpinner from "../components/LoadingSpinner";
import { CheckCircle, ArrowRight } from "lucide-react";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextLessonId, setNextLessonId] = useState(null);

  useEffect(() => {
    const fetchLessonAndProgress = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get lesson data
        const lessonData = getLessonById(lessonId);
        if (!lessonData) {
          throw new Error("Lesson not found");
        }
        setLesson(lessonData);

        // Get next lesson ID
        const nextLesson = getNextLesson(lessonId);
        setNextLessonId(nextLesson);

        // Fetch progress if user is authenticated
        if (user?.uid) {
          const progressData = await progressService.getProgress(
            user.uid,
            lessonId
          );
          setProgress(progressData);
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLessonAndProgress();
    }
  }, [lessonId, user?.uid]);

  const handleStartPractice = () => {
    if (lesson?.practice?.id) {
      navigate(`/practice/${lesson.practice.id}`);
    }
  };

  const handleNextLesson = () => {
    if (nextLessonId) {
      navigate(`/lesson/${nextLessonId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
        <span className="ml-3">Loading lesson content...</span>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error || "Lesson not found"}</p>
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
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-gray-600">
              {lesson.duration} • {lesson.type}
            </p>
          </div>
          {progress?.completed && (
            <CheckCircle className="text-green-500 w-8 h-8" />
          )}
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {lesson.content.split("\n").map((line, index) => (
            <p key={index} className="mb-4">
              {line.trim()}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        {lesson.practice && (
          <button
            onClick={handleStartPractice}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Start Practice
          </button>
        )}

        {progress?.completed && nextLessonId && (
          <button
            onClick={handleNextLesson}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Next Lesson
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
