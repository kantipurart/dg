export type GalleryCategory =
  | 'Garden & Lawn'
  | 'Food & Menu'
  | 'Swings & Photo Spots';

export interface ImageAsset {
  id: string;
  slotKey: string;
  title: string;
  nepaliTitle: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  caption: string;
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1';
  sourceLabel: string;
}

/**
 * 14 100% unique, authentic photographs of Dream Garden Resort (Chapali Bhangal, Budhanilkantha)
 * pulled from Google Maps reviews, owner uploads, and @resortdreamgarden Instagram.
 * Every slot uses a distinct image file — zero duplicate src paths anywhere.
 */
export const INITIAL_IMAGE_ASSETS: Record<string, ImageAsset> = {
  heroGarden: {
    id: 'asset-hero-garden',
    slotKey: 'heroGarden',
    title: 'Twilight Garden Lawn & Dining Hall',
    nepaliTitle: 'ड्रीम गार्डेन रिसोर्ट',
    category: 'Garden & Lawn',
    src: '/assets/images/real/dgr-photo1.jpg',
    alt: 'Twilight view of Dream Garden Resort lawn and building in Chapali Bhangal, Budhanilkantha',
    caption: 'Twilight view of the garden lawn and main dining building.',
    aspectRatio: '16:9',
    sourceLabel: 'Garden & Lawn',
  },
  instaCrispyBites: {
    id: 'asset-insta-crispy-bites',
    slotKey: 'instaCrispyBites',
    title: 'Crispy Bites & Evening Platter',
    nepaliTitle: 'साँझको क्रिस्पी खाजा',
    category: 'Food & Menu',
    src: '/assets/aistudio/image_e85f76e1.png',
    alt: 'Crispy bites platter and fries served at Dream Garden Resort',
    caption: 'Crispy evening platter with golden fries and house dip.',
    aspectRatio: '4:3',
    sourceLabel: 'Food & Menu',
  },
  mustangMomoSekuwa: {
    id: 'asset-tandoori-tikka-platter',
    slotKey: 'mustangMomoSekuwa',
    title: 'Tandoori Chicken & Paneer Tikka',
    nepaliTitle: 'तन्दुरी र टिक्का',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-2.jpg',
    alt: 'Clay-oven Chicken and Paneer Tikka platter with mint chutney',
    caption: 'Clay-oven roasted Tikka platter with fresh salad and mint chutney.',
    aspectRatio: '4:3',
    sourceLabel: 'Food & Menu',
  },
  nepaliKhanaThali: {
    id: 'asset-nepali-khana-set',
    slotKey: 'nepaliKhanaThali',
    title: 'Traditional Nepali Khana Set',
    nepaliTitle: 'नेपाली खाना सेट',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-4.jpg',
    alt: 'Nepali Khana Set with steamed rice, black daal, saag, achar, salad, and omelette',
    caption: 'Steamed rice, slow-simmered black daal, saag, spiced aloo, and timur achar.',
    aspectRatio: '4:3',
    sourceLabel: 'Food & Menu',
  },
  continentalSizzler: {
    id: 'asset-herb-grilled-chop',
    slotKey: 'continentalSizzler',
    title: 'Herb-Crusted Grilled Chop',
    nepaliTitle: 'ग्रिल्ड चप',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-3.jpg',
    alt: 'Herb-crusted grilled chop with roasted potatoes and jus',
    caption: 'Herb-crusted grilled chop served with pan-roasted potatoes.',
    aspectRatio: '4:3',
    sourceLabel: 'Food & Menu',
  },
  scannedMenuSheet: {
    id: 'asset-scanned-menu-sheet',
    slotKey: 'scannedMenuSheet',
    title: 'Mo:Mo, Chowmein & Oven Pizza Menu',
    nepaliTitle: 'मेनु कार्ड',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-13.jpg',
    alt: 'Dream Garden Resort menu sheet showing Mo:Mo, Chowmein, and Pizza',
    caption: 'Mo:Mo, Chowmein, Fried Rice, and Oven Pizza menu card.',
    aspectRatio: '4:3',
    sourceLabel: 'Food & Menu',
  },
  gardenWickerLawn: {
    id: 'asset-garden-wicker-lawn',
    slotKey: 'gardenWickerLawn',
    title: 'Outdoor Wicker Lawn Tables',
    nepaliTitle: 'आउटडोर गार्डेन टेबल',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-1.jpg',
    alt: 'Outdoor wicker armchair seating and glass-top dining table on the green lawn',
    caption: 'Wicker armchairs and family tables on the green garden lawn.',
    aspectRatio: '4:3',
    sourceLabel: 'Garden & Lawn',
  },
  upperGazeboTerrace: {
    id: 'asset-upper-gazebo-terrace',
    slotKey: 'upperGazeboTerrace',
    title: 'Stone Terrace & Gazebo Huts',
    nepaliTitle: 'प्राइभेट गार्डेन हट',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-5.jpg',
    alt: 'Upper stone-paved terrace seating area and green-roofed garden gazebo huts',
    caption: 'Stone-paved garden terrace beside private gazebo huts.',
    aspectRatio: '4:3',
    sourceLabel: 'Garden & Lawn',
  },
  daylightBuildingHills: {
    id: 'asset-daylight-building-hills',
    slotKey: 'daylightBuildingHills',
    title: 'Main Dining Hall & Foothills',
    nepaliTitle: 'ड्रीम गार्डेन रिसोर्ट भवन',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-6.jpg',
    alt: 'Daylight view of the red-roofed brick building and green Budhanilkantha hills',
    caption: 'Main dining building framed by the green Budhanilkantha hills.',
    aspectRatio: '4:3',
    sourceLabel: 'Garden & Lawn',
  },
  roseGardenLights: {
    id: 'asset-rose-garden-lights',
    slotKey: 'roseGardenLights',
    title: 'Rose Garden & Canopy Lights',
    nepaliTitle: 'गुलाफको बगैंचा',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-7.jpg',
    alt: 'Blooming pink roses in the garden with overhead string light canopies',
    caption: 'Blooming garden roses under warm evening string lights.',
    aspectRatio: '4:3',
    sourceLabel: 'Garden & Lawn',
  },
  eveningLedSwing: {
    id: 'asset-evening-led-swing',
    slotKey: 'eveningLedSwing',
    title: 'Evening Illuminated Nest Swing',
    nepaliTitle: 'झिलिमिली नेस्ट पिङ',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-8.jpg',
    alt: 'LED-lit woven hanging nest swing with the illuminated Dreamgarden sign behind',
    caption: 'Warm LED-lit hanging nest swing and evening garden sign.',
    aspectRatio: '4:3',
    sourceLabel: 'Swings & Photo Spots',
  },
  daylightNestSwing: {
    id: 'asset-daylight-nest-swing',
    slotKey: 'daylightNestSwing',
    title: 'Pergola Patio & Nest Swing',
    nepaliTitle: 'परगोला नेस्ट पिङ',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-9.jpg',
    alt: 'Woven hanging nest swing suspended under the garden pergola on the stone patio',
    caption: 'Woven hanging nest chair on the stone garden patio.',
    aspectRatio: '4:3',
    sourceLabel: 'Swings & Photo Spots',
  },
  gardenWalkwaySwing: {
    id: 'asset-garden-walkway-swing',
    slotKey: 'gardenWalkwaySwing',
    title: 'Garden Walkway & Courtyard',
    nepaliTitle: 'बगैंचाको बाटो',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-10.jpg',
    alt: 'Paved garden walkway, manicured trees, hanging swing, and brick building',
    caption: 'Paved garden path and shaded courtyard seating.',
    aspectRatio: '4:3',
    sourceLabel: 'Swings & Photo Spots',
  },
  bambooSwingHeartArch: {
    id: 'asset-bamboo-swing-heart-arch',
    slotKey: 'bambooSwingHeartArch',
    title: 'Tall Garden Swing & Heart Arch',
    nepaliTitle: 'अग्लो पिङ र फोटो स्पट',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-12.jpg',
    alt: 'Tall bamboo-style swing and red heart photo arch on the lawn at Dream Garden Resort',
    caption: 'Tall garden swing and heart-shaped floral photo arch.',
    aspectRatio: '4:3',
    sourceLabel: 'Swings & Photo Spots',
  },
};

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Garden & Lawn',
  'Food & Menu',
  'Swings & Photo Spots',
];

