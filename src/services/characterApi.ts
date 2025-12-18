import type { NewCharacterData } from '../types/index';

const API_BASE = '/characters';

export const fetchCharacter = async (id: number): Promise<NewCharacterData> => {
  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    throw new Error('Character not found');
  }

  return response.json();
};

export const getCharacterById = (id: number) => fetchCharacter(id);

export interface EquipItemRequest {
  item_name: string;
  slot: string;
}

export const equipItem = async (characterId: number, request: EquipItemRequest): Promise<NewCharacterData> => {
  const response = await fetch(`${API_BASE}/${characterId}/equip`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to equip item: ${error}`);
  }

  return response.json();
};
