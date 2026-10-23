/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage, SavedInquiry } from './pages/ContactPage';
import { INITIAL_IMAGE_ASSETS, ImageAsset } from './data/images';
import { MenuItem } from './data/menuData';
import { ShortlistEntry } from './utils/menuLogic';

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
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [savedInquiries, setSavedInquiries] = useState<SavedInquiry[]>([]);

  const [lightboxList, setLightboxList] = useState<ImageAsset[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'Dream Garden Resort — Chapali Bhangal, Budhanilkantha',
      menu: 'Menu — Dream Garden Resort',
      gallery: 'Photos — Dream Garden Resort',
      contact: 'Location & Booking — Dream Garden Resort',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const shortlistIds = useMemo(() => new Set(shortlist.map((s) => s.item.id)), [shortlist]);
  const totalShortlistItems = useMemo(
    () => shortlist.reduce((acc, entry) => acc + entry.quantity, 0),
    [shortlist]
  );

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
    const allList = Object.values(INITIAL_IMAGE_ASSETS);
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

  return (
    <div className="flex min-h-screen flex-col bg-[#0D110E] text-[#F4F7F4]">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        shortlistCount={totalShortlistItems}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            imageAssets={INITIAL_IMAGE_ASSETS}
            onNavigate={setCurrentPage}
            onOpenLightbox={handleOpenLightboxByKey}
            onAddToShortlist={handleAddToShortlist}
            shortlistIds={shortlistIds}
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
            imageAssets={INITIAL_IMAGE_ASSETS}
            onOpenLightboxByIndex={handleOpenLightboxByIndex}
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

      <Footer onNavigate={setCurrentPage} />

      <LightboxModal
        assets={lightboxList}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
