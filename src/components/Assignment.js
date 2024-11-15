import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock } from "lucide-react";

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();

  const handleStartAssignment = () => {
    navigate(`/assignment/${assignment.id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {assignment.title}
          </h3>
          {assignment.completed && (
            <CheckCircle className="text-green-500 w-6 h-6" />
          )}
        </div>
        <p className="text-gray-600 mb-4">{assignment.type}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Clock className="w-5 h-5 mr-2" />
            <span>{assignment.dueDate}</span>
          </div>
          <button
            onClick={handleStartAssignment}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
