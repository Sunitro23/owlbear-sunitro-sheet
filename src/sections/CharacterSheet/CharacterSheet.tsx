import React from 'react';
import DynamicRenderer from '../../components/DynamicRenderer';

interface CharacterSheetProps {
  data: any; // Raw JSON data
  title?: string;
  onUpdateStat?: (statName: string, field: 'value' | 'modifier', newValue: number) => Promise<boolean>;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ data, title = "Character Sheet" }) => {

  // Function to automatically detect and create sections from JSON keys
  const renderSectionsFromJSON = (jsonData: any) => {
    console.log(jsonData);
    if (typeof jsonData !== 'object' || jsonData === null) {
      return (
        <div className="character-sheet-container">
          <DynamicRenderer data={jsonData} title={title} />
        </div>
      );
    }

    // Get all top-level keys from the JSON
    const topLevelKeys = Object.keys(jsonData);

    // Check for name
    let characterName = null;
    if (jsonData['name'] && typeof jsonData.name === 'string') {
      characterName = jsonData.name;
    }

    if (topLevelKeys.length === 0) {
      return (
        <div className="character-sheet-container">
          <div className="no-data">No character data available</div>
        </div>
      );
    }

    // Check if we have the special character layout components at top level
    const hasPortrait = topLevelKeys.includes('portrait');
    const hasAvatar = topLevelKeys.includes('avatar');
    const hasResources = topLevelKeys.includes('resources');
    const hasStats = topLevelKeys.includes('stats');

    // If top-level checks fail, check if it's a single character entry with nested properties
    let characterData = jsonData;

    if (!hasPortrait && !hasAvatar && !hasResources && !hasStats && topLevelKeys.length === 1 && typeof jsonData[topLevelKeys[0]] === 'object') {
      characterName = topLevelKeys[0];
      characterData = jsonData[topLevelKeys[0]];

      // Re-check with nested data
      const nestedKeys = Object.keys(characterData);
      const hasNestedPortrait = nestedKeys.includes('image');
      const hasNestedResources = nestedKeys.includes('resources');
      const hasNestedStats = nestedKeys.includes('stats');

      if (hasNestedPortrait || hasNestedResources || hasNestedStats) {
        // Check for a "name" field and use it as the character name
        if (nestedKeys.includes('name') && typeof characterData.name === 'string') {
          characterName = characterData.name;
        }

        // Split nested keys dynamically between left and right panels, excluding "name" field
        const displayableKeys = nestedKeys.filter(key => key.toLowerCase() !== 'name');
        const midPoint = Math.ceil(displayableKeys.length / 2);

        const leftPanelKeys = displayableKeys.slice(0, midPoint);
        const rightPanelKeys = displayableKeys.slice(midPoint);

        return (
          <div className="character-layout">
            {/* Left Panel */}
            <div className="character-portrait-panel">
              <div className="character-name">{characterName}</div>
              {leftPanelKeys.map(key => {
                const value = characterData[key];
                const displayTitle = capitalizeFirstLetter(key);

                return (
                  <div key={key} className="dynamic-section">
                    <DynamicRenderer data={{ [key]: value }} title={displayTitle} />
                  </div>
                );
              })}
            </div>

            {/* Right Panel */}
            <div className="character-sidebar">
              {rightPanelKeys.map(key => {
                const value = characterData[key];
                const displayTitle = capitalizeFirstLetter(key);

                return (
                  <div key={key} className="dynamic-section">
                    <DynamicRenderer data={{ [key]: value }} title={displayTitle} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }

    const hasCoreResources = hasResources && Object.keys(jsonData.resources).some(key => ['level', 'health', 'actionPoints', 'souls'].includes(key));
    const hasFullResources = hasResources && Object.keys(jsonData.resources).length > 0;

    // Use specific layout for character sheet if we have the expected sections
    if (hasPortrait && (hasAvatar || hasResources || hasStats)) {
      return (
        <div className="character-layout">
          {/* Left Panel - Character Portrait + Core Resources */}
          <div className="character-portrait-panel">
            {hasPortrait && (
              <DynamicRenderer
                data={jsonData.portrait}
              />
            )}
            {hasCoreResources && (
              <div className="core-resources-section">
                <DynamicRenderer
                  data={jsonData.resources}
                  title="Core Resources"
                />
              </div>
            )}
          </div>

          {/* Right Panel - Sidebar */}
          <div className="character-sidebar">
            {/* Avatar Placeholder */}
            {hasAvatar && (
              <div className="avatar-placeholder-section">
                <DynamicRenderer
                  data={jsonData.avatar}
                  title="Avatar"
                />
              </div>
            )}

            {/* Resources Section */}
            {hasFullResources && (
              <div className="resources-section">
                <DynamicRenderer
                  data={jsonData.resources}
                  title="RESOURCES"
                />
              </div>
            )}

            {/* Stats Section */}
            {hasStats && (
              <div className="stats-section">
                <DynamicRenderer
                  data={jsonData.stats}
                  title="STATS"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Fallback to default grid layout - two columns
    const displayableKeys = topLevelKeys.filter(key => key.toLowerCase() !== 'name' && key.toLowerCase() !== 'image');
    const midPoint = Math.ceil(displayableKeys.length / 2);
    const leftPanelKeys = displayableKeys.slice(0, midPoint);
    const rightPanelKeys = displayableKeys.slice(midPoint);

    return (
      <div className="character-layout">
        {/* Left Panel */}
        <div className="character-portrait-panel">
          {jsonData['image'] && (
            <DynamicRenderer data={{ image: jsonData.image }} title={characterName} />
          )}
          {leftPanelKeys.map(sectionKey => {
            const sectionData = jsonData[sectionKey];
            const sectionTitle = capitalizeFirstLetter(sectionKey);
            const sectionLabel = sectionData?.label || sectionTitle;

            return (
              <div key={sectionKey} className="character-section">
                <DynamicRenderer
                  data={sectionData}
                  title={sectionLabel}
                />
              </div>
            );
          })}
        </div>

        {/* Right Panel */}
        <div className="character-sidebar">
          {rightPanelKeys.map(sectionKey => {
            const sectionData = jsonData[sectionKey];
            const sectionTitle = capitalizeFirstLetter(sectionKey);
            const sectionLabel = sectionData?.label || sectionTitle;

            return (
              <div key={sectionKey} className="character-section">
                <DynamicRenderer
                  data={sectionData}
                  title={sectionLabel}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="character-layout-wrapper">
      {renderSectionsFromJSON(data)}
    </div>
  );
};

export default CharacterSheet;
