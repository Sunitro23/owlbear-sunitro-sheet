import React, { useState, useEffect, memo } from 'react';
import CharacterSheet from './sections/CharacterSheet/CharacterSheet';
import Items from './sections/Items/Items';
import type { NewCharacterData } from './types/index';
import './style.css';

const API_BASE = '/characters';

const fetchCharacter = async (id: number): Promise<NewCharacterData> => {
  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    throw new Error('Character not found');
  }

  return response.json();
};



const App: React.FC = () => {
  const [characterData, setCharacterData] = useState<NewCharacterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacter(1);
        setCharacterData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load character data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  
  if (loading) {
    return (
      <div className="character-sheet">
        <div className="loading-message">Loading character data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="character-sheet">
        <div className="loading-message">Error: {error}</div>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div className="character-sheet">
        <div className="loading-message">No character data available</div>
      </div>
    );
  }
  
  return (
    <div className="character-sheet">
      <div className="main-header">
        <h1>Character Sheet</h1>
      </div>

      <div className="character-section">
        <CharacterSheet
          data={characterData.character}
          title="Character"
        />
      </div>

      <div className="inventory-section">
        <h2>Inventory</h2>
        <Items characterData={characterData} />
      </div>
    </div>
  );
};



export default memo(App);
