// src/config/lessons.js

export const lessons = {
  beginner: {
    title: "Beginner Level",
    description: "Fundamental concepts and basic topics for beginners",
    lessons: [
      {
        id: "beginner-1",
        title: "Introduction to Basics",
        description: "Get started with fundamental concepts",
        subLessons: [
          {
            id: "beginner-1-1",
            title: "Basic Concepts",
            content: `
                1. What are Basic Concepts?
                  - Definition and importance of fundamentals
                  - Core terminology and definitions
                  - Building blocks of knowledge
                
                2. Key Components
                  - Understanding the basics
                  - Identifying core principles
                  - Recognizing patterns
                
                3. Application Areas
                  - Where to apply basic concepts
                  - Real-world examples
                  - Common use cases
              `,
            duration: "15 min",
            type: "theory",
            practice: {
              id: "practice-b1-1",
              questions: [
                {
                  id: 1,
                  question: "What is the main concept covered in this lesson?",
                  options: [
                    "Advanced techniques",
                    "Fundamental concepts",
                    "Expert strategies",
                    "Complex theories",
                  ],
                  correctAnswer: "Fundamental concepts",
                },
                {
                  id: 2,
                  question: "Why are basic concepts important?",
                  options: [
                    "They form the foundation for advanced learning",
                    "They are easy to memorize",
                    "They are not important",
                    "They are only for beginners",
                  ],
                  correctAnswer:
                    "They form the foundation for advanced learning",
                },
                {
                  id: 3,
                  question: "What is the best way to identify core principles?",
                  options: [
                    "Skip the basics entirely",
                    "Study advanced topics first",
                    "Look for recurring patterns and fundamentals",
                    "Ignore the building blocks",
                  ],
                  correctAnswer: "Look for recurring patterns and fundamentals",
                },
              ],
            },
          },
          {
            id: "beginner-1-2",
            title: "Getting Started",
            content: `
                1. Starting Your Journey
                  - Setting up your learning environment
                  - Creating a study plan
                  - Setting realistic goals
                
                2. Learning Methodology
                  - Step-by-step approach
                  - Practice techniques
                  - Common pitfalls to avoid
                
                3. Progress Tracking
                  - Measuring your progress
                  - Identifying areas for improvement
                  - Setting milestones
              `,
            duration: "20 min",
            type: "practical",
            practice: {
              id: "practice-b1-2",
              questions: [
                {
                  id: 1,
                  question: "What is the first step in the learning process?",
                  options: [
                    "Understanding basics",
                    "Advanced application",
                    "Complex problem solving",
                    "Expert techniques",
                  ],
                  correctAnswer: "Understanding basics",
                },
                {
                  id: 2,
                  question: "How should you track your progress?",
                  options: [
                    "Don't track progress at all",
                    "Set milestones and measure achievements",
                    "Only focus on difficult topics",
                    "Skip the easy parts",
                  ],
                  correctAnswer: "Set milestones and measure achievements",
                },
                {
                  id: 3,
                  question: "What is a key component of a good study plan?",
                  options: [
                    "Studying randomly",
                    "Setting realistic goals and timeframes",
                    "Skipping practice sessions",
                    "Avoiding fundamentals",
                  ],
                  correctAnswer: "Setting realistic goals and timeframes",
                },
              ],
            },
          },
        ],
      },
      {
        id: "beginner-2",
        title: "Basic Applications",
        description: "Learn to apply basic concepts",
        subLessons: [
          {
            id: "beginner-2-1",
            title: "Simple Applications",
            content: `
                1. Understanding Applications
                  - Basic application structure
                  - Components and their roles
                  - Simple implementations
                
                2. Building Simple Solutions
                  - Step-by-step development
                  - Testing basics
                  - Debug techniques
                
                3. Best Practices
                  - Code organization
                  - Documentation
                  - Basic optimization
              `,
            duration: "25 min",
            type: "practical",
            practice: {
              id: "practice-b2-1",
              questions: [
                {
                  id: 1,
                  question:
                    "How do you apply basic concepts in a simple scenario?",
                  options: [
                    "Follow the step-by-step guide",
                    "Skip the basics",
                    "Jump to advanced topics",
                    "Ignore the fundamentals",
                  ],
                  correctAnswer: "Follow the step-by-step guide",
                },
                {
                  id: 2,
                  question: "What is an important aspect of testing basics?",
                  options: [
                    "Skipping tests entirely",
                    "Testing only at the end",
                    "Regular testing throughout development",
                    "Ignoring test results",
                  ],
                  correctAnswer: "Regular testing throughout development",
                },
                {
                  id: 3,
                  question: "Why is documentation important?",
                  options: [
                    "It's not important",
                    "It helps maintain and understand code",
                    "It makes code slower",
                    "It's only for experts",
                  ],
                  correctAnswer: "It helps maintain and understand code",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  intermediate: {
    title: "Intermediate Level",
    description: "Advanced concepts and moderate complexity topics",
    lessons: [
      {
        id: "intermediate-1",
        title: "Advanced Concepts",
        description: "Explore more complex topics and applications",
        subLessons: [
          {
            id: "intermediate-1-1",
            title: "Complex Applications",
            content: `
                1. Complex System Design
                  - System architecture
                  - Component interaction
                  - Performance considerations
                
                2. Advanced Features
                  - Feature implementation
                  - Integration strategies
                  - Optimization techniques
                
                3. Quality Assurance
                  - Testing strategies
                  - Performance monitoring
                  - Error handling
              `,
            duration: "35 min",
            type: "theory",
            practice: {
              id: "practice-i1-1",
              questions: [
                {
                  id: 1,
                  question: "What characterizes a complex application?",
                  options: [
                    "Multiple interacting components",
                    "Single simple function",
                    "Basic calculations",
                    "Elementary concepts",
                  ],
                  correctAnswer: "Multiple interacting components",
                },
                {
                  id: 2,
                  question:
                    "What is a key consideration in system architecture?",
                  options: [
                    "Ignoring scalability",
                    "Component coupling and cohesion",
                    "Using only basic features",
                    "Avoiding documentation",
                  ],
                  correctAnswer: "Component coupling and cohesion",
                },
                {
                  id: 3,
                  question: "Why is performance monitoring important?",
                  options: [
                    "It's not important",
                    "To identify and resolve bottlenecks",
                    "To make systems slower",
                    "To avoid testing",
                  ],
                  correctAnswer: "To identify and resolve bottlenecks",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  advanced: {
    title: "Advanced Level",
    description: "Expert-level concepts and complex applications",
    lessons: [
      {
        id: "advanced-1",
        title: "Expert Techniques",
        description: "Master advanced concepts and expert-level applications",
        subLessons: [
          {
            id: "advanced-1-1",
            title: "Expert Applications",
            content: `
                1. Advanced System Architecture
                  - Scalable design patterns
                  - Microservices architecture
                  - Distributed systems
                
                2. Performance Optimization
                  - Advanced optimization techniques
                  - Resource management
                  - System monitoring
                
                3. Best Practices
                  - Industry standards
                  - Security considerations
                  - Maintenance strategies
              `,
            duration: "45 min",
            type: "theory",
            practice: {
              id: "practice-a1-1",
              questions: [
                {
                  id: 1,
                  question: "What defines an expert-level solution?",
                  options: [
                    "Optimal performance and scalability",
                    "Basic functionality",
                    "Simple implementation",
                    "Minimal features",
                  ],
                  correctAnswer: "Optimal performance and scalability",
                },
                {
                  id: 2,
                  question:
                    "What is a key aspect of microservices architecture?",
                  options: [
                    "Monolithic design",
                    "Service independence and modularity",
                    "Avoiding testing",
                    "Single point of failure",
                  ],
                  correctAnswer: "Service independence and modularity",
                },
                {
                  id: 3,
                  question: "Why are security considerations important?",
                  options: [
                    "They're not important",
                    "To protect system and data integrity",
                    "To make systems slower",
                    "To complicate development",
                  ],
                  correctAnswer: "To protect system and data integrity",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

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
            lessonId: subLesson.id, // Include the associated lessonId
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

  // Find current sub-lesson index
  const currentSubIndex = currentMainLesson.subLessons.findIndex(
    (sub) => sub.id === currentLessonId
  );

  // Try next sub-lesson in current main lesson
  if (currentSubIndex < currentMainLesson.subLessons.length - 1) {
    return currentMainLesson.subLessons[currentSubIndex + 1].id;
  }

  // Try first sub-lesson of next main lesson in current level
  const currentMainIndex = currentLevel.lessons.findIndex(
    (lesson) => lesson.id === currentMainLesson.id
  );
  if (currentMainIndex < currentLevel.lessons.length - 1) {
    return currentLevel.lessons[currentMainIndex + 1].subLessons[0].id;
  }

  // Try first sub-lesson of first main lesson in next level
  const levels = Object.keys(lessons);
  const currentLevelIndex = levels.indexOf(level);
  if (currentLevelIndex < levels.length - 1) {
    const nextLevel = lessons[levels[currentLevelIndex + 1]];
    return nextLevel.lessons[0].subLessons[0].id;
  }

  return null;
};
