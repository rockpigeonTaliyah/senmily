import React, { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import { Button, Image } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import DraggableArea, { DraggableAreaHandles } from '@/app/ui/dnd/DraggableArea';
import { Mission } from '@/type/Page'; // No more PageConfig
import "./embla.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index';

type PropType = {
  slides: Array<{
      pictures: any[]; // assuming pictures is an array of objects or a custom type
      text: string; // assuming text is string
      image: string; // assuming image is a string representing the image path
      framework: string; // Add framework property 
      mode: number; // Add mode property
      user_image: string; // Add user_image property (if needed)
      missions: Mission[]; // Missions are now directly within the page object
    }>;
  
  onChange: (selectedIndex: number) => void;
  onItemsChange: (pageIndex: number, updatedItems: Mission) => void;
  setLoading: (status: boolean) => void;
};


export type EmblaCarouselHandles = {
  updateSlideItemsAttributes: (index: number, attributes: Partial<Mission>[]) => void;
};

const EmblaCarousel = forwardRef<EmblaCarouselHandles, PropType>((props, ref) => {
  const { slides, onChange, onItemsChange, setLoading } = props;
  const slidesCount = slides.length;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    skipSnaps: false
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [draggableRefs, setDraggableRefs] = useState<React.RefObject<DraggableAreaHandles>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((embla) => {
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    const selected = embla.selectedScrollSnap();
    setSelectedIndex(selected);
    onChange(selected);
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
      emblaApi.reInit({ watchDrag: false });
    }
  };

  const handleDragEnd = () => {
    if (emblaApi) {
      emblaApi.reInit({ watchDrag: true });
    }
  };

  const handleExportResult = useCallback((index, result) => {
    onItemsChange(index, result);
  }, []);

  const onMissionUpdate = useCallback((index, result) => {
    onItemsChange(index, result);
  }, [onItemsChange]);
  useEffect(() => {
    setDraggableRefs(slides.map(() => React.createRef<DraggableAreaHandles>()));
  }, []);

  useImperativeHandle(ref, () => ({
    updateSlideItemsAttributes: (index: number, attributes: Partial<Mission>[]) => {
      if (draggableRefs[index] && draggableRefs[index].current) {
        draggableRefs[index].current.updateItemsAttributes(attributes);
      }
    }
  }));

  return (
    <div className="embla grow justify-center">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((page, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <DraggableArea
                  ref={draggableRefs[index]}
                  key={`draggable-${index}`}
                  items={page.missions} // Access missions directly from the page object
                  onExport={(result) => handleExportResult(index, result)}
                  onMissionUpdate={(item) => {
                    onMissionUpdate(index, item)
                  }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full rounded-none slideimage"
                    src={page.image} // <-- Make sure this is the correct URL or file path 
                    style={{zIndex:-1}}
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
          <span className="text-center">{selectedIndex + 1} /{slidesCount}</span>
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
});

EmblaCarousel.displayName = 'EmblaCarousel';

export default EmblaCarousel;