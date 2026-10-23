import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageAsset } from '../data/images';
import { EditorialImage } from './EditorialImage';

interface LightboxModalProps {
  assets: ImageAsset[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  assets,
  activeIndex,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % assets.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + assets.length) % assets.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, assets.length, onClose, onSelectIndex]);

  if (activeIndex === null || !assets[activeIndex]) return null;

  const currentAsset = assets[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo preview: ${currentAsset.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-[#243028] bg-[#131915] text-[#F4F7F4] shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#243028] px-5 py-3">
          <div className="text-xs text-[#C8D0CA]">
            <span>{currentAsset.category}</span>
            <span aria-hidden="true"> · </span>
            <span className="font-mono-num text-[#44B649]">
              {activeIndex + 1} / {assets.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex h-8 w-8 items-center justify-center text-[#C8D0CA] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Image Viewport */}
        <div className="relative flex flex-1 items-center justify-center bg-[#0D110E] p-2 sm:p-6">
          <div className="w-full max-w-4xl">
            <EditorialImage asset={currentAsset} priority />
          </div>

          {assets.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => onSelectIndex((activeIndex - 1 + assets.length) % assets.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[#44B649]/50 bg-[#0D110E]/85 p-2.5 text-white transition-colors hover:bg-[#44B649] focus-visible:outline-2 focus-visible:outline-[#44B649]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => onSelectIndex((activeIndex + 1) % assets.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[#44B649]/50 bg-[#0D110E]/85 p-2.5 text-white transition-colors hover:bg-[#44B649] focus-visible:outline-2 focus-visible:outline-[#44B649]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Single-line Caption */}
        <div className="border-t border-[#243028] bg-[#131915] px-5 py-3.5">
          <h3 className="font-display text-xl font-bold text-[#F4F7F4]">
            {currentAsset.title}
          </h3>
        </div>
      </div>
    </div>
  );
};
