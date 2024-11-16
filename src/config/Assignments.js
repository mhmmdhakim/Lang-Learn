const assignments = [
  {
    id: "1",
    title: "Math Quiz",
    type: "multiple-choice",
    dueDate: "2024-11-20",
    questions: [
      {
        id: "q1",
        question: "What is 5 + 3?",
        options: ["5", "7", "8", "10"],
        answer: "8",
      },
      {
        id: "q2",
        question: "What is 10 - 4?",
        options: ["5", "6", "7", "8"],
        answer: "6",
      },
    ],
  },
  {
    id: "2",
    title: "Science Project",
    type: "drag-and-drop",
    dueDate: "2024-11-25",
    questions: [
      {
        id: "q1",
        question: "Drag the planets in the correct order from the Sun.",
        items: ["Earth", "Venus", "Mars", "Mercury"],
        correctOrder: ["Mercury", "Venus", "Earth", "Mars"],
      },
    ],
  },
];

export default assignments;
