import React, { useState, useMemo } from 'react';
import { Camera, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { GALLERY_CATEGORIES, GalleryCategory, ImageAsset } from '../data/images';
import { EditorialImage } from '../components/EditorialImage';
import { DreamGardenWordmark } from '../components/DreamGardenLogo';

interface GalleryPageProps {
  imageAssets: Record<string, ImageAsset>;
  onOpenLightboxByIndex: (index: number, filteredList: ImageAsset[]) => void;
  onOpenOwnerGuide: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  imageAssets,
  onOpenLightboxByIndex,
  onOpenOwnerGuide,
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'All'>('All');

  const allAssets = useMemo(() => Object.values(imageAssets), [imageAssets]);

  const filteredAssets = useMemo(() => {
    if (activeCategory === 'All') return allAssets;
    return allAssets.filter((asset) => asset.category === activeCategory);
  }, [allAssets, activeCategory]);

  return (
    <div className="bg-[#0D110E] pt-20 text-[#F4F7F4]">
      {/* Compact Header */}
      <section className="border-b border-[#243028] bg-[#111713] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#44B649] uppercase">
                Google Maps Reviews & @resortdreamgarden · चपली भंगाल
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
                <DreamGardenWordmark className="text-3xl sm:text-5xl" />
                <span className="text-white"> · १४ वास्तविक फोटोहरू</span>
              </h1>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={BUSINESS_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] bg-[#131915] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#18201B]"
              >
                <span>Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_CONFIG.location.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] bg-[#131915] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#18201B]"
              >
                <span>{BUSINESS_CONFIG.location.instagramHandle}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={onOpenOwnerGuide}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#44B649] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#3CA341]"
              >
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Import Photo URL</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'All'}
              onClick={() => setActiveCategory('All')}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                activeCategory === 'All'
                  ? 'border-[#44B649] bg-[#44B649] text-white'
                  : 'border-[#2B382F] bg-[#0D110E] text-[#C8D0CA] hover:border-[#44B649]'
              }`}
            >
              All Photos ({allAssets.length})
            </button>
            {GALLERY_CATEGORIES.map((category) => {
              const count = allAssets.filter((a) => a.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                    activeCategory === category
                      ? 'border-[#44B649] bg-[#44B649] text-white'
                      : 'border-[#2B382F] bg-[#0D110E] text-[#C8D0CA] hover:border-[#44B649]'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Big Photo Grid */}
      <section className="bg-[#0D110E] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssets.map((asset, index) => (
              <article
                key={asset.id}
                className="flex flex-col justify-between border border-[#243028] bg-[#131915] p-3 transition-colors hover:border-[#44B649]"
              >
                <div>
                  <EditorialImage
                    asset={asset}
                    onClick={() => onOpenLightboxByIndex(index, filteredAssets)}
                  />
                  <div className="mt-3.5 px-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-[#44B649]" lang="ne">
                        {asset.nepaliTitle}
                      </p>
                      <span className="text-[10px] font-semibold tracking-wider text-[#8E9396] uppercase">
                        {asset.sourceLabel}
                      </span>
                    </div>
                    <h2 className="mt-0.5 font-display text-xl font-bold text-white">
                      {asset.title}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#9BA39E]">{asset.caption}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
