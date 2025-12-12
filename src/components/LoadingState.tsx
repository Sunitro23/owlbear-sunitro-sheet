import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading character data..." 
}) => (
  <div className="character-sheet">
    <div className="loading-message">{message}</div>
  </div>
);

export default LoadingState;
