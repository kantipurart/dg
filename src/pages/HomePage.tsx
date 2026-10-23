import React, { useState } from 'react';
import { ArrowRight, MapPin, Phone, ExternalLink, Plus, Check, Utensils } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { ImageAsset } from '../data/images';
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategoryId, MenuItem } from '../data/menuData';
import { EditorialImage } from '../components/EditorialImage';
import { PageId } from '../components/Navbar';
import { GoodFoodBrighterMoodsBadge } from '../components/DreamGardenLogo';

interface HomePageProps {
  imageAssets: Record<string, ImageAsset>;
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (assetKey: string) => void;
  onAddToShortlist: (item: MenuItem) => void;
  shortlistIds: Set<string>;
}

const HOME_MENU_CATEGORIES = MENU_CATEGORIES.filter((c) => !c.isAlcoholic);

export const HomePage: React.FC<HomePageProps> = ({
  imageAssets,
  onNavigate,
  onOpenLightbox,
  onAddToShortlist,
  shortlistIds,
}) => {
  const [activeMenuTab, setActiveMenuTab] = useState<MenuCategoryId>('nepali-khaja-sekuwa');

  const activeCategoryItems = MENU_ITEMS.filter((item) => item.categoryId === activeMenuTab);

  const goToPage = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0D110E] text-[#F4F7F4]">
      {/* 1. Minimal Full-Screen Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-[#0D110E] pt-28 pb-14 sm:pb-20">
        <div className="absolute inset-0">
          <img
            src={imageAssets.heroGarden.src}
            alt={imageAssets.heroGarden.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D110E] via-[#0D110E]/70 to-[#0D110E]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D110E]/95 via-[#0D110E]/65 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#44B649] uppercase">
              <MapPin className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
              <span>Chapali Bhangal, Budhanilkantha</span>
            </p>

            <h1
              className="mt-3 font-display text-5xl font-bold leading-[1.06] tracking-tight sm:text-7xl"
              style={{ textWrap: 'balance' }}
            >
              <span className="block text-white">Crispy Bites.</span>
              <span className="mt-1 block text-[#44B649]">Happy Evenings.</span>
            </h1>

            <div className="mt-4 h-1 w-14 bg-[#44B649]" aria-hidden="true" />

            <p className="mt-4 text-base font-medium text-[#D7DFD9] sm:text-lg" lang="ne">
              हरियाली बगैंचा र मिठो खाना — ड्रीम गार्डेन रिसोर्ट, चपली भंगाल
            </p>

            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#B4BCB6] sm:text-base">
              {BUSINESS_CONFIG.shortIntro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#home-menu-section"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#44B649] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-colors hover:bg-[#3CA341] whitespace-nowrap shrink-0"
              >
                <Utensils className="h-4 w-4" aria-hidden="true" />
                <span>View Menu</span>
              </a>
              <button
                type="button"
                onClick={() => goToPage('gallery')}
                className="inline-flex items-center gap-2 rounded-full border border-[#44B649]/60 bg-[#131915]/90 px-6 py-3.5 text-xs font-bold tracking-wider text-[#F4F7F4] uppercase transition-colors hover:border-[#44B649] hover:bg-[#18201B] whitespace-nowrap shrink-0"
              >
                <span>Photos</span>
                <ArrowRight className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-10 pt-2">
              <GoodFoodBrighterMoodsBadge />
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Contact Strip */}
      <section className="border-y border-[#243028] bg-[#131915] py-3.5 text-xs text-[#D2DAD4]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-white">Dream Garden Resort</span>
            <span aria-hidden="true" className="text-[#56635A]">·</span>
            <span>Chapali Bhangal, Budhanilkantha</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={BUSINESS_CONFIG.contact.telHref}
              className="font-mono-num font-bold text-[#44B649] hover:underline"
            >
              {BUSINESS_CONFIG.contact.phoneDisplay} / {BUSINESS_CONFIG.contact.landlineDisplay}
            </a>
            <span aria-hidden="true" className="text-[#56635A]">·</span>
            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-[#44B649]"
            >
              Directions
            </a>
          </div>
        </div>
      </section>

      {/* 2. Menu Section */}
      <section
        id="home-menu-section"
        className="border-b border-[#243028] bg-[#0D110E] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-5xl">
                <span className="text-white">Good Food. </span>
                <span className="text-[#44B649]">Brighter Moods.</span>
              </h2>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={() => goToPage('menu')}
              className="inline-flex items-center gap-2 rounded-full bg-[#44B649] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#3CA341] whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <span>Full Menu</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* 3 Food Photos */}
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

          {/* 5 Clean Category Tabs */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
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
                  {cat.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Clean 2-Column Dish Price List */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {activeCategoryItems.map((dish) => {
              const isAdded = shortlistIds.has(dish.id);
              return (
                <div
                  key={dish.id}
                  className="flex items-center justify-between gap-4 border border-[#243028] bg-[#131915] px-5 py-4 transition-colors hover:border-[#44B649]/60"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold text-white">
                      {dish.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-[#9BA39E]">{dish.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono-num text-sm font-bold text-[#44B649]">
                      {dish.priceDisplay}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAddToShortlist(dish)}
                      aria-label={`Add ${dish.name}`}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'border-[#44B649] bg-[#44B649] text-white'
                          : 'border-[#2E3D33] bg-[#18201B] text-[#E6ECE8] hover:border-[#44B649] hover:text-[#44B649]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2 Featured Menu / Food Photos with Single Line Below */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="border border-[#243028] bg-[#131915] p-3">
              <EditorialImage
                asset={imageAssets.instaCrispyBites}
                onClick={() => onOpenLightbox('instaCrispyBites')}
              />
              <h3 className="mt-3 px-1 font-display text-xl font-bold text-white">
                {imageAssets.instaCrispyBites.title}
              </h3>
            </div>

            <div className="border border-[#243028] bg-[#131915] p-3">
              <EditorialImage
                asset={imageAssets.scannedMenuSheet}
                onClick={() => onOpenLightbox('scannedMenuSheet')}
              />
              <h3 className="mt-3 px-1 font-display text-xl font-bold text-white">
                {imageAssets.scannedMenuSheet.title}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Garden & Swings Photos (Single Text Line Under Each Photo) */}
      <section className="border-b border-[#243028] bg-[#111713] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-5xl">
                <span className="text-white">Lush Garden. </span>
                <span className="text-[#44B649]">More Good Days.</span>
              </h2>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={() => goToPage('gallery')}
              className="inline-flex items-center gap-2 rounded-full border border-[#44B649] px-5 py-2.5 text-xs font-bold tracking-wider text-[#44B649] uppercase transition-colors hover:bg-[#44B649] hover:text-white whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <span>All Photos</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BUSINESS_CONFIG.localHighlights.map((spot) => {
              const asset = imageAssets[spot.imageSlotKey] || imageAssets.heroGarden;
              return (
                <div
                  key={spot.id}
                  className="border border-[#243028] bg-[#161E19] p-3 transition-colors hover:border-[#44B649]"
                >
                  <EditorialImage
                    asset={asset}
                    onClick={() => onOpenLightbox(spot.imageSlotKey)}
                  />
                  <h3 className="mt-3 px-1 font-display text-xl font-bold text-white">
                    {spot.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Location & Map */}
      <section className="bg-[#0D110E] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="flex flex-col justify-between border border-[#243028] bg-[#131915] p-6 sm:p-8 lg:col-span-5">
              <div>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  Visit Us in <span className="text-[#44B649]">Budhanilkantha.</span>
                </h2>
                <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />

                <div className="mt-6 space-y-3 text-sm text-[#C8D0CA]">
                  <p>
                    <strong className="text-white">Address:</strong> {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a
                      href={BUSINESS_CONFIG.contact.telHref}
                      className="font-mono-num font-bold text-[#44B649] underline"
                    >
                      {BUSINESS_CONFIG.contact.phoneDisplay}
                    </a>{' '}
                    / {BUSINESS_CONFIG.contact.landlineDisplay}
                  </p>
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

            <div className="min-h-[340px] overflow-hidden border border-[#243028] bg-[#131915] lg:col-span-7">
              <iframe
                title="Map showing Chapali Bhangal, Budhanilkantha location of Dream Garden Resort"
                src="https://www.google.com/maps?q=Dream+Garden+Resort+Budhanilkantha+Kathmandu+Nepal&output=embed"
                className="h-full min-h-[340px] w-full border-0"
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
