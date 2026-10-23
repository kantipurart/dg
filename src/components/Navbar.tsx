import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { DreamGardenLogo } from './DreamGardenLogo';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export type PageId = 'home' | 'menu' | 'gallery' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  shortlistCount: number;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu & Prices (मेनु)' },
  { id: 'gallery', label: 'Photos (फोटो)' },
  { id: 'contact', label: 'Map & Book (बुकिङ)' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  shortlistCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparentHero = currentPage === 'home' && !scrolled && !mobileMenuOpen;

  const handleLinkClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        isTransparentHero
          ? 'border-b border-white/10 bg-[#0D110E]/75 text-[#F4F7F4] backdrop-blur-md'
          : 'border-b border-[#243028] bg-[#0D110E]/95 text-[#F4F7F4] backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Highlighted Official @resortdreamgarden Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="group shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44B649]"
          aria-label="Dream Garden Resort Home"
        >
          <DreamGardenLogo size="md" showPvtLtd highlighted />
        </a>

        {/* Zone 2: Clean typographic navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44B649] ${
                  isActive
                    ? 'text-[#44B649] font-semibold underline decoration-[#44B649] decoration-2 underline-offset-8'
                    : 'text-[#D0D8D2] hover:text-white'
                }`}
              >
                {item.label}
                {item.id === 'menu' && shortlistCount > 0 ? ` (${shortlistCount})` : ''}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Direct Directions & Call CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={BUSINESS_CONFIG.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#2F3E34] bg-[#131915] px-4 py-2.5 text-xs font-semibold text-[#E2E8E4] transition-colors hover:border-[#44B649] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649]"
          >
            <MapPin className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
            <span>Directions</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.telHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#44B649] px-4 sm:px-5 py-2.5 font-mono-num text-xs font-bold tracking-wide text-white shadow-sm transition-colors duration-150 hover:bg-[#3CA341] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649]"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>981-5321221</span>
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#243028] bg-[#131915] text-[#F4F7F4] md:hidden focus-visible:outline-2 focus-visible:outline-[#44B649]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-b border-[#243028] bg-[#131915] px-4 pt-3 pb-6 text-[#F4F7F4] shadow-xl md:hidden"
        >
          <ul className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`block py-3 text-base font-medium ${
                    currentPage === item.id ? 'text-[#44B649] font-semibold' : 'text-[#D0D8D2]'
                  }`}
                >
                  {item.label}
                  {item.id === 'menu' && shortlistCount > 0 ? ` (${shortlistCount})` : ''}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2.5 border-t border-[#243028] pt-4">
            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#44B649] bg-[#0D110E] px-4 py-2.5 text-xs font-bold text-white uppercase"
            >
              <MapPin className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
              <span>Google Maps</span>
            </a>
            <a
              href={BUSINESS_CONFIG.contact.landlineHref}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#2E3D33] bg-[#0D110E] px-4 py-2.5 font-mono-num text-xs font-bold text-[#D0D8D2]"
            >
              <Phone className="h-3.5 w-3.5 text-[#44B649]" aria-hidden="true" />
              <span>{BUSINESS_CONFIG.contact.landlineDisplay}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
