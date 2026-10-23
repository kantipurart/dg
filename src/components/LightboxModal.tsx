import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { ImageAsset } from '../data/images';
import { EditorialImage } from './EditorialImage';

interface LightboxModalProps {
  assets: ImageAsset[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onSaveCustomUrl?: (slotKey: string, url: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  assets,
  activeIndex,
  onClose,
  onSelectIndex,
  onSaveCustomUrl,
}) => {
  const [showReplaceInput, setShowReplaceInput] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

  useEffect(() => {
    setShowReplaceInput(false);
    setCustomUrlInput('');
  }, [activeIndex]);

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

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim() || !onSaveCustomUrl) return;
    onSaveCustomUrl(currentAsset.slotKey, customUrlInput.trim());
    setShowReplaceInput(false);
  };

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
          <div className="flex items-center gap-3">
            {onSaveCustomUrl && (
              <button
                type="button"
                onClick={() => setShowReplaceInput((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#44B649] hover:text-white"
              >
                <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Paste Facebook / Maps Photo Link</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="inline-flex h-8 w-8 items-center justify-center text-[#C8D0CA] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Optional Facebook/Maps Photo Link Form */}
        {showReplaceInput && (
          <form
            onSubmit={handleApplyUrl}
            className="flex flex-col gap-2 border-b border-[#243028] bg-[#0D110E] px-5 py-3 sm:flex-row sm:items-center"
          >
            <label htmlFor="custom-photo-url" className="text-xs text-[#C8D0CA] shrink-0">
              Facebook / Google Maps Image URL:
            </label>
            <input
              id="custom-photo-url"
              type="url"
              required
              placeholder="Paste image address from Facebook or Google Maps..."
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              className="flex-1 border border-[#2B382F] bg-[#131915] px-3 py-1.5 text-xs text-white placeholder-[#7A857E] focus:border-[#44B649] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[#44B649] px-4 py-1.5 text-xs font-bold text-white uppercase hover:bg-[#3CA341] whitespace-nowrap shrink-0"
            >
              Use This Photo
            </button>
          </form>
        )}

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

        {/* Concise Bilingual Caption */}
        <div className="border-t border-[#243028] bg-[#131915] px-5 py-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-[#F4F7F4]">
              {currentAsset.title} · <span className="text-[#44B649]" lang="ne">{currentAsset.nepaliTitle}</span>
            </h3>
            <span className="text-xs font-semibold text-[#44B649]">{currentAsset.sourceLabel}</span>
          </div>
          <p className="mt-1 text-xs text-[#9BA39E]">{currentAsset.caption}</p>
        </div>
      </div>
    </div>
  );
};
