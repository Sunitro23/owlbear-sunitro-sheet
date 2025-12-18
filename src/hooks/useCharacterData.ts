import { useState, useEffect } from 'react';
import type { NewCharacterData } from '../types/index';

const API_BASE = '/characters';

const fetchCharacter = async (id: number): Promise<NewCharacterData> => {
  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    throw new Error('Character not found');
  }

  return response.json();
};

export const useCharacterData = (characterId: number = 1) => {
  const [characterData, setCharacterData] = useState<NewCharacterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateCharacterData = (updatedData: NewCharacterData) => {
    setCharacterData(updatedData);
  };

  const refreshCharacterData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacter(characterId);
      setCharacterData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh character data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacter(characterId);
        setCharacterData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load character data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [characterId]);

  return {
    characterData,
    loading,
    error,
    updateCharacterData,
    refreshCharacterData,
  };
};
