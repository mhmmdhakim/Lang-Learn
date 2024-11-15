import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../services/firebase";

const LearningContext = createContext();

export function useLearning() {
  return useContext(LearningContext);
}

export function LearningProvider({ children }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  // Fetch user progress
  useEffect(() => {
    async function fetchProgress() {
      if (user) {
        const progressRef = doc(db, "progress", user.uid);
        const progressDoc = await getDoc(progressRef);
        if (progressDoc.exists()) {
          setUserProgress(progressDoc.data());
        } else {
          // Initialize progress structure if it doesn't exist
          const initialProgress = {
            completedLessons: [],
            practiceScores: {},
            currentLevel: "beginner",
            levelProgress: {
              beginner: 0,
              intermediate: 0,
              advanced: 0,
            },
          };
          await setDoc(progressRef, initialProgress);
          setUserProgress(initialProgress);
        }
      }
      setLoading(false);
    }
    fetchProgress();
  }, [user]);

  // Update progress
  async function updateProgress(lessonId, score) {
    if (!user) return;

    const progressRef = doc(db, "progress", user.uid);
    const newProgress = {
      ...userProgress,
      completedLessons: [...userProgress.completedLessons, lessonId],
      practiceScores: {
        ...userProgress.practiceScores,
        [lessonId]: score,
      },
    };

    // Update level progress
    const level = lessonId.split("-")[0];
    const totalLessonsInLevel = lessons[level].length;
    const completedInLevel = newProgress.completedLessons.filter((l) =>
      l.startsWith(level)
    ).length;
    newProgress.levelProgress[level] =
      (completedInLevel / totalLessonsInLevel) * 100;

    // Check for level upgrade
    if (level === "beginner" && newProgress.levelProgress.beginner >= 80) {
      newProgress.currentLevel = "intermediate";
    } else if (
      level === "intermediate" &&
      newProgress.levelProgress.intermediate >= 80
    ) {
      newProgress.currentLevel = "advanced";
    }

    await setDoc(progressRef, newProgress);
    setUserProgress(newProgress);
  }

  const value = {
    userProgress,
    updateProgress,
    loading,
  };

  return (
    <LearningContext.Provider value={value}>
      {!loading && children}
    </LearningContext.Provider>
  );
}
