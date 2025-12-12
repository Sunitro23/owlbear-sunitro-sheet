import { useState, useEffect, useCallback } from 'react';
import { fetchCharacter, updateCharacterStat } from '../api';
import type { CharacterData, StatValue } from '../types';

interface UseCharacterDataReturn {
  characterData: CharacterData | null;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  isSaving: boolean;
  saveError: string | null;
  refetch: () => Promise<void>;
  toggleEdit: () => void;
  updateStat: (statName: keyof CharacterData['stats'], field: 'value' | 'modifier', newValue: number) => Promise<boolean>;
  updateBasePower: (statName: keyof CharacterData['basePower'], field: 'value' | 'max', newValue: number) => void;
}

export const useCharacterData = (characterId: number = 1): UseCharacterDataReturn => {
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const data = await fetchCharacter(characterId);
    setCharacterData(data);
    setLoading(false);
  }, [characterId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleEdit = useCallback(() => {
    if (isEditing) {
      fetchData();
    }
    setIsEditing(prev => !prev);
  }, [isEditing, fetchData]);

  const updateStat = useCallback(async (
    statName: keyof CharacterData['stats'], 
    field: 'value' | 'modifier', 
    newValue: number
  ): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);
    
    if (!characterData) {
      return false;
    }

    const existingStat = characterData.stats[statName];
    const updatedStat: StatValue = {
      value: existingStat?.value ?? 0,
      modifier: existingStat?.modifier ?? 0,
      [field]: newValue
    };

    const updatedCharacter: CharacterData = {
      ...characterData,
      stats: {
        ...characterData.stats,
        [statName]: updatedStat,
      },
    };

    setCharacterData(updatedCharacter);

    const serverResponse = await updateCharacterStat(characterId, updatedCharacter);

    setCharacterData(serverResponse);
    
    return true;
  }, [characterData, characterId]);

  const updateBasePower = useCallback((
    statName: keyof CharacterData['basePower'], 
    field: 'value' | 'max', 
    newValue: number
  ) => {
    setCharacterData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        basePower: {
          ...prevData.basePower,
          [statName]: {
            ...prevData.basePower[statName],
            [field]: newValue,
          },
        },
      };
    });
  }, []);

  return {
    characterData,
    loading,
    error,
    isEditing,
    isSaving,
    saveError,
    refetch: fetchData,
    toggleEdit,
    updateStat,
    updateBasePower,
  };
};
