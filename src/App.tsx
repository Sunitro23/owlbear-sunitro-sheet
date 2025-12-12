import React, { useState, memo } from 'react';
import { useCharacterData } from './hooks/useCharacterData';
import DynamicRenderer from './components/DynamicRenderer';
import './style.css';
import LoadingState from './components/LoadingState';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const {
    characterData,
    loading,
    error
  } = useCharacterData(1);
  
  if (loading) {
    return <LoadingState message="Loading character data..." />;
  }
  
  if (error) {
    return <LoadingState message={`Error: ${error}`} />;
  }
  
  if (!characterData) {
    return <LoadingState message="No character data available" />;
  }
  
  // Convert characterData to the format expected by DynamicRenderer
  // The backend response should look like:
  // {
  //   "character": { ... },
  //   "items": { ... }
  // }
  const backendResponse = {
    character: {
      id: characterData.id,
      name: characterData.name,
      level: characterData.level,
      hollowing: characterData.hollowing,
      souls: characterData.souls,
      stats: characterData.stats,
      basePower: characterData.basePower,
    },
    items: {
      equipment: characterData.equipment,
      inventory: characterData.inventory,
      spells: characterData.spells,
    }
  };

  // Get all top-level sections from the backend response
  const sections = Object.keys(backendResponse);
  
  // If no specific section is selected, show overview of all sections
  if (!selectedSection) {
    return (
      <div className="character-sheet">
        <div className="main-header">
          <h1>Character Sheet</h1>
          <p className="subtitle">Dynamic UI based on backend data structure</p>
        </div>
        
        <div className="sections-overview">
          {sections.map(section => (
            <div 
              key={section}
              className="section-card"
              onClick={() => setSelectedSection(section)}
            >
              <h3 className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
              <p className="section-description">
                {getSectionDescription(section, backendResponse[section])}
              </p>
              <div className="section-count">
                {getItemCount(section, backendResponse[section])} items
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Show the selected section with full detail
  const selectedData = backendResponse[selectedSection];
  
  return (
    <div className="character-sheet">
      <div className="section-header">
        <button 
          className="back-button"
          onClick={() => setSelectedSection(null)}
        >
          ← Back to Overview
        </button>
        <h1 className="section-title">
          {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
        </h1>
      </div>
      
      <div className="dynamic-content">
        <DynamicRenderer 
          data={selectedData}
          title={selectedSection}
        />
      </div>
    </div>
  );
};

// Helper function to get section descriptions
function getSectionDescription(section: string, data: any): string {
  switch (section) {
    case 'character':
      return 'Character information, stats, and base power values';
    case 'items':
      return 'Equipment, inventory, and spells';
    default:
      return 'Character data section';
  }
}

// Helper function to get item counts for overview cards
function getItemCount(section: string, data: any): number {
  if (typeof data !== 'object' || data === null) return 0;
  
  if (section === 'character') {
    return Object.keys(data).length;
  } else if (section === 'items') {
    let total = 0;
    if (data.equipment) total += Object.keys(data.equipment).length;
    if (data.inventory) total += data.inventory.length;
    if (data.spells) total += data.spells.length;
    return total;
  }
  
  return Object.keys(data).length;
}

export default memo(App);
