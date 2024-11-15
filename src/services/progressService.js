// src/services/progressService.js
import { db } from "./firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

export const progressService = {
  async getProgress(userId) {
    const docRef = doc(db, "progress", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    // Initialize progress if it doesn't exist
    const initialProgress = {
      currentLevel: "beginner",
      overallProgress: 0,
      completedLessons: [],
      levelProgress: {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
      },
    };

    await setDoc(docRef, initialProgress);
    return initialProgress;
  },

  async updateProgress(userId, lessonId, score) {
    const docRef = doc(db, "progress", userId);
    const currentProgress = await this.getProgress(userId);

    // Get level from lessonId (e.g., "beginner-1" -> "beginner")
    const level = lessonId.split("-")[0];

    // Update completed lessons if not already completed
    let completedLessons = currentProgress.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    // Calculate level progress
    const levelLessons = {
      beginner: 3,
      intermediate: 2,
      advanced: 2,
    };

    const levelProgress = {
      ...currentProgress.levelProgress,
      [level]:
        (completedLessons.filter((l) => l.startsWith(level)).length /
          levelLessons[level]) *
        100,
    };

    // Calculate overall progress
    const totalLessons = Object.values(levelLessons).reduce((a, b) => a + b, 0);
    const overallProgress = (completedLessons.length / totalLessons) * 100;

    // Determine if user should advance to next level
    let currentLevel = currentProgress.currentLevel;
    if (levelProgress[currentLevel] >= 80) {
      const levels = ["beginner", "intermediate", "advanced"];
      const currentIndex = levels.indexOf(currentLevel);
      if (currentIndex < levels.length - 1) {
        currentLevel = levels[currentIndex + 1];
      }
    }

    const updatedProgress = {
      ...currentProgress,
      completedLessons,
      levelProgress,
      overallProgress,
      currentLevel,
      lastUpdated: new Date().toISOString(),
    };

    await updateDoc(docRef, updatedProgress);
    return updatedProgress;
  },
};
