import type { Character } from '../types';
import { DS_ICON_URLS, DEFAULT_CHARACTER_NAME } from './characterSheetConstants';

// Extract character basic info with safe defaults
export const getCharacterBasicInfo = (data: Character) => ({
  name: data?.name || DEFAULT_CHARACTER_NAME,
  image: data?.image || ''
});

// Helper function to get display value for resources (handle current/max format)
export const getResourceDisplay = (resource: number | { current: number; maximum: number } | undefined): string => {
  if (!resource) return '0';

  if (typeof resource === 'number') {
    return resource.toString();
  }

  if (typeof resource === 'object' && 'current' in resource && 'maximum' in resource) {
    return `${resource.current} / ${resource.maximum}`;
  }

  return '0';
};

// Resource configuration
export interface ResourceConfig {
  key: string;
  label: string;
  icon: string;
}

export const createResourceConfigs = (): ResourceConfig[] => [
  {
    key: 'level',
    label: 'Level',
    icon: DS_ICON_URLS.level
  },
  {
    key: 'souls',
    label: 'Souls',
    icon: DS_ICON_URLS.souls
  },
  {
    key: 'hollowing',
    label: 'Hollowing',
    icon: DS_ICON_URLS.hollowing
  },
  {
    key: 'HP',
    label: 'Health Points',
    icon: DS_ICON_URLS.HP
  },
  {
    key: 'AP',
    label: 'Action Points',
    icon: DS_ICON_URLS.AP
  },
  {
    key: 'SpellSlots',
    label: 'Spell Slots',
    icon: DS_ICON_URLS.SpellSlots
  }
];

// Get resource value from character data, checking various locations
export const getResourceValue = (data: Character, resourceKey: string): number | { current: number; maximum: number } => {
  // All resources are in the resources object (with potential capitalization differences)
  const resources = data?.resources || {};
  if (resourceKey === 'hollowing') {
    const hollowing = resources.Hollowing || resources.hollowing;
    if (hollowing !== undefined && hollowing !== null) return hollowing;
    return 0;
  }

  const resourceValue = resources[resourceKey];
  if (resourceValue !== undefined && resourceValue !== null) {
    return resourceValue;
  }
  return 0;
};

// Stat configuration
export interface StatConfig {
  key: string;
  label: string;
  icon: string;
}

export const createStatConfigs = (): StatConfig[] => [
  {
    key: 'STR',
    label: 'Strength',
    icon: DS_ICON_URLS.STR
  },
  {
    key: 'DEX',
    label: 'Dexterity',
    icon: DS_ICON_URLS.DEX
  },
  {
    key: 'FTH',
    label: 'Faith',
    icon: DS_ICON_URLS.FTH
  },
  {
    key: 'INT',
    label: 'Intelligence',
    icon: DS_ICON_URLS.INT
  },
  {
    key: 'VIT',
    label: 'Vigor',
    icon: DS_ICON_URLS.VIT
  },
  {
    key: 'END',
    label: 'Endurance',
    icon: DS_ICON_URLS.END
  }
];

// Create resource display data
export const createResourceDisplayData = (data: Character, configs: ResourceConfig[]) =>
  configs.map(config => ({
    ...config,
    value: getResourceValue(data, config.key),
    displayValue: getResourceDisplay(getResourceValue(data, config.key))
  }));

// Create stat display data
export const createStatDisplayData = (data: Character, configs: StatConfig[]) => {
  const stats = data?.stats || {};

  return configs.map(config => {
    const statInfo = stats[config.key as keyof typeof stats];
    return {
      ...config,
      value: statInfo?.value || 0,
      modifier: statInfo?.modifier || 0
    };
  });
};
