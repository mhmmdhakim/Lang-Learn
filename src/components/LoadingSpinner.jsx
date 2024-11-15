import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "default" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
    </div>
  );
};

export const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export const LoadingSkeleton = ({ lines = 3, className = "" }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded w-${12 - i}`}
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
