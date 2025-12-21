// Core types
export type EquipmentSlots = "armor" | "right_hand" | "left_hand" | "consumable" | "bag" | "spell_1" | "spell_2" | "spell_3" | "spell_4";
export type DiceRoll = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

// Stats
export type StatName = "STR" | "DEX" | "FTH" | "INT" | "VIT" | "END";
export type ScalingStat = "STR" | "DEX" | "FTH" | "INT";

// Item categories
export type ItemType = "weapon" | "armor" | "spell" | "catalyst" | "consumable";
export type DamageType = "slashing" | "piercing" | "bludgeoning" | "fire" | "lightning" | "magic" | "dark" | "frost";
export type ArmorType = "light" | "medium" | "heavy" | "fire" | "lightning" | "magic" | "dark" | "frost";
export type SpellType = "magic" | "miracle" | "cryomancy" | "sorcery";
export type EffectType = "damage" | "healing" | "buff" | "debuff" | "utility";
export type CatalystType = "staff" | "talisman" | "chime" | "pyromancy flame";
export type ConsumableType = "estus" | "key" | "material" | "misc";

// Data models from the API
export interface StatInfo {
  value: number; // 0-99
  modifier: number; // -20 to 20
}

export interface ResourceWithCurrentMax {
  current: number;
  maximum: number;
}

export interface Character {
  hollowing: number | ResourceWithCurrentMax;
  souls: number;
  level: number;
  name: string;
  image?: string;
  stats: Record<StatName, StatInfo>;
  resources: Record<string, number | ResourceWithCurrentMax>;
}

// Utility types
export type ItemWithUses = Item & { uses: number; max_uses?: number };
export type DamageItem = WeaponItem | SpellItem;
export type EquippableItem = WeaponItem | ArmorItem | CatalystItem;

// Base item interface
export interface BaseItem {
  name: string;
  image: string;
  slot: EquipmentSlots;
}

// Specific item types
export interface WeaponItem extends BaseItem {
  type: "weapon";
  damageType: DamageType;
  dice: DiceRoll;
  scalingStat?: ScalingStat;
  twoHanded?: boolean;
  flatBonus: number;
}

export interface ArmorItem extends BaseItem {
  type: "armor";
  armorType: ArmorType;
  flatBonus: number;
}

export interface SpellItem extends BaseItem {
  type: "spell";
  spellType: SpellType;
  effectType: EffectType;
  dice: DiceRoll;
  scalingStat?: ScalingStat;
  duration?: number;
  requiresCatalyst: CatalystType;
  uses: number;
  max_uses?: number;
}

export interface CatalystItem extends BaseItem {
  type: "catalyst";
  catalystType: CatalystType;
  flatBonus: number;
}

export interface ConsumableItem extends BaseItem {
  type: "consumable";
  consumableType: ConsumableType;
  effect: string;
  uses: number;
  max_uses?: number;
}

export type Item = WeaponItem | ArmorItem | SpellItem | CatalystItem | ConsumableItem;

export interface Inventory {
  weapons: WeaponItem[];
  armors: ArmorItem[];
  catalysts: CatalystItem[];
  items: ConsumableItem[];
  spells: SpellItem[];
}

export interface NewCharacterData {
  id: string;
  character: Character;
  inventory: Inventory;
}
