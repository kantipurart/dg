import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  MapPin,
  Phone,
  ExternalLink,
  Plus,
  Minus,
  Utensils,
  CalendarCheck,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { ImageAsset } from '../data/images';
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategoryId, MenuItem } from '../data/menuData';
import { EditorialImage } from '../components/EditorialImage';
import { PageId } from '../components/Navbar';
import {
  GoodFoodBrighterMoodsBadge,
  DreamGardenWordmark,
} from '../components/DreamGardenLogo';
import { ShortlistEntry } from '../utils/menuLogic';

interface HomePageProps {
  imageAssets: Record<string, ImageAsset>;
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (assetKey: string) => void;
  onAddToShortlist: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  shortlist: ShortlistEntry[];
}

const HOME_MENU_CATEGORIES = MENU_CATEGORIES.filter((c) => !c.isAlcoholic);

const VISITOR_ESSENTIALS = [
  {
    num: '01.',
    title: 'Free Car & Bike Parking',
    nepali: 'प्रशस्त पार्किङ सुविधा',
    detail: 'Spacious inside-compound parking off Chapali Bhangal road.',
  },
  {
    num: '02.',
    title: 'Private Huts & Family Lawn',
    nepali: 'प्राइभेट हट र हरियाली बगैंचा',
    detail: 'Wicker garden tables, private group gazebos & indoor hall.',
  },
  {
    num: '03.',
    title: 'Swings & Photo Spots',
    nepali: 'पिङ र फोटो स्पटहरू',
    detail: 'LED evening nest swing, tall bamboo swing & floral arch.',
  },
  {
    num: '04.',
    title: 'Open Daily · 13% VAT Incl.',
    nepali: 'दैनिक खुला · स्पष्ट मेनु दररेट',
    detail: 'All printed menu NPR prices include 13% VAT with no hidden fees.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  imageAssets,
  onNavigate,
  onOpenLightbox,
  onAddToShortlist,
  onUpdateQuantity,
  shortlist,
}) => {
  const [activeMenuTab, setActiveMenuTab] = useState<'popular' | MenuCategoryId>('popular');
  const [homeDietary, setHomeDietary] = useState<'all' | 'veg' | 'non-veg'>('all');

  const shortlistMap = useMemo(() => {
    const map = new Map<string, number>();
    shortlist.forEach((s) => map.set(s.item.id, s.quantity));
    return map;
  }, [shortlist]);

  const displayedMenuItems = useMemo(() => {
    const base =
      activeMenuTab === 'popular'
        ? MENU_ITEMS.filter((item) => item.featuredOnHome && item.categoryId !== 'cocktails-bar')
        : MENU_ITEMS.filter((item) => item.categoryId === activeMenuTab);

    if (homeDietary === 'all') return base;
    if (homeDietary === 'veg') {
      return base.filter((item) => item.dietary === 'veg' || item.dietary === 'beverage');
    }
    return base.filter((item) => item.dietary === 'non-veg');
  }, [activeMenuTab, homeDietary]);

  const goToPage = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0D110E] text-[#F4F7F4]">
      {/* 1. Full-Screen Hero styled after the official @resortdreamgarden Instagram aesthetic */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-[#0D110E] pt-28 pb-16 sm:pb-22">
        <div className="absolute inset-0">
          <img
            src={imageAssets.heroGarden.src}
            alt={imageAssets.heroGarden.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          {/* Deep candle-lit gradient overlays matching image_e85f76e1.png */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D110E] via-[#0D110E]/70 to-[#0D110E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D110E]/95 via-[#0D110E]/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Highlighted DreamGarden Brand Kicker */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
              <DreamGardenWordmark showResort className="text-base sm:text-lg" />
              <span aria-hidden="true" className="text-[#44B649]">·</span>
              <span lang="ne" className="font-semibold text-[#E2E8E4]">
                {BUSINESS_CONFIG.nepaliName}
              </span>
              <span aria-hidden="true" className="text-[#6E7872]">·</span>
              <span className="inline-flex items-center gap-1 font-medium text-[#C8D0CA]">
                <MapPin className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
                <span>Chapali Bhangal, Budhanilkantha</span>
              </span>
            </div>

            {/* Two-Tone White + #44B649 Leaf Green Serif Heading + Short Green Underline Bar */}
            <h1
              className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
              style={{ textWrap: 'balance' }}
            >
              <span className="block text-white">Crispy Bites.</span>
              <span className="mt-1 block text-[#44B649]">Happy Evenings.</span>
            </h1>

            <div className="mt-4 h-1 w-16 bg-[#44B649]" aria-hidden="true" />

            <p className="mt-4 text-base font-medium text-[#E2E8E4] sm:text-lg" lang="ne">
              हरियाली बगैंचा, पिङ र मिठो परिकार — ड्रीम गार्डेन रिसोर्ट, चपली भंगाल
            </p>

            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#C2CAC4] sm:text-base">
              Welcome to <DreamGardenWordmark showResort /> in Budhanilkantha, Kathmandu. Enjoy
              authentic Nepali Khana sets, Mustang Mo:Mo, smoky Sekuwa, clay-oven Tandoori, and
              fresh oven pizza across our sunlit garden lawn, private gazebo huts, and photo swings.
            </p>

            {/* Primary User Actions: Menu, Table Booking & Real Photos */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#home-menu-section"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#44B649] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-colors hover:bg-[#3CA341] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649]"
              >
                <Utensils className="h-4 w-4" aria-hidden="true" />
                <span>Menu & NPR Prices (मेनु हेर्नुहोस्)</span>
              </a>
              <button
                type="button"
                onClick={() => goToPage('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-[#44B649] bg-[#131915]/95 px-6 py-3.5 text-xs font-bold tracking-wider text-[#F4F7F4] uppercase transition-colors hover:bg-[#44B649] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649]"
              >
                <CalendarCheck className="h-4 w-4 text-[#44B649] group-hover:text-white" aria-hidden="true" />
                <span>Book Garden Table / Hut</span>
              </button>
              <button
                type="button"
                onClick={() => goToPage('gallery')}
                className="inline-flex items-center gap-2 rounded-full border border-[#344439] bg-[#0D110E]/85 px-5 py-3.5 text-xs font-semibold tracking-wider text-[#D7DFD9] uppercase transition-colors hover:border-[#44B649] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649]"
              >
                <span>14 Real Photos</span>
                <ArrowRight className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-10 pt-1">
              <GoodFoodBrighterMoodsBadge />
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Trust & Quick Info Bar (Google Maps & Official Contacts) */}
      <section className="border-y border-[#243028] bg-[#131915] py-4 text-xs text-[#D2DAD4]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono-num font-bold text-[#44B649]">
              ★ {BUSINESS_CONFIG.ratingsAndPricing.googleRating}/5 ({BUSINESS_CONFIG.ratingsAndPricing.reviewCount} Google Reviews)
            </span>
            <span aria-hidden="true" className="text-[#56635A]">·</span>
            <span>{BUSINESS_CONFIG.ratingsAndPricing.priceRange}</span>
            <span aria-hidden="true" className="text-[#56635A]">·</span>
            <span>{BUSINESS_CONFIG.ratingsAndPricing.vatNotice}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={BUSINESS_CONFIG.contact.telHref}
              className="font-mono-num font-bold text-white underline decoration-[#44B649] underline-offset-4 hover:text-[#44B649]"
            >
              Call: {BUSINESS_CONFIG.contact.phoneDisplay} / {BUSINESS_CONFIG.contact.landlineDisplay}
            </a>
            <span aria-hidden="true" className="text-[#56635A]">·</span>
            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#44B649] hover:underline"
            >
              Directions (Q985+82)
            </a>
            <span aria-hidden="true" className="text-[#56635A]">·</span>
            <a
              href={BUSINESS_CONFIG.location.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D2DAD4] hover:text-[#44B649] hover:underline"
            >
              {BUSINESS_CONFIG.location.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      {/* Visitor Essentials Strip for Typical Guests */}
      <section className="border-b border-[#243028] bg-[#0F1511] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VISITOR_ESSENTIALS.map((item) => (
              <div
                key={item.num}
                className="border-l-2 border-[#44B649] pl-4"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-num text-xs font-bold text-[#44B649]">
                    {item.num}
                  </span>
                  <h2 className="font-sans text-sm font-bold text-white">
                    {item.title}
                  </h2>
                </div>
                <p className="mt-0.5 text-xs font-medium text-[#44B649]" lang="ne">
                  {item.nepali}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#9BA39E]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Easy-to-Find Menu & Printed Menu Card Prices Right on the Home Page */}
      <section
        id="home-menu-section"
        className="border-b border-[#243028] bg-[#0D110E] py-16 sm:py-22"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#44B649] uppercase">
                Verified Printed Menu · मेनु र खाजा दररेट (13% VAT Included)
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-5xl">
                <span className="text-white">Good Food at </span>
                <DreamGardenWordmark className="text-3xl sm:text-5xl" />
              </h2>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
              {/* Quick Veg / Non-Veg toggle right on Home Page */}
              <div
                role="group"
                aria-label="Filter dishes by dietary preference"
                className="inline-flex rounded-full border border-[#2B382F] bg-[#131915] p-1"
              >
                {(
                  [
                    ['all', 'All'],
                    ['veg', 'Veg (भेज)'],
                    ['non-veg', 'Non-Veg'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setHomeDietary(key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      homeDietary === key
                        ? 'bg-[#44B649] text-white'
                        : 'text-[#B4BCB6] hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToPage('menu')}
                className="inline-flex items-center gap-2 rounded-full bg-[#44B649] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#3CA341] whitespace-nowrap shrink-0"
              >
                <span>Full 68-Dish Menu</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* 3 Unique Google Maps Customer Review Food Photos */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="border border-[#243028] bg-[#131915] p-2.5">
              <EditorialImage
                asset={imageAssets.mustangMomoSekuwa}
                onClick={() => onOpenLightbox('mustangMomoSekuwa')}
                showCaptionOverlay
              />
            </div>
            <div className="border border-[#243028] bg-[#131915] p-2.5">
              <EditorialImage
                asset={imageAssets.nepaliKhanaThali}
                onClick={() => onOpenLightbox('nepaliKhanaThali')}
                showCaptionOverlay
              />
            </div>
            <div className="border border-[#243028] bg-[#131915] p-2.5">
              <EditorialImage
                asset={imageAssets.continentalSizzler}
                onClick={() => onOpenLightbox('continentalSizzler')}
                showCaptionOverlay
              />
            </div>
          </div>

          {/* Popular Favorites + 5 Clean Category Tabs */}
          <div
            role="tablist"
            aria-label="Quick Menu Categories"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeMenuTab === 'popular'}
              onClick={() => setActiveMenuTab('popular')}
              className={`rounded-full border px-5 py-2.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                activeMenuTab === 'popular'
                  ? 'border-[#44B649] bg-[#44B649] text-white'
                  : 'border-[#2B382F] bg-[#131915] text-[#C8D0CA] hover:border-[#44B649] hover:text-white'
              }`}
            >
              <span>★ Popular Favorites</span>
              <span className="ml-1.5 opacity-90" lang="ne">
                (लोकप्रिय)
              </span>
            </button>

            {HOME_MENU_CATEGORIES.map((cat) => {
              const isSelected = activeMenuTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveMenuTab(cat.id)}
                  className={`rounded-full border px-5 py-2.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'border-[#44B649] bg-[#44B649] text-white'
                      : 'border-[#2B382F] bg-[#131915] text-[#C8D0CA] hover:border-[#44B649] hover:text-white'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <span className="ml-1.5 opacity-90" lang="ne">
                    ({cat.nepaliTitle.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scannable 2-Column Dish Price List with Veg/Non-Veg indicator & Quantity control */}
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {displayedMenuItems.map((dish) => {
              const qty = shortlistMap.get(dish.id) || 0;
              const isVeg = dish.dietary === 'veg' || dish.dietary === 'beverage';
              return (
                <div
                  key={dish.id}
                  className="flex items-center justify-between gap-4 border border-[#243028] bg-[#131915] px-5 py-4 transition-colors hover:border-[#44B649]/60"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
                          isVeg ? 'bg-[#44B649]' : 'bg-[#E05A47]'
                        }`}
                        title={isVeg ? 'Vegetarian / Beverage' : 'Non-Vegetarian'}
                        aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      />
                      <h3 className="font-display text-xl font-bold text-white">
                        {dish.name}
                      </h3>
                      {dish.nepaliLabel && (
                        <span className="text-xs font-medium text-[#44B649]" lang="ne">
                          · {dish.nepaliLabel}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-xs text-[#9BA39E]">{dish.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono-num text-sm font-bold text-[#44B649]">
                      {dish.priceDisplay}
                    </span>
                    {qty > 0 ? (
                      <div className="inline-flex items-center rounded-full border border-[#44B649] bg-[#0D110E]">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${dish.name}`}
                          onClick={() => onUpdateQuantity(dish.id, -1)}
                          className="px-2.5 py-1.5 text-xs text-white hover:text-[#44B649]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono-num px-2 text-xs font-bold text-white">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${dish.name}`}
                          onClick={() => onUpdateQuantity(dish.id, 1)}
                          className="px-2.5 py-1.5 text-xs text-white hover:text-[#44B649]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToShortlist(dish)}
                        aria-label={`Add ${dish.name} to order inquiry`}
                        className="inline-flex items-center gap-1 rounded-full border border-[#2E3D33] bg-[#18201B] px-3.5 py-1.5 text-xs font-bold text-[#E6ECE8] transition-colors hover:border-[#44B649] hover:text-[#44B649] whitespace-nowrap shrink-0"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official @resortdreamgarden Post + Scanned Menu Sheet Feature (2 Unique Photos) */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="border border-[#243028] bg-[#131915] p-4">
              <EditorialImage
                asset={imageAssets.instaCrispyBites}
                onClick={() => onOpenLightbox('instaCrispyBites')}
              />
              <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-2 px-1">
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#44B649] uppercase">
                    Featured on Instagram ({BUSINESS_CONFIG.location.instagramHandle})
                  </p>
                  <h3 className="mt-0.5 font-display text-2xl font-bold text-white">
                    {imageAssets.instaCrispyBites.title}
                  </h3>
                </div>
                <a
                  href={BUSINESS_CONFIG.location.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#44B649] hover:underline"
                >
                  <span>@resortdreamgarden</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="border border-[#243028] bg-[#131915] p-4">
              <EditorialImage
                asset={imageAssets.scannedMenuSheet}
                onClick={() => onOpenLightbox('scannedMenuSheet')}
              />
              <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-2 px-1">
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#44B649] uppercase">
                    Google Maps Menu Scan · All Prices Inclusive of 13% VAT
                  </p>
                  <h3 className="mt-0.5 font-display text-2xl font-bold text-white">
                    {imageAssets.scannedMenuSheet.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenLightbox('scannedMenuSheet')}
                  className="text-xs font-semibold text-[#44B649] hover:underline"
                >
                  Zoom Menu Card →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 8 Unique Google Maps Review Photos: Garden Lawn, Gazebo Huts & Swings */}
      <section className="border-b border-[#243028] bg-[#111713] py-16 sm:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#44B649] uppercase">
                Google Maps Review Photographs · बगैंचा र पिङ फोटोहरू
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-5xl">
                <span className="text-white">Inside </span>
                <DreamGardenWordmark className="text-3xl sm:text-5xl" />
                <span className="text-white"> · More Good Days.</span>
              </h2>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={() => goToPage('gallery')}
              className="inline-flex items-center gap-2 rounded-full border border-[#44B649] px-5 py-2.5 text-xs font-bold tracking-wider text-[#44B649] uppercase transition-colors hover:bg-[#44B649] hover:text-white whitespace-nowrap shrink-0"
            >
              <span>Open Full 14-Photo Gallery</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BUSINESS_CONFIG.localHighlights.map((spot) => {
              const asset = imageAssets[spot.imageSlotKey] || imageAssets.heroGarden;
              return (
                <div
                  key={spot.id}
                  className="group flex flex-col justify-between border border-[#243028] bg-[#161E19] p-3 transition-colors hover:border-[#44B649]"
                >
                  <div>
                    <EditorialImage
                      asset={asset}
                      onClick={() => onOpenLightbox(spot.imageSlotKey)}
                    />
                    <div className="mt-3.5 px-1">
                      <p className="text-[11px] font-semibold text-[#44B649]" lang="ne">
                        {spot.nepaliSubtitle}
                      </p>
                      <h3 className="mt-0.5 font-display text-xl font-bold text-white">
                        {spot.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#9BA39E]">
                        {spot.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Location & Direct Map (Chapali Bhangal, Budhanilkantha) */}
      <section className="bg-[#0D110E] py-16 sm:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="flex flex-col justify-between border border-[#243028] bg-[#131915] p-6 sm:p-8 lg:col-span-5">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-[#44B649] uppercase">
                  Easy Directions · हात्तीगौंडा / चपली भंगाल
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                  Visit <DreamGardenWordmark className="text-3xl sm:text-4xl" /> in{' '}
                  <span className="text-[#44B649]">Budhanilkantha.</span>
                </h2>
                <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-[#D2DAD4]" lang="ne">
                  {BUSINESS_CONFIG.nepaliName} — {BUSINESS_CONFIG.nepaliAreaName}
                </p>

                <div className="mt-6 space-y-3 text-sm text-[#C8D0CA]">
                  <p>
                    <strong className="text-white">Address:</strong> {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                  <p>
                    <strong className="text-white">Plus Code:</strong> {BUSINESS_CONFIG.location.plusCode}
                  </p>
                  <p>
                    <strong className="text-white">Landmark:</strong> 3 mins east of Hattigauda Chowk along the Chapali-Bhangal road
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a
                      href={BUSINESS_CONFIG.contact.telHref}
                      className="font-mono-num font-bold text-[#44B649] underline"
                    >
                      {BUSINESS_CONFIG.contact.phoneDisplay}
                    </a>{' '}
                    /{' '}
                    <a
                      href={BUSINESS_CONFIG.contact.landlineHref}
                      className="font-mono-num font-semibold text-[#D2DAD4] hover:text-white"
                    >
                      {BUSINESS_CONFIG.contact.landlineDisplay}
                    </a>
                  </p>
                  <p className="text-xs text-[#9BA39E]">{BUSINESS_CONFIG.hours.reportedStatus}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[#243028] pt-5">
                <a
                  href={BUSINESS_CONFIG.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#44B649] px-5 py-3 text-xs font-bold tracking-wider text-white uppercase hover:bg-[#3CA341]"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>Open Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_CONFIG.contact.telHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[#44B649] px-5 py-3 font-mono-num text-xs font-bold text-[#F4F7F4] uppercase hover:bg-[#18201B]"
                >
                  <Phone className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
                  <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="min-h-[360px] overflow-hidden border border-[#243028] bg-[#131915] lg:col-span-7">
              <iframe
                title="Map showing Chapali Bhangal, Budhanilkantha location of Dream Garden Resort"
                src="https://www.google.com/maps?q=Dream+Garden+Resort+Budhanilkantha+Kathmandu+Nepal&output=embed"
                className="h-full min-h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
