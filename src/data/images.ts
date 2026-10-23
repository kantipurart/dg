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
    title: 'Dream Garden Resort — Twilight Lawn & Building',
    nepaliTitle: 'ड्रीम गार्डेन रिसोर्ट, चपली भंगाल',
    category: 'Garden & Lawn',
    src: '/assets/images/real/dgr-photo1.jpg',
    alt: 'Panoramic twilight photograph of Dream Garden Resort in Chapali Bhangal, Budhanilkantha showing the red-roofed building, garden lawn, circular outdoor tables, and Shivapuri hills',
    caption: 'Twilight view of the manicured garden lawn, circular outdoor tables, and main building in Chapali Bhangal, Budhanilkantha.',
    aspectRatio: '16:9',
    sourceLabel: 'Google Maps Featured Photo',
  },
  instaCrispyBites: {
    id: 'asset-insta-crispy-bites',
    slotKey: 'instaCrispyBites',
    title: 'Crispy Bites. Happy Evenings. (@resortdreamgarden)',
    nepaliTitle: 'साँझको क्रिस्पी खाजा र रमाइलो वातावरण',
    category: 'Food & Menu',
    src: '/assets/aistudio/image_e85f76e1.png',
    alt: 'Official @resortdreamgarden Instagram feature showing crispy bites platter, golden fries, dip, and candle-lit evening ambiance',
    caption: 'Official @resortdreamgarden Instagram showcase — Crispy Bites, Happy Evenings in Budhanilkantha, Kathmandu.',
    aspectRatio: '4:3',
    sourceLabel: '@resortdreamgarden Instagram',
  },
  mustangMomoSekuwa: {
    id: 'asset-tandoori-tikka-platter',
    slotKey: 'mustangMomoSekuwa',
    title: 'Tandoori Chicken & Paneer Tikka Platter',
    nepaliTitle: 'तन्दुरी चिकेन र पनिर टिक्का प्लाटर',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-2.jpg',
    alt: 'Google Maps review photograph of clay-oven Chicken and Paneer Tikka served on a black platter with mint chutney at an outdoor wicker table',
    caption: 'Clay-oven roasted Tikka platter served with fresh salad and mint chutney on our outdoor wicker garden tables.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  nepaliKhanaThali: {
    id: 'asset-nepali-khana-set',
    slotKey: 'nepaliKhanaThali',
    title: 'Traditional Nepali Khana Set & Black Daal',
    nepaliTitle: 'नेपाली खाना सेट र कालो दाल',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-4.jpg',
    alt: 'Google Maps review photograph of a Nepali Khana Set with steamed rice, black daal in a metal bowl, mustang aloo, saag, achar, salad, and omelette',
    caption: 'Steamed rice, slow-simmered black daal in a traditional bowl, saag, spiced aloo, timur achar, and omelette.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  continentalSizzler: {
    id: 'asset-herb-grilled-chop',
    slotKey: 'continentalSizzler',
    title: 'Herb-Crusted Grilled Chop & Roasted Potatoes',
    nepaliTitle: 'हर्ब ग्रिल्ड चप र रोस्टेड आलु',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-3.jpg',
    alt: 'Google Maps photograph of chef-plated herb-crusted grilled chop with roasted potatoes, char-grilled onion, and jus',
    caption: 'Chef-plated herb-crusted grilled chop served with pan-roasted potatoes and house jus.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Dining Photo',
  },
  scannedMenuSheet: {
    id: 'asset-scanned-menu-sheet',
    slotKey: 'scannedMenuSheet',
    title: 'Official Printed Menu — Mo:Mo, Chowmein & Oven Pizza',
    nepaliTitle: 'आधिकारिक मेनु — म:म, चाउमिन र ओभन पिज्जा दररेट',
    category: 'Food & Menu',
    src: '/assets/images/gmaps/bhangal-13.jpg',
    alt: 'Scanned official Dreamgarden resort pvt.ltd. menu page showing NPR prices for Steam/Kothy/Jhol/Chilly Mo:Mos, Chowmein/Fried Rice, and Pizza From the Oven',
    caption: 'Official printed Dreamgarden Resort menu card from Google Maps showing inclusive NPR rates.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Menu Photo',
  },
  gardenWickerLawn: {
    id: 'asset-garden-wicker-lawn',
    slotKey: 'gardenWickerLawn',
    title: 'Outdoor Wicker Garden Tables on the Lawn',
    nepaliTitle: 'हरियाली चौरमा आउटडोर गार्डेन टेबल',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-1.jpg',
    alt: 'Google Maps review photograph of outdoor woven wicker armchair seating and glass-top dining table on the green lawn at Dream Garden Resort',
    caption: 'Comfortable woven wicker armchairs and glass-top family tables set right on the green garden lawn.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  upperGazeboTerrace: {
    id: 'asset-upper-gazebo-terrace',
    slotKey: 'upperGazeboTerrace',
    title: 'Stone Garden Terrace & Green Gazebo Huts',
    nepaliTitle: 'ढुङ्गाको टेरेस र प्राइभेट गार्डेन हटहरू',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-5.jpg',
    alt: 'Google Maps review photograph of the upper stone-paved terrace seating area and green-roofed garden gazebo huts surrounded by flowering plants',
    caption: 'Upper stone-paved garden terrace beside our private green-roofed gazebo huts.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  daylightBuildingHills: {
    id: 'asset-daylight-building-hills',
    slotKey: 'daylightBuildingHills',
    title: 'Main Resort Building & Shivapuri Foothills',
    nepaliTitle: 'शिवपुरी डाँडाको काखमा ड्रीम गार्डेन रिसोर्ट',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-6.jpg',
    alt: 'Google Maps daylight photograph of the red-roofed brick building with the Dreamgarden sign and green Shivapuri hills behind',
    caption: 'Daylight view of the Dreamgarden main dining building framed by the lush Budhanilkantha hills.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  roseGardenLights: {
    id: 'asset-rose-garden-lights',
    slotKey: 'roseGardenLights',
    title: 'Blooming Rose Bushes & Canopy String Lights',
    nepaliTitle: 'गुलाफको बगैंचा र झिलिमिली बत्तीहरू',
    category: 'Garden & Lawn',
    src: '/assets/images/gmaps/bhangal-7.jpg',
    alt: 'Google Maps review photograph of blooming pink roses in the garden with overhead string light canopies and the Dreamgarden sign',
    caption: 'Blooming garden roses under our canopy of warm evening string lights.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  eveningLedSwing: {
    id: 'asset-evening-led-swing',
    slotKey: 'eveningLedSwing',
    title: 'Evening Illuminated Nest Swing & Sign',
    nepaliTitle: 'साँझको झिलिमिली बगैंचाको पिङ',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-8.jpg',
    alt: 'Google Maps night photograph of the LED-lit woven hanging nest swing with the illuminated Dreamgarden resort pvt ltd sign behind',
    caption: 'Evening photo spot featuring our warm LED-lit hanging nest swing and illuminated resort sign.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  daylightNestSwing: {
    id: 'asset-daylight-nest-swing',
    slotKey: 'daylightNestSwing',
    title: 'Woven Hanging Nest Swing & Pergola Patio',
    nepaliTitle: 'परगोला मुनिको झुल्ने नेस्ट पिङ',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-9.jpg',
    alt: 'Google Maps daylight photograph of the woven hanging nest swing suspended under the garden pergola on the stone patio',
    caption: 'Our signature woven hanging nest chair on the stone garden patio.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  gardenWalkwaySwing: {
    id: 'asset-garden-walkway-swing',
    slotKey: 'gardenWalkwaySwing',
    title: 'Garden Walkway, Trees & Courtyard View',
    nepaliTitle: 'बगैंचाको बाटो र हरियाली आँगन',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-10.jpg',
    alt: 'Google Maps review photograph of the paved garden walkway, manicured trees, hanging swing, and brick building',
    caption: 'Strolling path through the garden courtyard with shaded outdoor tables.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
  },
  bambooSwingHeartArch: {
    id: 'asset-bamboo-swing-heart-arch',
    slotKey: 'bambooSwingHeartArch',
    title: 'Tall Garden Swing (पिङ) & Heart Photo Arch',
    nepaliTitle: 'अग्लो पिङ र मुटु आकारको फोटो स्पट',
    category: 'Swings & Photo Spots',
    src: '/assets/images/gmaps/bhangal-12.jpg',
    alt: 'Google Maps review photograph of the tall golden bamboo-style swing and red heart photo frame arch on the lawn at Dream Garden Resort',
    caption: 'Favorite guest photo spot featuring the tall garden swing and heart-shaped floral arch.',
    aspectRatio: '4:3',
    sourceLabel: 'Google Maps Review Photo',
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
