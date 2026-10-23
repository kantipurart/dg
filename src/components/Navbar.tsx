import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DreamGardenLogo } from './DreamGardenLogo';

export type PageId = 'home' | 'menu' | 'gallery' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  shortlistCount: number;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Photos' },
  { id: 'contact', label: 'Location & Book' },
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
          ? 'border-b border-white/10 bg-[#0D110E]/70 text-[#F4F7F4] backdrop-blur-md'
          : 'border-b border-[#243028] bg-[#0D110E]/95 text-[#F4F7F4] backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44B649]"
          aria-label="Dream Garden Resort Home"
        >
          <DreamGardenLogo size="md" showPvtLtd />
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
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
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44B649] ${
                  isActive
                    ? 'text-[#44B649] font-semibold underline decoration-[#44B649] decoration-2 underline-offset-8'
                    : 'text-[#C8D0CA] hover:text-white'
                }`}
              >
                {item.label}
                {item.id === 'menu' && shortlistCount > 0 ? ` (${shortlistCount})` : ''}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+9779815321221"
            className="rounded-full bg-[#44B649] px-5 py-2.5 font-mono-num text-xs font-bold tracking-wide text-white shadow-sm transition-colors duration-150 hover:bg-[#3CA341] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649]"
          >
            Call 981-5321221
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center text-[#F4F7F4] md:hidden focus-visible:outline-2 focus-visible:outline-[#44B649]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

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
                  className={`block py-2.5 text-base font-medium ${
                    currentPage === item.id ? 'text-[#44B649] font-semibold' : 'text-[#C8D0CA]'
                  }`}
                >
                  {item.label}
                  {item.id === 'menu' && shortlistCount > 0 ? ` (${shortlistCount})` : ''}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
