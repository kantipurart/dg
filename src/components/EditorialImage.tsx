import React, { useState, useEffect } from 'react';
import { ImageAsset } from '../data/images';

interface EditorialImageProps {
  asset: ImageAsset;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  onClick?: () => void;
  showCaptionOverlay?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  asset,
  className = '',
  imgClassName = '',
  priority = false,
  onClick,
  showCaptionOverlay = false,
}) => {
  const [imgSrc, setImgSrc] = useState(asset.src);

  useEffect(() => {
    setImgSrc(asset.src);
  }, [asset.src]);

  const aspectClass =
    asset.aspectRatio === '16:9'
      ? 'aspect-video'
      : asset.aspectRatio === '4:3'
        ? 'aspect-[4/3]'
        : asset.aspectRatio === '3:4'
          ? 'aspect-[3/4]'
          : 'aspect-square';

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      aria-label={onClick ? `View full photo: ${asset.title}` : undefined}
      className={`group relative block w-full overflow-hidden bg-[#131915] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B649] ${aspectClass} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <img
        src={imgSrc}
        alt={asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${imgClassName}`}
      />

      {showCaptionOverlay && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090C0A]/90 via-[#090C0A]/45 to-transparent p-4">
          <p className="font-display text-lg font-bold text-white sm:text-xl">
            {asset.title}
          </p>
        </div>
      )}
    </Wrapper>
  );
};
