import { MENU_CATEGORIES, MenuCategoryId, MenuItem } from '../data/menuData';

export interface MenuFilterCriteria {
  categoryId: MenuCategoryId | 'all';
  searchQuery: string;
  dietaryFilter: 'all' | 'veg' | 'non-veg';
  showAlcohol: boolean;
}

export interface ShortlistEntry {
  item: MenuItem;
  quantity: number;
}

export interface ReservationFormInput {
  fullName: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  partySize: string;
  seatingPreference: string;
  occasionType: string;
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ReservationFormInput, string>>;
}

export function isAlcoholCategory(categoryId: MenuCategoryId): boolean {
  const meta = MENU_CATEGORIES.find((c) => c.id === categoryId);
  return Boolean(meta?.isAlcoholic);
}

export function filterMenuItems(items: MenuItem[], criteria: MenuFilterCriteria): MenuItem[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // 1. Respect 18+ alcohol visibility gate
    if (!criteria.showAlcohol && isAlcoholCategory(item.categoryId)) {
      return false;
    }

    // 2. Category filter
    if (criteria.categoryId !== 'all' && item.categoryId !== criteria.categoryId) {
      return false;
    }

    // 3. Dietary filter
    if (criteria.dietaryFilter === 'veg') {
      if (item.dietary !== 'veg') return false;
    } else if (criteria.dietaryFilter === 'non-veg') {
      if (item.dietary !== 'non-veg') return false;
    }

    // 4. Search query across dish name, description, and variants
    if (normalizedQuery.length > 0) {
      const haystack = `${item.name} ${item.description} ${item.variantsNote ?? ''}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export function calculateShortlistSummary(entries: ShortlistEntry[]): {
  totalItems: number;
  knownTotalNpr: number;
  hasUnverifiedPrices: boolean;
} {
  let totalItems = 0;
  let knownTotalNpr = 0;
  let hasUnverifiedPrices = false;

  for (const entry of entries) {
    if (entry.quantity <= 0) continue;
    totalItems += entry.quantity;
    if (entry.item.numericPrice !== null) {
      knownTotalNpr += entry.item.numericPrice * entry.quantity;
    } else {
      hasUnverifiedPrices = true;
    }
    if (entry.item.requiresVerification) {
      hasUnverifiedPrices = true;
    }
  }

  return {
    totalItems,
    knownTotalNpr,
    hasUnverifiedPrices,
  };
}

export function validateReservationInput(input: ReservationFormInput): ValidationResult {
  const errors: Partial<Record<keyof ReservationFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters).';
  }

  const cleanedPhone = (input.phone || '').replace(/[\s\-()]/g, '');
  if (!cleanedPhone || !/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {
    errors.phone = 'Please enter a valid contact phone number (7–15 digits).';
  }

  if (!input.visitDate || input.visitDate.trim() === '') {
    errors.visitDate = 'Please select a preferred date for your visit.';
  }

  if (!input.partySize || Number.isNaN(Number(input.partySize)) || Number(input.partySize) < 1) {
    errors.partySize = 'Please specify a party size of at least 1 guest.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
