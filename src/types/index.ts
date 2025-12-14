export interface StatInfo {
  value: number;
  modifier: number;
  icon?: string;
  label?: string;
}

export interface MainCharacterInfo {
  name: string;
  level: Record<string, any>;
  hollowing: Record<string, any>;
  souls: Record<string, any>;
}

export interface ResourceInfo {
  current: number;
  max: number;
  icon?: string;
  label?: string;
}

export interface Character {
  main: MainCharacterInfo;
  stats: Record<string, StatInfo>;
  resources: Record<string, ResourceInfo>;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: string;
  slot: string;
  icon?: string;
  image?: string;
  damageType?: string;
  dice?: string;
  scalingStat?: string;
  twoHanded?: boolean;
  flatBonus?: number;
  armorType?: string;
  catalystType?: string;
  consumableType?: string;
  effect?: string;
  quantity?: number;
  spellType?: string;
  effectType?: string;
  manaCost?: number;
  duration?: number;
  requiresCatalyst?: string;
}

export interface Inventory {
  weapons: InventoryItem[];
  armors: InventoryItem[];
  catalysts: InventoryItem[];
  items: InventoryItem[];
  spells: InventoryItem[];
}

export interface NewCharacterData {
  character: Character;
  inventory: Inventory;
}

// API response models
export interface CharacterCreate {
  character: Character;
  inventory: Inventory;
}

export interface CharacterUpdate {
  character?: Character;
  inventory?: Inventory;
}

export interface CharacterResponse {
  id: number;
  character: Character;
  inventory: Inventory;
}

export interface MessageResponse {
  message: string;
}

// Legacy types (keeping for backward compatibility during transition)
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

// New component props types for updated data structure
export interface NewInventorySectionProps {
  inventory: Inventory;
}

export interface NewSpellsSectionProps {
  spells: InventoryItem[];
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
