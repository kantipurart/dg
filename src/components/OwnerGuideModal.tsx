import React, { useState } from 'react';
import { X, RotateCcw, Check, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { ImageAsset } from '../data/images';

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageAssets: Record<string, ImageAsset>;
  onUpdateImage: (slotKey: string, newUrl: string) => void;
  onResetImages: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({
  isOpen,
  onClose,
  imageAssets,
  onUpdateImage,
  onResetImages,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('heroGarden');
  const [urlInput, setUrlInput] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onUpdateImage(selectedSlot, urlInput.trim());
    setSavedNotice(`Updated "${imageAssets[selectedSlot]?.title}".`);
    setUrlInput('');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Replace Photo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6"
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-[#243028] bg-[#131915] text-[#F4F7F4] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#243028] bg-[#0D110E] px-6 py-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Replace Photo
            </h2>
            <p className="text-xs text-[#9BA39E]">
              Dream Garden Resort — Chapali Bhangal, Budhanilkantha
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo importer"
            className="inline-flex h-8 w-8 items-center justify-center text-[#C8D0CA] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6 text-sm text-[#C8D0CA]">
          <div className="flex flex-wrap gap-3">
            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] bg-[#0D110E] px-4 py-2 text-xs font-bold text-white hover:bg-[#18201B]"
            >
              <span>1. Open Google Maps Photos</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
            </a>
            <a
              href={BUSINESS_CONFIG.location.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] bg-[#0D110E] px-4 py-2 text-xs font-bold text-white hover:bg-[#18201B]"
            >
              <span>2. Open Instagram ({BUSINESS_CONFIG.location.instagramHandle})</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
            </a>
          </div>

          <section className="border border-[#243028] bg-[#0D110E] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-xl font-bold text-white">
                Paste Any Image Address to Replace Slot
              </h3>
              <button
                type="button"
                onClick={() => {
                  onResetImages();
                  setSavedNotice('Restored default 14 Bhangal resort photographs.');
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#44B649] hover:underline"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3">
              <div>
                <label htmlFor="owner-slot-select" className="block text-xs font-bold text-[#C8D0CA]">
                  Select Photo Slot
                </label>
                <select
                  id="owner-slot-select"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="mt-1 w-full border border-[#2B382F] bg-[#131915] px-3 py-2 text-xs text-white focus:border-[#44B649] focus:outline-none"
                >
                  {Object.values(imageAssets).map((asset) => (
                    <option key={asset.slotKey} value={asset.slotKey}>
                      {asset.title} ({asset.nepaliTitle})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="owner-photo-url" className="block text-xs font-bold text-[#C8D0CA]">
                  Direct Image URL (Right-click photo on Google Maps / Facebook → Copy Image Address)
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="owner-photo-url"
                    type="text"
                    required
                    placeholder="https://..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 border border-[#2B382F] bg-[#131915] px-3 py-2 text-xs text-white focus:border-[#44B649] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#44B649] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#3CA341]"
                  >
                    Apply Photo
                  </button>
                </div>
              </div>
            </form>

            {savedNotice && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#44B649]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>{savedNotice}</span>
              </p>
            )}
          </section>
        </div>

        <div className="flex justify-end border-t border-[#243028] bg-[#0D110E] px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#44B649] px-5 py-2 text-xs font-bold text-white uppercase hover:bg-[#3CA341]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
