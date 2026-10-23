import React, { useState, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { GALLERY_CATEGORIES, GalleryCategory, ImageAsset } from '../data/images';
import { EditorialImage } from '../components/EditorialImage';

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
      <section className="border-b border-[#243028] bg-[#111713] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
                Photo <span className="text-[#44B649]">Gallery</span>
              </h1>
              <div className="mt-3 h-1 w-12 bg-[#44B649]" aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={onOpenOwnerGuide}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#2B382F] bg-[#131915] px-4 py-2 text-xs font-bold text-[#C8D0CA] hover:border-[#44B649] hover:text-white self-start sm:self-auto"
            >
              <Camera className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
              <span>Replace Photo</span>
            </button>
          </div>

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
              All ({allAssets.length})
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

      {/* Photo Grid — Single Text Line Under Each Photo */}
      <section className="bg-[#0D110E] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssets.map((asset, index) => (
              <article
                key={asset.id}
                className="border border-[#243028] bg-[#131915] p-3 transition-colors hover:border-[#44B649]"
              >
                <EditorialImage
                  asset={asset}
                  onClick={() => onOpenLightboxByIndex(index, filteredAssets)}
                />
                <h2 className="mt-3 px-1 font-display text-xl font-bold text-white">
                  {asset.title}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
