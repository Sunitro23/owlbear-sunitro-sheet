// Import types for runtime usage and re-export for backward compatibility
import type {
  CharacterData,
  StatValue,
  Stats,
  BasePower,
  ResourceValue,
  Equipment,
  WeaponItem,
  ShieldItem,
  ArmorItem,
  Spell,
  CharacterStatsProps,
  BasePowerProps,
  CharacterInfoProps,
  LoadingStateProps,
  StatItemProps,
  RawAPIResponse
} from './types/index';

// Re-export types for backward compatibility
export type {
  CharacterData,
  StatValue,
  Stats,
  BasePower,
  ResourceValue,
  Equipment,
  WeaponItem,
  ShieldItem,
  ArmorItem,
  Spell,
  CharacterStatsProps,
  BasePowerProps,
  CharacterInfoProps,
  LoadingStateProps,
  StatItemProps,
  RawAPIResponse
};

const API_BASE = '/characters';

interface InternalRawAPIResponse {
  id: number;
  character: {
    name: string;
    level: number;
    hollowing: number;
    souls: number;
    stats: Stats;
    resources: Array<{
      name: string;
      current: number;
      max: number;
    }>;
  };
  equipment: Equipment;
  inventory: Array<WeaponItem | ShieldItem>;
  spells: Spell[];
}

function transformAPIData(rawData: InternalRawAPIResponse): CharacterData {
  // Handle resources more flexibly - look for common resource names
  const hpResource = rawData.character.resources.find(r => 
    r.name.toLowerCase().includes('hp') || 
    r.name.toLowerCase().includes('health')
  ) || { current: 0, max: 0 };
  
  const apResource = rawData.character.resources.find(r => 
    r.name.toLowerCase().includes('ap') || 
    r.name.toLowerCase().includes('stamina')
  ) || { current: 0, max: 0 };
  
  const attunementResource = rawData.character.resources.find(r => 
    r.name.toLowerCase().includes('attunement') || 
    r.name.toLowerCase().includes('focus')
  ) || { current: 0, max: 0 };
  
  const offHand = rawData.equipment.off_hand as ShieldItem;

  return {
    id: rawData.id,
    name: rawData.character.name,
    level: rawData.character.level,
    hollowing: rawData.character.hollowing,
    souls: rawData.character.souls,
    stats: rawData.character.stats,
    basePower: {
      hp: { value: hpResource.current, max: hpResource.max },
      ap: { value: apResource.current, max: apResource.max },
      attunement: { value: attunementResource.current, max: attunementResource.max },
    },
    equipment: {
      main_hand: rawData.equipment.main_hand,
      off_hand: { ...offHand },
      armor: rawData.equipment.armor,
    },
    inventory: rawData.inventory,
    spells: rawData.spells,
  };
}

export const fetchCharacter = async (id: number): Promise<CharacterData> => {
  const response = await fetch(`${API_BASE}/${id}`);
  
  if (!response.ok) {
    throw new Error('Character not found');
  }
  
  const rawData: InternalRawAPIResponse = await response.json();
  const transformedData = transformAPIData(rawData);
  
  return transformedData;
};

export const updateCharacterStat = async (
  id: number, 
  updatedCharacter: CharacterData
): Promise<CharacterData> => {
  // Convert CharacterData back to RawAPIResponse format for PUT
  const putPayload = {
    id: updatedCharacter.id,
    character: {
      name: updatedCharacter.name,
      level: updatedCharacter.level,
      hollowing: updatedCharacter.hollowing,
      souls: updatedCharacter.souls,
      stats: updatedCharacter.stats,
      resources: [
        { name: 'HP', current: updatedCharacter.basePower.hp.value, max: updatedCharacter.basePower.hp.max },
        { name: 'AP', current: updatedCharacter.basePower.ap.value, max: updatedCharacter.basePower.ap.max },
        { name: 'Attunement', current: updatedCharacter.basePower.attunement.value, max: updatedCharacter.basePower.attunement.max }
      ]
    },
    equipment: updatedCharacter.equipment,
    inventory: updatedCharacter.inventory,
    spells: updatedCharacter.spells
  };

  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(putPayload)
  });
  
  if (response.ok) {
    const rawData: InternalRawAPIResponse = await response.json();
    const transformedData = transformAPIData(rawData);
    
    return transformedData;
  }
  
  return updatedCharacter;
};
