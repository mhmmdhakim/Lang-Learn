// src/services/Practice.js
import { db } from "../services/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { lessons, getPracticeById } from "./Lessons";

export const practiceService = {
  async getPractice(practiceId) {
    try {
      // Get practice questions from lessons config
      const practice = getPracticeById(practiceId);
      if (!practice) {
        throw new Error("Practice not found");
      }
      return practice;
    } catch (error) {
      console.error("Error getting practice:", error);
      throw error;
    }
  },

  async getUserPracticeHistory(userId, practiceId) {
    try {
      const practiceHistoryRef = doc(
        db,
        "practiceHistory",
        `${userId}_${practiceId}`
      );
      const practiceHistoryDoc = await getDoc(practiceHistoryRef);

      if (practiceHistoryDoc.exists()) {
        return practiceHistoryDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error getting practice history:", error);
      throw error;
    }
  },

  async savePracticeAttempt(userId, practiceId, answers, score) {
    try {
      const practiceHistoryRef = doc(
        db,
        "practiceHistory",
        `${userId}_${practiceId}`
      );
      const timestamp = new Date().toISOString();

      const attemptData = {
        practiceId,
        userId,
        answers,
        score,
        timestamp,
        attemptNumber: 1,
      };

      // Check if there's previous history
      const existingHistory = await getDoc(practiceHistoryRef);
      if (existingHistory.exists()) {
        const currentHistory = existingHistory.data();
        attemptData.attemptNumber = (currentHistory.attempts?.length || 0) + 1;

        await updateDoc(practiceHistoryRef, {
          attempts: [...(currentHistory.attempts || []), attemptData],
          lastAttempt: timestamp,
          bestScore: Math.max(currentHistory.bestScore || 0, score),
        });
      } else {
        await setDoc(practiceHistoryRef, {
          attempts: [attemptData],
          lastAttempt: timestamp,
          bestScore: score,
        });
      }

      return attemptData;
    } catch (error) {
      console.error("Error saving practice attempt:", error);
      throw error;
    }
  },

  validateAnswers(practice, userAnswers) {
    const questions = practice.questions;
    let correctCount = 0;

    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    return {
      score: Math.round((correctCount / questions.length) * 100),
      correctCount,
      totalQuestions: questions.length,
    };
  },
};
