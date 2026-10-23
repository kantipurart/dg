import React from 'react';

interface DreamGardenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  showPvtLtd?: boolean;
  highlighted?: boolean;
}

/**
 * Drawn directly from the official @resortdreamgarden Instagram post & printed menu branding,
 * with enhanced luminance so "DreamGarden" stands out crisply on dark backgrounds:
 * - "Dream" in bright warm silver-white (#EEF3EF)
 * - "garden" in signature vibrant leaf green (#44B649) with a subtle botanical glow
 * - Twin veined leaves sprouting above "g" with a sweeping green arch over "arden"
 * - Optional "resort pvt. ltd." sub-label under "den"
 */
export const DreamGardenLogo: React.FC<DreamGardenLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  showPvtLtd = true,
  highlighted = false,
}) => {
  const dimensions =
    size === 'lg'
      ? 'h-14 sm:h-16'
      : size === 'sm'
        ? 'h-9'
        : 'h-11 sm:h-12';

  return (
    <div
      className={`inline-flex flex-col select-none transition-transform duration-200 ${
        highlighted
          ? 'rounded-xl border border-[#44B649]/35 bg-[#141D17]/90 px-3.5 py-1.5 shadow-[0_0_24px_rgba(68,182,73,0.16)]'
          : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 336 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} w-auto overflow-visible drop-shadow-[0_2px_10px_rgba(68,182,73,0.22)]`}
        role="img"
        aria-label="Dream Garden Resort Logo"
      >
        {/* Left Larger Leaf above 'g' */}
        <path
          d="M126 5C126 5 147 8 153 23C156 30 154 37 150 41C143 39 133 34 128 23C124 15 126 5 126 5Z"
          fill="#44B649"
        />
        {/* Leaf inner vein cutout */}
        <path
          d="M133 14C138 21 144 30 149 38"
          stroke="#0D110E"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Right Smaller Leaf sprouting beside main leaf */}
        <path
          d="M159 17C159 17 167 22 166 32C165 37 161 40 157 41C155 36 154 28 159 17Z"
          fill="#44B649"
        />
        <path
          d="M161 24C160 29 159 34 157 38"
          stroke="#0D110E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Small lower-left leaf accent as in official menu */}
        <path
          d="M119 31C124 29 132 31 136 37C130 39 123 37 119 31Z"
          fill="#44B649"
        />

        {/* Sweeping Green Stem Arch over 'garden' */}
        <path
          d="M124 39C142 43 166 43 196 39C232 34 278 32 319 44C322 45 324 47 325 49C314 42 276 39 235 42C195 45 156 47 124 39Z"
          fill="#44B649"
        />

        {/* "Dream" highlighted in luminous warm off-white (#EEF3EF) */}
        <text
          x="2"
          y="68"
          fill="#EEF3EF"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="42"
          letterSpacing="-1.4"
        >
          Dream
        </text>

        {/* "garden" in signature vibrant leaf green (#44B649) */}
        <text
          x="136"
          y="68"
          fill="#44B649"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="43"
          letterSpacing="-1.4"
        >
          garden
        </text>

        {/* "resort pvt.ltd." sub-label from official menu & signage */}
        {showPvtLtd && (
          <text
            x="234"
            y="84"
            fill="#C4CEC7"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="600"
            fontSize="11.5"
            letterSpacing="0.4"
          >
            resort pvt.ltd.
          </text>
        )}
      </svg>

      {showTagline && (
        <span className="mt-1 flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-[#D0D8D2] uppercase">
          <span className="inline-block h-[2px] w-5 bg-[#44B649]" />
          <span>Chapali Bhangal · Budhanilkantha</span>
        </span>
      )}
    </div>
  );
};

/**
 * Highlighted inline "DreamGarden" wordmark for headings and editorial callouts
 */
export const DreamGardenWordmark: React.FC<{
  showResort?: boolean;
  className?: string;
}> = ({ showResort = false, className = '' }) => (
  <span
    className={`inline-flex items-baseline font-sans font-extrabold tracking-tight ${className}`}
  >
    <span className="text-[#F4F7F4]">Dream</span>
    <span className="text-[#44B649] underline decoration-[#44B649]/60 decoration-2 underline-offset-4">
      Garden
    </span>
    {showResort && <span className="ml-1.5 font-semibold text-[#D2DAD4]">Resort</span>}
  </span>
);

export const MoreGoodDaysBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <span className="h-[2.5px] w-10 bg-[#44B649]" />
    <span className="font-display text-xl italic tracking-wide text-[#F3F6F4]">
      More Good Days
    </span>
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-6"
      aria-hidden="true"
    >
      <path d="M4 18C10 18 16 14 20 5C12 6 6 11 4 18Z" fill="#44B649" />
      <path d="M15 17C20 18 26 16 29 10C23 10 18 13 15 17Z" fill="#44B649" />
    </svg>
  </div>
);

export const GoodFoodBrighterMoodsBadge: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={`inline-flex items-center gap-4 select-none ${className}`}>
    <div className="border-r-2 border-[#44B649] pr-4 text-right text-[10px] font-bold leading-tight tracking-[0.18em] text-[#D7DDD9] uppercase">
      <div>GOOD FOOD</div>
      <div className="text-[#44B649]">BRIGHTER</div>
      <div>MOODS</div>
    </div>
    <MoreGoodDaysBadge />
  </div>
);
