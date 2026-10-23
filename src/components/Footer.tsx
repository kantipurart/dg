import React from 'react';
import { Phone, MapPin, ExternalLink, Mail } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { PageId } from './Navbar';
import { DreamGardenLogo, GoodFoodBrighterMoodsBadge } from './DreamGardenLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#243028] bg-[#090C0A] text-[#E6ECE8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <DreamGardenLogo size="lg" showTagline showPvtLtd />
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#9BA39E]">
              {BUSINESS_CONFIG.shortIntro}
            </p>
            <div className="mt-5">
              <GoodFoodBrighterMoodsBadge />
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-bold tracking-wider text-[#44B649] uppercase">
              Pages
            </h2>
            <ul className="mt-3.5 space-y-2.5 text-xs">
              {(
                [
                  ['home', 'Home'],
                  ['menu', 'Menu'],
                  ['gallery', 'Photos'],
                  ['contact', 'Location & Book'],
                ] as [PageId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(id);
                    }}
                    className="text-[#C8D0CA] transition-colors hover:text-[#44B649]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-bold tracking-wider text-[#44B649] uppercase">
              Contact & Location
            </h2>
            <div className="mt-3.5 space-y-2.5 text-xs text-[#C8D0CA]">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#44B649]" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.location.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#44B649]" aria-hidden="true" />
                <span>
                  <a
                    href={BUSINESS_CONFIG.contact.telHref}
                    className="font-mono-num text-sm font-bold text-white underline decoration-[#44B649]"
                  >
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                  <span className="mx-1.5 text-[#6E7872]">/</span>
                  <a
                    href={BUSINESS_CONFIG.contact.landlineHref}
                    className="font-mono-num text-sm font-semibold text-[#C8D0CA] hover:text-white"
                  >
                    {BUSINESS_CONFIG.contact.landlineDisplay}
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#44B649]" aria-hidden="true" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="text-[#C8D0CA] hover:text-white"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={BUSINESS_CONFIG.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white underline decoration-[#44B649] underline-offset-4 hover:text-[#44B649]"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_CONFIG.location.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white underline decoration-[#44B649] underline-offset-4 hover:text-[#44B649]"
                >
                  <span>Instagram</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_CONFIG.location.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white underline decoration-[#44B649] underline-offset-4 hover:text-[#44B649]"
                >
                  <span>Facebook</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#243028] pt-6 text-xs text-[#8E9396]">
          <p>
            © {new Date().getFullYear()} Dream Garden Resort · Chapali Bhangal, Budhanilkantha.
          </p>
        </div>
      </div>
    </footer>
  );
};
