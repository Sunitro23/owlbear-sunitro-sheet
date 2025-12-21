import { useState, useEffect } from "react";
import type { NewCharacterData } from "../types/index";
import { fetchCharacter } from "../services/characterApi";

export const useCharacterData = (characterId: string | number = "1") => {
  const [characterData, setCharacterData] = useState<NewCharacterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateCharacterData = (updatedData: NewCharacterData) => {
    setCharacterData(updatedData);
  };

  const loadCharacterData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacter(String(characterId));
      setCharacterData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load character data");
    } finally {
      setLoading(false);
    }
  };

  const refreshCharacterData = () => loadCharacterData();

  useEffect(() => {
    loadCharacterData();
  }, [characterId]);

  return {
    characterData,
    loading,
    error,
    updateCharacterData,
    refreshCharacterData,
  };
};