const STORAGE_KEY = 'dgr_bhangal_unique_photos_v6';

export function loadImageAssets(): Record<string, ImageAsset> {
  if (typeof window === 'undefined') {
    return INITIAL_IMAGE_ASSETS;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_IMAGE_ASSETS;
    const overrides = JSON.parse(raw) as Record<string, Partial<ImageAsset>>;
    const merged: Record<string, ImageAsset> = { ...INITIAL_IMAGE_ASSETS };
    const usedSrcs = new Set<string>();

    for (const key of Object.keys(merged)) {
      const customSrc = overrides[key]?.src?.trim();
      if (customSrc && !customSrc.endsWith('.svg') && !usedSrcs.has(customSrc)) {
        merged[key] = {
          ...merged[key],
          ...overrides[key],
        };
      }
      usedSrcs.add(merged[key].src);
    }
    return merged;
  } catch {
    return INITIAL_IMAGE_ASSETS;
  }
}

export function saveImageOverride(
  slotKey: string,
  newSrc: string,
  newCaption?: string
): Record<string, ImageAsset> {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const overrides = raw ? JSON.parse(raw) : {};
      overrides[slotKey] = {
        src: newSrc.trim(),
        ...(newCaption ? { caption: newCaption.trim() } : {}),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // Ignore storage errors
    }
  }
  return loadImageAssets();
}

export function resetImageOverrides(): Record<string, ImageAsset> {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  return INITIAL_IMAGE_ASSETS;
}
