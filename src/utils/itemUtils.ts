import type { Item, EquipmentSlots, NewCharacterData } from '../types/index';

// Find equipment by slot
export const getEquippedItem = (
  characterData: NewCharacterData,
  slot: EquipmentSlots,
): Item | null => {
  if (slot === 'right_hand' || slot === 'left_hand') {
    // Hand slots should only contain weapons
    return (
      characterData.inventory.weapons?.find((w) => w.slot === slot) || null
    );
  }

  // Check weapons array for equipped items
  const weapon = characterData.inventory.weapons?.find((w) => w.slot === slot);
  if (weapon) return weapon;

  // Check armors array for equipped items
  const armor = characterData.inventory.armors?.find((a) => a.slot === slot);
  if (armor) return armor;

  // Check catalysts array for equipped items
  const catalyst = characterData.inventory.catalysts?.find(
    (c) => c.slot === slot,
  );
  if (catalyst) return catalyst;

  // Check consumables array for equipped items
  const consumable = characterData.inventory.items?.find(
    (i) => i.slot === slot,
  );
  if (consumable) return consumable;

  // Check spells array for equipped items
  const spell = characterData.inventory.spells?.find((s) => s.slot === slot);
  if (spell) return spell;

  return null;
};

// Helper to get full stat name from abbreviation
export const getFullStatName = (shortName: string): string => {
  const statMap: Record<string, string> = {
    STR: 'Strength',
    DEX: 'Dexterity',
    FTH: 'Faith',
    INT: 'Intelligence',
  };
  return statMap[shortName] || shortName;
};

// Helper to get item type icon
export const getItemTypeIcon = (type: Item['type']): string => {
  const icons: Record<Item['type'], string> = {
    weapon: '⚔️',
    armor: '🛡️',
    catalyst: '🔮',
    consumable: '🧪',
    spell: '✨',
  };
  return icons[type];
};

// Helper to get damage type color
export const getDamageTypeColor = (damageType: string): string => {
  const colors: Record<string, string> = {
    slashing: '#8B4513',
    piercing: '#4169E1',
    bludgeoning: '#696969',
    fire: '#FF4500',
    lightning: '#FFD700',
    magic: '#9932CC',
    dark: '#2F2F2F',
    frost: '#00CED1',
  };
  return colors[damageType] || '#CCCCCC';
};

// Create rich HTML tooltip content for an item
export const createTooltipContent = (item: Item): string => {
  const icon = getItemTypeIcon(item.type);

  let html = `
    <div class="tooltip-header">
      <div class="tooltip-icon">${icon}</div>
      <div class="tooltip-name">${item.name}</div>
    </div>
    <div class="tooltip-content">
  `;

  if (item.type === 'weapon') {
    const damageTypeColor = getDamageTypeColor(item.damageType);
    html += `
      <div class="tooltip-section">
        <div class="tooltip-damage">
          <span class="damage-type" style="color: ${damageTypeColor}; border-color: ${damageTypeColor}">
            ${item.damageType.charAt(0).toUpperCase()}${item.damageType.slice(1)}
          </span>
          <span class="damage-dice">${item.dice}</span>
        </div>
        ${item.scalingStat ? `<div class="tooltip-scaling">Scales with ${getFullStatName(item.scalingStat)}</div>` : ''}
        ${item.twoHanded !== undefined ? `<div class="tooltip-handed">${item.twoHanded ? 'Two-Handed' : 'One-Handed'}</div>` : ''}
        <div class="tooltip-bonus">Attack +${item.flatBonus}</div>
      </div>
    `;
  } else if (item.type === 'armor') {
    const armorTypeColor = getDamageTypeColor(item.armorType);
    html += `
      <div class="tooltip-section">
        <div class="tooltip-armor-type" style="color: ${armorTypeColor}; border-color: ${armorTypeColor}">
          ${item.armorType.charAt(0).toUpperCase()}${item.armorType.slice(1)} Armor
        </div>
        <div class="tooltip-bonus">Defense +${item.flatBonus}</div>
      </div>
    `;
  } else if (item.type === 'catalyst') {
    const catalystTypeColor = getDamageTypeColor('magic');
    html += `
      <div class="tooltip-section">
        <div class="tooltip-catalyst-type" style="color: ${catalystTypeColor}; border-color: ${catalystTypeColor}">
          ${item.catalystType.charAt(0).toUpperCase() + item.catalystType.slice(1)}
        </div>
        <div class="tooltip-bonus">Spell Power +${item.flatBonus}</div>
      </div>
    `;
  } else if (item.type === 'consumable') {
    html += `
      <div class="tooltip-section">
        <div class="tooltip-consumable-type">${item.consumableType.charAt(0).toUpperCase()}${item.consumableType.slice(1)}</div>
        <div class="tooltip-effect">${item.effect}</div>
        <div class="tooltip-uses">
          <span class="uses-current">${item.uses}</span>${item.max_uses ? ` / <span class="uses-max">${item.max_uses}</span>` : ''}
        </div>
      </div>
    `;
  } else if (item.type === 'spell') {
    const spellTypeColor = getDamageTypeColor(
      item.spellType === 'magic'
        ? 'magic'
        : item.spellType === 'miracle'
          ? 'fire'
          : 'frost',
    );
    html += `
      <div class="tooltip-section">
        <div class="tooltip-spell-type" style="color: ${spellTypeColor}; border-color: ${spellTypeColor}">
          ${item.spellType.charAt(0).toUpperCase()}${item.spellType.slice(1)}
        </div>
        <div class="tooltip-effect">
          ${item.effectType.charAt(0).toUpperCase()}${item.effectType.slice(1)}:
          ${item.dice}${item.scalingStat ? ` (scales with ${getFullStatName(item.scalingStat)})` : ''}
        </div>
        <div class="tooltip-catalyst">Requires: ${item.requiresCatalyst.charAt(0).toUpperCase() + item.requiresCatalyst.slice(1)}</div>
        <div class="tooltip-uses">
          <span class="uses-current">${item.uses}</span>${item.max_uses ? ` / <span class="uses-max">${item.max_uses}</span>` : ''}
        </div>
        ${item.duration ? `<div class="tooltip-duration">Duration: ${item.duration}s</div>` : ''}
      </div>
    `;
  }

  html += `
    </div>
  `;

  return html;
};

// Create a unified inventory grid like Dark Souls
export const createUnifiedInventory = (
  characterData: NewCharacterData,
): (Item | null)[] => {
  const inventory: (Item | null)[] = [];

  // Add all items to unified inventory
  const allItems = [
    ...(characterData.inventory.weapons || []),
    ...(characterData.inventory.armors || []),
    ...(characterData.inventory.catalysts || []),
    ...(characterData.inventory.items || []),
    ...(characterData.inventory.spells || []),
  ];

  // Fill first slots with actual items
  allItems.forEach((item) => inventory.push(item));

  // Fill remaining slots (Dark Souls typically shows 6x8 = 48 slots)
  const totalSlots = 48;
  while (inventory.length < totalSlots) {
    inventory.push(null);
  }

  return inventory;
};
