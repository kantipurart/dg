export interface LocalHighlightSpot {
  id: string;
  title: string;
  nepaliSubtitle: string;
  shortDesc: string;
  imageSlotKey: string;
}

export const BUSINESS_CONFIG = {
  englishName: 'Dream Garden Resort',
  nepaliName: 'ड्रीम गार्डेन रिसोर्ट',
  legalName: 'Dreamgarden resort pvt.ltd.',
  localAreaName: 'Chapali Bhangal, Budhanilkantha',
  nepaliAreaName: 'चपली भंगाल, बूढानीलकण्ठ, काठमाडौँ',
  category: 'Garden Restaurant · Sekuwa & Khana · Family Dining',
  tagline: 'Crispy Bites. Happy Evenings.',
  secondaryTagline: 'हरियाली बगैंचा र मिठो खाना — More Good Days in Budhanilkantha.',
  shortIntro:
    'Some evenings are meant for slowing down, sharing a plate, and enjoying the moment. Gather with your favorite people over crispy bites, Mustang Mo:Mo, charcoal Sekuwa, and traditional Nepali Khana Sets in our lush Chapali Bhangal garden.',
  location: {
    area: 'Chapali Bhangal, Budhanilkantha-2',
    city: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    country: 'Nepal',
    fullAddress: 'Chapali Rd, Bhangal, Budhanilkantha 44600, Kathmandu',
    plusCode: 'Q985+82 Budhanilkantha',
    coordinates: { lat: 27.7658631, lng: 85.3576044 },
    googleMapsUrl: 'https://maps.app.goo.gl/UKfRHP7kyRWA9AVk9',
    facebookUrl: 'https://www.facebook.com/rdreamgarden/',
    instagramUrl: 'https://www.instagram.com/resortdreamgarden/',
    instagramHandle: '@resortdreamgarden',
  },
  contact: {
    phoneDisplay: '981-5321221',
    phoneRaw: '9815321221',
    phoneInternational: '+9779815321221',
    telHref: 'tel:+9779815321221',
    landlineDisplay: '01-4376456',
    landlineHref: 'tel:+97714376456',
    email: 'rdreamgarden@gmail.com',
  },
  ratingsAndPricing: {
    googleRating: 4.1,
    maxRating: 5,
    reviewCount: 378,
    facebookRecommendation: '84% Recommended on Facebook',
    priceRange: 'NPR 500–1,000 per person',
    vatNotice: 'All printed menu prices are inclusive of 13% VAT.',
  },
  hours: {
    reportedStatus: 'Open Daily · Garden Dining, Takeaway & Family Gatherings',
    verificationNotice: 'Call 981-5321221 or 01-4376456 for table bookings or group orders.',
  },
  localHighlights: [
    {
      id: 'spot-wicker-lawn',
      title: 'Outdoor Wicker Tables on the Green Lawn',
      nepaliSubtitle: 'हरियाली चौरमा आरामदायी आउटडोर टेबल',
      shortDesc: 'Woven wicker armchairs and glass-top tables set right on our manicured lawn.',
      imageSlotKey: 'gardenWickerLawn',
    },
    {
      id: 'spot-gazebo-terrace',
      title: 'Upper Stone Terrace & Green Gazebo Huts',
      nepaliSubtitle: 'ढुङ्गाको टेरेस र प्राइभेट गार्डेन हटहरू',
      shortDesc: 'Shaded green-roofed gazebo huts and upper stone terrace seating for groups.',
      imageSlotKey: 'upperGazeboTerrace',
    },
    {
      id: 'spot-bamboo-swing-heart',
      title: 'Tall Garden Swing (पिङ) & Heart Photo Arch',
      nepaliSubtitle: 'अग्लो पिङ र मुटु आकारको फोटो स्पट',
      shortDesc: 'Our tall bamboo-style swing and red heart photo frame arch on the main lawn.',
      imageSlotKey: 'bambooSwingHeartArch',
    },
    {
      id: 'spot-evening-led-swing',
      title: 'Evening Illuminated Nest Swing & Sign',
      nepaliSubtitle: 'साँझको झिलिमिली नेस्ट पिङ र लाइटिङ',
      shortDesc: 'Warm LED-lit hanging nest swing beside the illuminated Dreamgarden Resort sign.',
      imageSlotKey: 'eveningLedSwing',
    },
    {
      id: 'spot-daylight-hills',
      title: 'Main Dining Building & Shivapuri Hills',
      nepaliSubtitle: 'शिवपुरी डाँडाको फेदमा शान्त वातावरण',
      shortDesc: 'Red-roofed brick dining hall framed by the green hills of Budhanilkantha.',
      imageSlotKey: 'daylightBuildingHills',
    },
    {
      id: 'spot-rose-garden',
      title: 'Blooming Rose Garden & String-Light Canopy',
      nepaliSubtitle: 'गुलाफको बगैंचा र झिलिमिली बत्तीहरू',
      shortDesc: 'Fragrant pink roses and overhead canopy string lights across the courtyard.',
      imageSlotKey: 'roseGardenLights',
    },
    {
      id: 'spot-daylight-nest',
      title: 'Pergola Patio & Hanging Nest Chair',
      nepaliSubtitle: 'परगोला मुनिको झुल्ने कुर्सी',
      shortDesc: 'Relaxing woven nest swing suspended under the garden pergola.',
      imageSlotKey: 'daylightNestSwing',
    },
    {
      id: 'spot-walkway-courtyard',
      title: 'Paved Garden Walkway & Courtyard Trees',
      nepaliSubtitle: 'बगैंचाको बाटो र हरियाली आँगन',
      shortDesc: 'Spacious stone walkways and tree-shaded family seating with free parking.',
      imageSlotKey: 'gardenWalkwaySwing',
    },
  ] as LocalHighlightSpot[],
};
