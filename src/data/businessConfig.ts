export interface LocalHighlightSpot {
  id: string;
  title: string;
  nepaliSubtitle: string;
  shortDesc: string;
  imageSlotKey: string;
}

export interface GoogleReviewItem {
  id: string;
  author: string;
  badge: string;
  rating: number;
  timeAgo: string;
  text: string;
  photoSlotKeys: string[];
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
  googleReviews: [
    {
      id: 'rev-dikshya',
      author: 'Dikshya Adhikari',
      badge: 'Local Guide · 77 reviews',
      rating: 5,
      timeAgo: 'a year ago',
      text: 'We went for dinner & the food was very delicious except for the biryani, other than that everything we ordered was yum. Also the place is very spacious & the staffs were polite & friendly. Good place for gathering & different occasions.',
      photoSlotKeys: ['eveningBuildingLights', 'eveningLawnLights'],
    },
    {
      id: 'rev-pratiksha',
      author: 'Pratiksha Rai',
      badge: '10 reviews',
      rating: 4,
      timeAgo: '4 months ago',
      text: "Honestly staffs were very nice and so the atmosphere...it is a very clean place and about the food if you are confuse you can ask the staff they will suggest you the best food and it is good, it's great... satisfied 🙂",
      photoSlotKeys: ['shadedGardenSteps'],
    },
    {
      id: 'rev-nawa',
      author: 'Nawa Pandhak Limbu',
      badge: '6 reviews',
      rating: 4,
      timeAgo: 'a year ago',
      text: 'The food was yummy, but the only bit that i did not enjoy was the wait time. I would just advise you to order when the servers bring you the menu or look through the menu before you visit the place. I do recommend the sadheko momo 😋. The ambience is beautiful as night falls.',
      photoSlotKeys: ['freshFruitSalad'],
    },
  ] as GoogleReviewItem[],
  localHighlights: [
    {
      id: 'spot-wicker-lawn',
      title: 'Outdoor Wicker Lawn Tables',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'gardenWickerLawn',
    },
    {
      id: 'spot-gazebo-terrace',
      title: 'Stone Terrace & Gazebo Huts',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'upperGazeboTerrace',
    },
    {
      id: 'spot-bamboo-swing-heart',
      title: 'Tall Garden Swing & Heart Arch',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'bambooSwingHeartArch',
    },
    {
      id: 'spot-evening-led-swing',
      title: 'Evening Illuminated Nest Swing',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'eveningLedSwing',
    },
    {
      id: 'spot-daylight-hills',
      title: 'Main Dining Hall & Hills',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'daylightBuildingHills',
    },
    {
      id: 'spot-rose-garden',
      title: 'Rose Garden & Canopy Lights',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'roseGardenLights',
    },
    {
      id: 'spot-daylight-nest',
      title: 'Pergola Patio & Nest Chair',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'daylightNestSwing',
    },
    {
      id: 'spot-walkway-courtyard',
      title: 'Garden Walkway & Courtyard',
      nepaliSubtitle: '',
      shortDesc: '',
      imageSlotKey: 'gardenWalkwaySwing',
    },
  ] as LocalHighlightSpot[],
};
