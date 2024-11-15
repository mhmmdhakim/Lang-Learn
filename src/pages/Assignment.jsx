import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { assignmentService } from "../services/assignmentService";
import LoadingSpinner from "../components/LoadingSpinner";
import MultipleChoice from "../components/MultipleChoice";
import DragAndDrop from "../components/DragAndDrop";

const Assignment = () => {
  const { assignmentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch assignment data
        const assignmentData = await assignmentService.getAssignment(
          assignmentId
        );
        setAssignment(assignmentData);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchAssignment();
    }
  }, [assignmentId]);

  const handleSubmit = async (answers) => {
    try {
      await assignmentService.submitAssignment(user.uid, assignmentId, answers);
      navigate("/progress");
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
        <span className="ml-3">Loading assignment...</span>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error || "Assignment not found"}</p>
          <button
            onClick={() => navigate("/assignments")}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
          >
            Return to Assignments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{assignment.title}</h1>
      {assignment.type === "multiple-choice" ? (
        <MultipleChoice assignment={assignment} onSubmit={handleSubmit} />
      ) : (
        <DragAndDrop assignment={assignment} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Assignment;
