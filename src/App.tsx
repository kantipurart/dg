/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Phone, MapPin, Utensils, CalendarCheck, ArrowRight } from 'lucide-react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { OwnerGuideModal } from './components/OwnerGuideModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage, SavedInquiry } from './pages/ContactPage';
import {
  ImageAsset,
  loadImageAssets,
  saveImageOverride,
  resetImageOverrides,
} from './data/images';
import { MenuItem } from './data/menuData';
import { ShortlistEntry, calculateShortlistSummary } from './utils/menuLogic';
import { BUSINESS_CONFIG } from './data/businessConfig';

const VALID_PAGES: PageId[] = ['home', 'menu', 'gallery', 'contact'];

function resolvePageParam(raw: string | null): PageId | null {
  if (!raw) return null;
  if (VALID_PAGES.includes(raw as PageId)) return raw as PageId;
  return null;
}

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const params = new URLSearchParams(window.location.search);
  const fromQuery = resolvePageParam(params.get('page'));
  if (fromQuery) return fromQuery;
  const fromHash = resolvePageParam(window.location.hash.replace('#', ''));
  if (fromHash) return fromHash;
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [imageAssets, setImageAssets] = useState<Record<string, ImageAsset>>(loadImageAssets);
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [savedInquiries, setSavedInquiries] = useState<SavedInquiry[]>([]);

  // Lightbox state
  const [lightboxList, setLightboxList] = useState<ImageAsset[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Photo Importer Modal state
  const [ownerGuideOpen, setOwnerGuideOpen] = useState(false);

  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'Dream Garden Resort (ड्रीम गार्डेन रिसोर्ट) — Chapali Bhangal, Budhanilkantha',
      menu: 'Menu & Prices (मेनु) — Dream Garden Resort, Chapali Bhangal',
      gallery: 'Photos (फोटो) — Dream Garden Resort, Chapali Bhangal',
      contact: 'Location & Table Booking — Dream Garden Resort, Bhangal',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const shortlistSummary = useMemo(() => calculateShortlistSummary(shortlist), [shortlist]);

  const handleAddToShortlist = (item: MenuItem) => {
    setShortlist((prev) => {
      const existing = prev.find((s) => s.item.id === item.id);
      if (existing) {
        return prev.map((s) => (s.item.id === item.id ? { ...s, quantity: s.quantity + 1 } : s));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateShortlistQuantity = (itemId: string, delta: number) => {
    setShortlist((prev) =>
      prev
        .map((s) => (s.item.id === itemId ? { ...s, quantity: s.quantity + delta } : s))
        .filter((s) => s.quantity > 0)
    );
  };

  const handleClearShortlist = () => {
    setShortlist([]);
  };

  const handleOpenLightboxByKey = (slotKey: string) => {
    const allList = Object.values(imageAssets);
    const idx = allList.findIndex((a) => a.slotKey === slotKey);
    if (idx !== -1) {
      setLightboxList(allList);
      setLightboxIndex(idx);
    }
  };

  const handleOpenLightboxByIndex = (index: number, list: ImageAsset[]) => {
    setLightboxList(list);
    setLightboxIndex(index);
  };

  const handleUpdateImage = (slotKey: string, newUrl: string) => {
    const updated = saveImageOverride(slotKey, newUrl);
    setImageAssets(updated);
    if (lightboxIndex !== null) {
      setLightboxList(Object.values(updated));
    }
  };

  const handleResetImages = () => {
    const reset = resetImageOverrides();
    setImageAssets(reset);
    if (lightboxIndex !== null) {
      setLightboxList(Object.values(reset));
    }
  };

  const navigateAndScroll = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0D110E] pb-16 md:pb-0 text-[#F4F7F4]">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        shortlistCount={shortlistSummary.totalItems}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            imageAssets={imageAssets}
            onNavigate={setCurrentPage}
            onOpenLightbox={handleOpenLightboxByKey}
            onAddToShortlist={handleAddToShortlist}
            onUpdateQuantity={handleUpdateShortlistQuantity}
            shortlist={shortlist}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            shortlist={shortlist}
            onAddItem={handleAddToShortlist}
            onUpdateQuantity={handleUpdateShortlistQuantity}
            onClearShortlist={handleClearShortlist}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            imageAssets={imageAssets}
            onOpenLightboxByIndex={handleOpenLightboxByIndex}
            onOpenOwnerGuide={() => setOwnerGuideOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            shortlist={shortlist}
            preselectedPackage={null}
            savedInquiries={savedInquiries}
            onSaveInquiry={(inq) => setSavedInquiries((prev) => [inq, ...prev])}
            onClearInquiries={() => setSavedInquiries([])}
          />
        )}
      </main>

      <Footer
        onNavigate={setCurrentPage}
        onOpenOwnerGuide={() => setOwnerGuideOpen(true)}
      />

      {/* Floating Selected Dishes Bar (when user shortlists dishes on Home or Gallery) */}
      {shortlistSummary.totalItems > 0 && currentPage !== 'contact' && (
        <div
          role="region"
          aria-label="Selected dishes summary"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-[#44B649]/60 bg-[#111813]/95 px-4 py-3 shadow-2xl backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="font-mono-num font-bold text-[#44B649]">
                {shortlistSummary.totalItems} {shortlistSummary.totalItems === 1 ? 'Dish' : 'Dishes'} Selected
              </span>
              <span aria-hidden="true" className="text-[#56635A]">·</span>
              <span className="font-mono-num font-bold text-white">
                NPR {shortlistSummary.knownTotalNpr.toLocaleString()}
              </span>
              <span className="hidden text-xs text-[#9BA39E] sm:inline">
                (13% VAT Included)
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => navigateAndScroll('contact')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#44B649] px-5 py-2 text-xs font-bold tracking-wider text-white uppercase hover:bg-[#3CA341] whitespace-nowrap shrink-0"
              >
                <span>Book Table with Order</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <a
                href={BUSINESS_CONFIG.contact.telHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#44B649] bg-[#0D110E] px-4 py-2 font-mono-num text-xs font-bold text-white hover:bg-[#18201B] whitespace-nowrap shrink-0"
              >
                <Phone className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Quick-Action Bar for Typical Local Visitors (when no dishes shortlisted) */}
      {shortlistSummary.totalItems === 0 && (
        <div
          role="navigation"
          aria-label="Quick Mobile Actions"
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-[#243028] bg-[#0D110E]/95 text-center text-[11px] font-semibold text-[#D0D8D2] backdrop-blur-md md:hidden"
        >
          <button
            type="button"
            onClick={() => navigateAndScroll('menu')}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 ${
              currentPage === 'menu' ? 'text-[#44B649]' : 'hover:text-white'
            }`}
          >
            <Utensils className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
            <span>Menu (मेनु)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateAndScroll('contact')}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 ${
              currentPage === 'contact' ? 'text-[#44B649]' : 'hover:text-white'
            }`}
          >
            <CalendarCheck className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
            <span>Book Table</span>
          </button>
          <a
            href={BUSINESS_CONFIG.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2.5 hover:text-white"
          >
            <MapPin className="h-4 w-4 text-[#44B649]" aria-hidden="true" />
            <span>Maps (नक्सा)</span>
          </a>
          <a
            href={BUSINESS_CONFIG.contact.telHref}
            className="flex flex-col items-center justify-center gap-1 bg-[#44B649] py-2.5 font-bold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Call Now</span>
          </a>
        </div>
      )}

      <LightboxModal
        assets={lightboxList}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
        onSaveCustomUrl={handleUpdateImage}
      />

      <OwnerGuideModal
        isOpen={ownerGuideOpen}
        onClose={() => setOwnerGuideOpen(false)}
        imageAssets={imageAssets}
        onUpdateImage={handleUpdateImage}
        onResetImages={handleResetImages}
      />
    </div>
  );
}
