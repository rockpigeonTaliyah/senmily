import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Image } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import DraggableArea from '@/app/ui/dnd/DraggableArea';
import { PageConfig, Mission } from '@/type/Page';
import "./embla.css";

type PropType = {
  slides: {
    page_config: PageConfig[];
  };
  onChange: (selectedIndex: number) => void;
  onItemsChange: (pageIndex: number, updatedItems: Mission[]) => void;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, onChange, onItemsChange } = props;
  const slidesCount = slides.page_config.length;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    skipSnaps: false,
    ...options,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((embla: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    onChange(embla.selectedScrollSnap());
    setScrollProgress(progress * 100);
  }, [onChange]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on('reInit', onScroll)
      .on('scroll', onScroll);
  }, [emblaApi, onScroll]);

  const handleDragStart = () => {
    if (emblaApi) {
      emblaApi.reInit({ watchDrag: false })
    }
  };

  const handleDragEnd = () => {
    
    if (emblaApi) {
      emblaApi.reInit({ watchDrag: true })
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleExportResult = useCallback((result) => {
    onItemsChange(selectedIndex, result);
  }, [selectedIndex, onItemsChange]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.page_config.map((value, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <DraggableArea
                  items={value.missions}
                  onExport={handleExportResult}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onItemsChange={(updatedItems) => onItemsChange(index, updatedItems)}
                >
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover rounded-none"
                    src={value.image || ""}
                    style={{ zIndex: -1 }}
                  />
                </DraggableArea>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <span className="text-center">{selectedIndex + 1} / {slidesCount}</span>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__progress">
          <div
            className="embla__progress__bar"
            style={{ transform: `translate3d(${scrollProgress}%, 0px, 0px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
