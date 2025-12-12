// Core character and game types
export interface CharacterData {
  id: number;
  name: string;
  level: number;
  hollowing: number;
  souls: number;
  stats: Stats;
  basePower: BasePower;
  equipment: Equipment;
  inventory: Array<WeaponItem | ShieldItem>;
  spells: Spell[];
}

export interface StatValue {
  value: number;
  modifier: number;
}

export interface Stats {
  vitality: StatValue;
  [key: string]: StatValue | undefined;
}

export interface BasePower {
  hp: ResourceValue;
  ap: ResourceValue;
  attunement: ResourceValue;
}

export interface ResourceValue {
  value: number;
  max: number;
}

// Equipment types
export interface Equipment {
  main_hand: WeaponItem;
  off_hand: ShieldItem;
  armor: ArmorItem;
}

export interface WeaponItem {
  type: 'weapon';
  name: string;
  damage_types: Array<{ type: string; value: string }>;
  status_effects: Array<{ status: string; value: string }>;
}

export interface ShieldItem {
  type: 'shield';
  name: string;
  shield_type: string;
}

export interface ArmorItem {
  name: string;
  types: string[];
}

export interface Spell {
  name: string;
  spell_type: string;
  effects: Array<{ effect_type: string; value: string }>;
}

// Component props types
export interface StatItemProps {
  iconClass: string;
  name: string;
  value: number;
  modifier?: number;
  isEditing?: boolean;
  onValueChange?: (value: number) => void;
  onModifierChange?: (value: number) => void;
}

export interface CharacterStatsProps {
  characterData: CharacterData;
  onUpdateStat: (statName: keyof CharacterData['stats'], field: 'value', newValue: number) => Promise<boolean>;
}

export interface BasePowerProps {
  characterData: CharacterData;
}

export interface CharacterInfoProps {
  characterData: CharacterData;
}

export interface LoadingStateProps {
  message?: string;
}

// API related types
export interface RawAPIResponse {
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
