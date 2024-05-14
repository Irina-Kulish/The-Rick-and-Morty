import React from "react";

type ErrorComponentProps = {
    error: Error | null;
  };
  
  export const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
    if (!error) {
      return null;
    }
  
    return (
      <div className="error-message">
        <p>Oops! Something went wrong.</p>
        <p>{error.message}</p>
      </div>
    );
  };