import React from 'react';
import type { NewCharacterData, InventoryItem } from '../../types/index';

interface ItemsProps {
  characterData: NewCharacterData;
}

const Items: React.FC<ItemsProps> = ({ characterData }) => {

  // Find equipment by slot (left_hand, right_hand, armor)
  const getEquippedItem = (slot: string): InventoryItem | null => {
    // Check weapons array for equipped items
    const weapon = characterData.inventory.weapons?.find(w => w.slot === slot);
    if (weapon) return weapon;

    // Check armors array for equipped items
    const armor = characterData.inventory.armors?.find(a => a.slot === slot);
    if (armor) return armor;

    return null;
  };

  // Get equipped spells (assuming they have equipped slots)
  const getEquippedSpells = (): InventoryItem[] => {
    return characterData.inventory.spells?.filter(spell =>
      spell.slot === 'spell_1' || spell.slot === 'spell_2' || spell.slot === 'spell_3' || spell.slot === 'spell_4'
    ) || [];
  };

  // Get consumables
  const getConsumables = (): InventoryItem[] => {
    return characterData.inventory.items?.filter(item => item.consumableType) || [];
  };

  // Get bag items (weapons, armors, catalysts, consumables, spells in bag)
  const getBagItems = (): InventoryItem[] => {
    const bagItems: InventoryItem[] = [];

    // Weapons in bag
    const bagWeapons = characterData.inventory.weapons?.filter(w => w.slot === 'bag') || [];
    bagItems.push(...bagWeapons);

    // Armors in bag
    const bagArmors = characterData.inventory.armors?.filter(a => a.slot === 'bag') || [];
    bagItems.push(...bagArmors);

    // Catalysts in bag
    const bagCatalysts = characterData.inventory.catalysts?.filter(c => c.slot === 'bag') || [];
    bagItems.push(...bagCatalysts);

    // Consumables in bag
    const bagConsumables = characterData.inventory.items?.filter(item => item.consumableType && item.slot === 'bag') || [];
    bagItems.push(...bagConsumables);

    // Spells in bag (not equipped)
    const bagSpells = characterData.inventory.spells?.filter(spell => spell.slot === 'bag') || [];
    bagItems.push(...bagSpells);

    return bagItems;
  };

  // Create detailed tooltip content for an item
  const createTooltipContent = (item: InventoryItem): string[] => {
    const lines: string[] = [];

    if (item.type === 'weapon') {
      lines.push(item.name);
      if (item.damageType) lines.push(`Damage: ${item.damageType}`);
      if (item.dice) lines.push(`Dice: ${item.dice}`);
      if (item.scalingStat) lines.push(`Scaling: ${item.scalingStat}`);
      if (item.twoHanded !== undefined) lines.push(item.twoHanded ? 'Two-Handed' : 'One-Handed');
      if (item.flatBonus) lines.push(`Bonus: +${item.flatBonus}`);
    } else if (item.type === 'armor') {
      lines.push(item.name);
      if (item.armorType) lines.push(`Type: ${item.armorType}`);
      if (item.flatBonus) lines.push(`Bonus: +${item.flatBonus}`);
    } else if (item.type === 'catalyst') {
      lines.push(item.name);
      if (item.catalystType) lines.push(`Type: ${item.catalystType}`);
      if (item.flatBonus) lines.push(`Bonus: +${item.flatBonus}`);
    } else if (item.type === 'consumable') {
      lines.push(item.name);
      if (item.consumableType && item.consumableType !== 'consumable') lines.push(`Type: ${item.consumableType}`);
      if (item.effect) lines.push(item.effect);
      if (item.quantity) lines.push(`Quantity: ${item.quantity}`);
    } else if (item.type === 'spell') {
      lines.push(item.name);
      if (item.spellType) lines.push(`Type: ${item.spellType}`);
      if (item.effectType && item.dice && item.scalingStat) {
        lines.push(`Effect: ${item.effectType} ${item.dice} (${item.scalingStat})`);
      } else if (item.effectType) {
        lines.push(`Effect: ${item.effectType}`);
      }
      if (item.requiresCatalyst) lines.push(`Requires: ${item.requiresCatalyst}`);
      if (item.manaCost) lines.push(`Cost: ${item.manaCost} MP`);
      if (item.duration) lines.push(`Duration: ${item.duration} sec`);
    } else {
      lines.push(item.name);
    }

    return lines;
  };

  // Render an equipped item square
  const renderEquippedSlot = (slot: string, label: string) => {
    const item = getEquippedItem(slot);

    const tooltipLines = item ? createTooltipContent(item) : [`${label} - Empty`];
    const tooltipContent = tooltipLines.join('\n');

    return (
      <div key={slot} className="equipped-slot" title={tooltipContent}>
        <div className="item-square">
          {item && item.image ? (<img src={item.image} alt={item.name} className="item-icon" />) :
            (
              <div className="empty-slot">
                <span className="empty-icon">○</span>
              </div>
            )}
          <div className="item-tooltip">
            {tooltipLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render a spell slot
  const renderSpellSlot = (spell: InventoryItem | null, index: number) => {
    const tooltipLines = spell ? createTooltipContent(spell) : ['Spell Slot - Empty'];
    const tooltipContent = tooltipLines.join('\n');

    return (
      <div key={`spell-${index}`} className="equipped-slot" title={tooltipContent}>
        <div className="item-square spell-square">
          {spell && spell.image ? (<img src={spell.image} alt={spell.name} className="item-icon" />) :
            (
              <div className="empty-slot">
                <span className="empty-icon">★</span>
              </div>
            )}
          <div className="item-tooltip">
            {tooltipLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render a consumable slot
  const renderConsumableSlot = (consumable: InventoryItem | null, index: number) => {
    const tooltipLines = consumable ? createTooltipContent(consumable) : ['Consumable - Empty'];
    const tooltipContent = tooltipLines.join('\n');

    return (
      <div key={`consumable-${index}`} className="equipped-slot" title={tooltipContent}>
        <div className="item-square">
          {consumable && consumable.image ? (<img src={consumable.image} alt={consumable.name} className="item-icon" />) :
            (
              <div className="empty-slot">
                <span className="empty-icon">●</span>
              </div>
            )}
          <div className="item-tooltip">
            {tooltipLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const equippedSpells = getEquippedSpells();
  const consumables = getConsumables();
  const bagItems = getBagItems();

  // Render a bag item
  const renderBagItem = (item: InventoryItem, index: number) => {
    const tooltipLines = createTooltipContent(item);
    const tooltipContent = tooltipLines.join('\n');

    return (
      <div key={`bag-${index}`} className="equipped-slot" title={tooltipContent}>
        <div className="item-square">
          {item.image ? (<img src={item.image} alt={item.name} className="item-icon" />) : null}
          <div className="item-tooltip">
            {tooltipLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="equipment-tab">
      <div className="equipment-panel">
        {/* First Row: Equipped Items */}
        <div className="equipment-row">
          <h3 className="equipment-row-title">EQUIPPED GEAR</h3>
          <div className="equipped-items-grid">
            {renderEquippedSlot('armor', 'Armor')}
            {renderEquippedSlot('left_hand', 'Left Hand')}
            {renderEquippedSlot('right_hand', 'Right Hand')}
            {renderConsumableSlot(consumables.filter(c => c.slot === 'consumable')[0] || null, 0)}
          </div>
        </div>

        {/* Second Row: Equipped Spells */}
        <div className="equipment-row spells-row">
          <h3 className="equipment-row-title">EQUIPPED SPELLS</h3>
          <div className="equipped-spells-grid">
            {Array.from({ length: 4 }, (_, i) => renderSpellSlot(equippedSpells[i] || null, i))}
          </div>
        </div>

        {/* Third Row: Bag Inventory */}
        {bagItems.length > 0 && (
          <div className="equipment-row inventory-row">
            <h3 className="equipment-row-title">INVENTORY</h3>
            <div className="bag-items-grid">
              {bagItems.map((item, index) => renderBagItem(item, index))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
