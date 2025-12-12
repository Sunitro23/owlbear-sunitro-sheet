import React from 'react';

interface DynamicRendererProps {
  data: any;
  title?: string;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ data, title }) => {
  // Helper function to capitalize first letter
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Helper function to check if an object is a stat-like object (has value and max)
  const isStatObject = (obj: any): boolean => {
    return obj && 
           typeof obj === 'object' && 
           Object.keys(obj).length === 2 && 
           'value' in obj && 
           'max' in obj &&
           typeof obj.value === 'number' && 
           typeof obj.max === 'number';
  };

  // Helper function to check if an object is a stat-value object (has value and modifier)
  const isStatValueObject = (obj: any): boolean => {
    return obj && 
           typeof obj === 'object' && 
           Object.keys(obj).length >= 2 && 
           'value' in obj && 
           'modifier' in obj &&
           typeof obj.value === 'number' && 
           typeof obj.modifier === 'number';
  };

  // Render a single field with appropriate styling
  const renderField = (key: string, value: any): React.ReactNode => {
    if (isStatObject(value)) {
      // Special rendering for stat objects (value/max)
      return (
        <div key={key} className="stat-field">
          <div className="stat-name">{capitalize(key)}:</div>
          <div className="stat-values">
            <span className="stat-value">Value: {value.value}</span>
            <span className="stat-max">Max: {value.max}</span>
          </div>
        </div>
      );
    } else if (isStatValueObject(value)) {
      // Special rendering for stat-value objects (value/modifier)
      return (
        <div key={key} className="stat-field">
          <div className="stat-name">{capitalize(key)}:</div>
          <div className="stat-values">
            <span className="stat-value">Value: {value.value}</span>
            <span className="stat-modifier">Mod: {value.modifier}</span>
          </div>
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      // Recursively render nested objects
      return (
        <div key={key} className="nested-section">
          <div className="section-title">{capitalize(key)}</div>
          <div className="section-content">
            {renderObject(value)}
          </div>
        </div>
      );
    } else {
      // Simple key-value display
      return (
        <div key={key} className="simple-field">
          <span className="field-name">{capitalize(key)}:</span>
          <span className="field-value">{String(value)}</span>
        </div>
      );
    }
  };

  // Render an object (recursively)
  const renderObject = (obj: any): React.ReactNode => {
    if (Array.isArray(obj)) {
      return (
        <div className="array-content">
          {obj.map((item, index) => (
            <div key={index} className="array-item">
              {typeof item === 'object' ? renderObject(item) : String(item)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof obj === 'object' && obj !== null) {
      return (
        <div className="object-content">
          {Object.entries(obj).map(([key, value]) => renderField(key, value))}
        </div>
      );
    }

    return <div className="primitive-value">{String(obj)}</div>;
  };

  return (
    <div className="dynamic-section">
      {title && (
        <div className="main-section-title">{capitalize(title)}</div>
      )}
      <div className="section-content">
        {renderObject(data)}
      </div>
    </div>
  );
};

export default DynamicRenderer;
