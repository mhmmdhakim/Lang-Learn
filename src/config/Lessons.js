export const lessons = {
  beginner: {
    title: "Basic English",
    description: "Foundation concepts for English language learners",
    lessons: [
      {
        id: "beginner-1",
        title: "Basic Grammar and Vocabulary",
        description: "Essential grammar rules and everyday vocabulary",
        subLessons: [
          {
            id: "beginner-1-1",
            title: "Subject Pronouns & Be Verbs",
            content: `
                1. Subject Pronouns
                  - I, You, He, She, It, We, They
                  - Examples:
                    * I am a student
                    * You are helpful
                    * She is kind
                
                2. Be Verbs (am/is/are)
                  - Present tense usage
                  - Examples:
                    * I am at school
                    * The weather is nice
                    * They are my friends
                
                3. Simple Sentences
                  - Basic sentence structure
                  - Examples:
                    * I am happy
                    * The cat is sleeping
                    * We are studying English
              `,
            duration: "20 min",
            type: "theory",
            practice: {
              id: "practice-b1-1",
              questions: [
                {
                  id: 1,
                  question: "Which sentence uses the correct form of 'be'?",
                  options: [
                    "They is happy",
                    "He am a doctor",
                    "She is beautiful",
                    "I are tired",
                  ],
                  correctAnswer: "She is beautiful",
                },
                {
                  id: 2,
                  question:
                    "Select the correct subject pronoun for a group of people:",
                  options: ["He", "They", "It", "She"],
                  correctAnswer: "They",
                },
                {
                  id: 3,
                  question: "Choose the correct sentence:",
                  options: [
                    "You is my friend",
                    "We am students",
                    "They are happy",
                    "He are tall",
                  ],
                  correctAnswer: "They are happy",
                },
              ],
            },
          },
          {
            id: "beginner-1-2",
            title: "Basic Vocabulary - Daily Life",
            content: `
                1. Everyday Objects
                  - Common items vocabulary
                  - Examples:
                    * phone, book, pen, chair, table
                    * door, window, bed, lamp, clock
                
                2. Basic Actions
                  - Common verbs
                  - Examples:
                    * eat: I eat breakfast
                    * sleep: She sleeps early
                    * walk: They walk to school
                
                3. Simple Descriptions
                  - Basic adjectives
                  - Examples:
                    * big/small: a big house
                    * hot/cold: cold weather
                    * new/old: a new car
              `,
            duration: "25 min",
            type: "practical",
            practice: {
              id: "practice-b1-2",
              questions: [
                {
                  id: 1,
                  question: "Which word describes temperature?",
                  options: ["Book", "Hot", "Walk", "Table"],
                  correctAnswer: "Hot",
                },
                {
                  id: 2,
                  question:
                    "Match the action: 'I ___ breakfast every morning.'",
                  options: ["sleep", "eat", "walk", "read"],
                  correctAnswer: "eat",
                },
                {
                  id: 3,
                  question: "Which is a piece of furniture?",
                  options: ["Phone", "Book", "Chair", "Pen"],
                  correctAnswer: "Chair",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  intermediate: {
    title: "Intermediate English",
    description: "Advanced grammar and complex vocabulary",
    lessons: [
      {
        id: "intermediate-1",
        title: "Perfect Tenses",
        description: "Master present perfect and past perfect tenses",
        subLessons: [
          {
            id: "intermediate-1-1",
            title: "Present Perfect",
            content: `
                1. Present Perfect Structure
                  - have/has + past participle
                  - Examples:
                    * I have visited Paris
                    * She has completed her homework
                    * They have lived here for 5 years
                
                2. Time Expressions
                  - Usage with: since, for, already, yet
                  - Examples:
                    * I have studied English since 2020
                    * They have worked here for 10 years
                    * Have you eaten lunch yet?
                
                3. Experience vs. Recent Past
                  - Life experiences
                  - Examples:
                    * I have never seen snow
                    * She has been to London twice
                    * We have just arrived
              `,
            duration: "30 min",
            type: "theory",
            practice: {
              id: "practice-i1-1",
              questions: [
                {
                  id: 1,
                  question: "Choose the correct present perfect form:",
                  options: [
                    "I has seen",
                    "She have gone",
                    "They has arrived",
                    "He has finished",
                  ],
                  correctAnswer: "He has finished",
                },
                {
                  id: 2,
                  question: "Select the correct time expression:",
                  options: [
                    "I have studied English yesterday",
                    "I have studied English since 2020",
                    "I have studied English tomorrow",
                    "I have studied English last year",
                  ],
                  correctAnswer: "I have studied English since 2020",
                },
                {
                  id: 3,
                  question: "Which sentence is correct?",
                  options: [
                    "They have never went there",
                    "They have never gone there",
                    "They have never going there",
                    "They have never goes there",
                  ],
                  correctAnswer: "They have never gone there",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  advanced: {
    title: "Advanced English",
    description: "Complex structures and idiomatic expressions",
    lessons: [
      {
        id: "advanced-1",
        title: "Idiomatic Expressions",
        description: "Master common English idioms and their usage",
        subLessons: [
          {
            id: "advanced-1-1",
            title: "Business Idioms",
            content: `
                1. Common Business Idioms
                  - Expressions and meanings
                  - Examples:
                    * "Break even" - Neither make profit nor loss
                    * "Get the ball rolling" - Start a project
                    * "Think outside the box" - Think creatively
                
                2. Usage in Context
                  - Professional situations
                  - Examples:
                    * "Let's get the ball rolling on the new project"
                    * "We need to think outside the box to solve this"
                    * "The company finally broke even this quarter"
                
                3. Formal vs. Informal Usage
                  - When to use idioms
                  - Examples:
                    * Formal: "The project was successful"
                    * Informal: "The project hit the nail on the head"
              `,
            duration: "35 min",
            type: "theory",
            practice: {
              id: "practice-a1-1",
              questions: [
                {
                  id: 1,
                  question: "What does 'break even' mean?",
                  options: [
                    "Make a huge profit",
                    "Neither make profit nor loss",
                    "Take a break",
                    "Break something",
                  ],
                  correctAnswer: "Neither make profit nor loss",
                },
                {
                  id: 2,
                  question: "When would you use 'get the ball rolling'?",
                  options: [
                    "To end a project",
                    "To play sports",
                    "To start a project",
                    "To take a break",
                  ],
                  correctAnswer: "To start a project",
                },
                {
                  id: 3,
                  question: "Which context is most appropriate for idioms?",
                  options: [
                    "Legal documents",
                    "Casual business meetings",
                    "Academic papers",
                    "Formal presentations",
                  ],
                  correctAnswer: "Casual business meetings",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

// Keep the utility functions unchanged
export const getLessonById = (lessonId) => {
  if (!lessonId) return null;
  const [level, mainLesson, subLesson] = lessonId.split("-");
  return lessons[level]?.lessons
    ?.find((lesson) => lesson.id === `${level}-${mainLesson}`)
    ?.subLessons?.find((sub) => sub.id === lessonId);
};

export const getPracticeById = (practiceId) => {
  if (!practiceId) return null;
  for (const level of Object.values(lessons)) {
    for (const lesson of level.lessons) {
      for (const subLesson of lesson.subLessons) {
        if (subLesson.practice?.id === practiceId) {
          return {
            ...subLesson.practice,
            lessonId: subLesson.id,
          };
        }
      }
    }
  }
  return null;
};

export const getNextLesson = (currentLessonId) => {
  if (!currentLessonId) return null;

  const [level, mainLesson, subLesson] = currentLessonId.split("-");
  const currentLevel = lessons[level];
  const currentMainLesson = currentLevel?.lessons?.find(
    (lesson) => lesson.id === `${level}-${mainLesson}`
  );

  if (!currentMainLesson) return null;

  const currentSubIndex = currentMainLesson.subLessons.findIndex(
    (sub) => sub.id === currentLessonId
  );

  if (currentSubIndex < currentMainLesson.subLessons.length - 1) {
    return currentMainLesson.subLessons[currentSubIndex + 1].id;
  }

  const currentMainIndex = currentLevel.lessons.findIndex(
    (lesson) => lesson.id === currentMainLesson.id
  );
  if (currentMainIndex < currentLevel.lessons.length - 1) {
    return currentLevel.lessons[currentMainIndex + 1].subLessons[0].id;
  }

  const levels = Object.keys(lessons);
  const currentLevelIndex = levels.indexOf(level);
  if (currentLevelIndex < levels.length - 1) {
    const nextLevel = lessons[levels[currentLevelIndex + 1]];
    return nextLevel.lessons[0].subLessons[0].id;
  }

  return null;
};
