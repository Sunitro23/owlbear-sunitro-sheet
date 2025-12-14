import React from 'react';

interface DynamicRendererProps {
  data: any;
  title?: string;
}

interface ObjectTypeConfig {
  detector: (obj: any) => boolean;
  renderer: (key: string, value: any) => React.ReactNode;
  priority: number; // Higher priority = checked first
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ data, title }) => {
  // Helper function to capitalize first letter
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Generic field renderers
  const renderResourceField = (key: string, value: any): React.ReactNode => (
    <div key={key} className="resource-field">
      {value.icon && <img src={value.icon} alt={value.label || key} className="resource-icon" />}
      <span className="resource-name">{value.label || capitalize(key)}:</span>
      <div className="resource-values">
        <span className="resource-value">{value.current}/{value.max}</span>
      </div>
    </div>
  );

  const renderStatField = (key: string, value: any): React.ReactNode => (
    <div key={key} className="stat-field">
      {value.icon && <img src={value.icon} alt={value.label || key} className="stat-icon" />}
      <span className="stat-name">{value.label || capitalize(key)}:</span>
      <div className="stat-values">
        <span className="stat-value">{value.value}</span>
        {value.max && <span className="stat-max">/{value.max}</span>}
      </div>
    </div>
  );

  const renderValueWithModifierField = (key: string, value: any): React.ReactNode => (
    <div key={key} className="stat-field">
      {value.icon && <img src={value.icon} alt={value.label || key} className="stat-icon" />}
      <span className="stat-name">{value.label || capitalize(key)}:</span>
      <div className="stat-values">
        <span className="stat-value">{value.value}</span>
        {value.modifier !== undefined && <span className="stat-modifier">(+{value.modifier})</span>}
      </div>
    </div>
  );

  const renderValueWithLabelIconField = (key: string, value: any): React.ReactNode => (
    <div key={key} className="value-field">
      {value.icon && <img src={value.icon} alt={value.label || key} className="value-icon" />}
      <span className="value-name">{value.label || capitalize(key)}:</span>
      <span className="value-display">{value.value}</span>
    </div>
  );

  const renderNestedObjectField = (key: string, value: any): React.ReactNode => (
    <div key={key} className="nested-section">
      <div className="section-title">{capitalize(key)}</div>
      <div className="section-content">
        {renderObject(value)}
      </div>
    </div>
  );

  const renderSimpleField = (key: string, value: any): React.ReactNode => (
    <div key={key} className="simple-field">
      <span className="field-name">{capitalize(key)}:</span>
      <span className="field-value">{String(value)}</span>
    </div>
  );

  // Object type configurations (ordered by priority)
  const objectTypeConfigs: ObjectTypeConfig[] = [
    {
      detector: (obj: any) => obj?.current !== undefined && obj?.max !== undefined && typeof obj.current === 'number' && typeof obj.max === 'number',
      renderer: renderResourceField,
      priority: 5
    },
    {
      detector: (obj: any) => obj?.value !== undefined && obj?.max !== undefined && typeof obj.value === 'number' && typeof obj.max === 'number',
      renderer: renderStatField,
      priority: 4
    },
    {
      detector: (obj: any) => obj?.value !== undefined && obj?.modifier !== undefined && typeof obj.value === 'number' && typeof obj.modifier === 'number',
      renderer: renderValueWithModifierField,
      priority: 3
    },
    {
      detector: (obj: any) => obj?.value !== undefined && obj?.label !== undefined && obj?.icon !== undefined && typeof obj.value === 'number',
      renderer: renderValueWithLabelIconField,
      priority: 2
    }
  ];

  // Render a single field with appropriate styling
  const renderField = (key: string, value: any): React.ReactNode => {
    // Special handling for image fields - use portrait frame for character images
    if (key.toLowerCase() === 'image' && typeof value === 'string') {
      return (
        <div className="portrait-section">
          <div className="portrait-frame">
            <img
              src={value}
              alt={key}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '2px'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const container = target.parentElement;
                if (container) {
                  container.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #3a2818 0%, #2a1810 100%);">
                      <div style="font-size: 48px; opacity: 0.3;">👤</div>
                    </div>
                  `;
                }
              }}
            />
          </div>
        </div>
      );
    }

    // Check for special object types
    for (const config of objectTypeConfigs) {
      if (config.detector(value)) {
        return config.renderer(key, value);
      }
    }

    // Check for nested objects
    if (typeof value === 'object' && value !== null) {
      return renderNestedObjectField(key, value);
    }

    // Default to simple field
    return renderSimpleField(key, value);
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
      // Filter out null, undefined, and id fields before rendering
      const validEntries = Object.entries(obj).filter(([key, value]) => {
        // Skip id fields and null/undefined values
        if (key === 'id') {
          return false;
        }
        if (value === null || value === undefined) {
          return false;
        }
        if (typeof value === 'string' && value.trim() === '') {
          return false;
        }
        return true;
      });

      return (
        <div className="object-content">
          {validEntries.map(([key, value]) => renderField(key, value))}
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
