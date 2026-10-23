import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { MENU_ITEMS } from '../data/menuData';
import { INITIAL_IMAGE_ASSETS } from '../data/images';
import {
  filterMenuItems,
  calculateShortlistSummary,
  validateReservationInput,
} from './menuLogic';

test('INITIAL_IMAGE_ASSETS contains 14 unique photographs with zero duplicate src paths and existing files on disk', () => {
  const assets = Object.values(INITIAL_IMAGE_ASSETS);
  assert.equal(assets.length, 14, 'Should have 14 authentic image assets');

  const seenSrcs = new Set<string>();
  for (const asset of assets) {
    assert.equal(
      asset.src.endsWith('.svg'),
      false,
      `Image asset ${asset.slotKey} must not be an SVG`
    );
    assert.equal(
      seenSrcs.has(asset.src),
      false,
      `Duplicate image src detected: ${asset.src}`
    );
    seenSrcs.add(asset.src);

    const diskPath = path.join(process.cwd(), 'public', asset.src);
    assert.equal(
      fs.existsSync(diskPath),
      true,
      `Image file must exist on disk at ${diskPath}`
    );
  }
});

test('filterMenuItems hides alcoholic categories when showAlcohol is false', () => {
  const results = filterMenuItems(MENU_ITEMS, {
    categoryId: 'all',
    searchQuery: '',
    dietaryFilter: 'all',
    showAlcohol: false,
  });

  const hasCocktail = results.some((item) => item.categoryId === 'cocktails-bar');
  assert.equal(hasCocktail, false, 'Alcoholic items must be hidden when showAlcohol is false');
});

test('filterMenuItems filters by search query and dietary type accurately', () => {
  const results = filterMenuItems(MENU_ITEMS, {
    categoryId: 'all',
    searchQuery: 'Tikka',
    dietaryFilter: 'veg',
    showAlcohol: false,
  });

  assert.ok(results.length >= 1, 'Should find Paneer Tikka');
  assert.ok(results.every((item) => item.dietary === 'veg'));
});

test('calculateShortlistSummary computes exact NPR totals', () => {
  const chickenKhana = MENU_ITEMS.find((i) => i.id === 'khana-chicken-set')!;
  const momo = MENU_ITEMS.find((i) => i.id === 'nep-mustang-momo')!;

  const summary = calculateShortlistSummary([
    { item: chickenKhana, quantity: 2 }, // 2 * 575 = 1150
    { item: momo, quantity: 1 }, // 1 * 350 = 350
  ]);

  assert.equal(summary.totalItems, 3);
  assert.equal(summary.knownTotalNpr, 1500);
});

test('validateReservationInput rejects invalid inputs and accepts valid details', () => {
  const invalid = validateReservationInput({
    fullName: 'A',
    phone: '123',
    visitDate: '',
    visitTime: '18:00',
    partySize: '0',
    seatingPreference: 'Garden Seating',
    occasionType: 'Family Dining',
    notes: '',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.visitDate);
  assert.ok(invalid.errors.partySize);

  const valid = validateReservationInput({
    fullName: 'Aarav Shrestha',
    phone: '9841234567',
    visitDate: '2026-11-15',
    visitTime: '18:30',
    partySize: '6',
    seatingPreference: 'Garden Seating',
    occasionType: 'Family Celebration',
    notes: 'Outdoor pavilion preferred',
  });

  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
