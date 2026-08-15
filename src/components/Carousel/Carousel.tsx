import React, { useState, useRef } from 'react';
import './Carousel.css';

export interface CarouselProps {
  /** The list of React nodes to render as slides */
  items: React.ReactNode[];
  /** Additional CSS class for the wrapper */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Carousel
 *
 * A scroll-snap based horizontal carousel with theme-aware dot indicators.
 * Supports swipe gestures on mobile and click navigation via dots.
 *
 * @example
 * ```tsx
 * <Carousel items={[<Card />, <Card />, <Card />]} />
 * ```
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ items, className, style }, ref) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveSlide(index);
    };

    const scrollToSlide = (index: number) => {
      if (!carouselRef.current) return;
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
    };

    if (!items || items.length === 0) return null;

    const wrapperClasses = [
      'bst-carousel-wrapper',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={wrapperClasses} style={style}>
        <div 
          className="bst-carousel" 
          ref={carouselRef} 
          onScroll={handleScroll}
        >
          {items.map((item, idx) => (
            <div key={idx} className="bst-carousel__slide">
              {item}
            </div>
          ))}
        </div>
        
        <div className="bst-carousel__dots" role="tablist">
          {items.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === activeSlide}
              className={`bst-carousel__dot ${idx === activeSlide ? 'bst-carousel__dot--active' : ''}`}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';

