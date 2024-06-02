import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import { Image } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import DraggableArea, { DraggableAreaHandles } from '@/app/ui/dnd/DraggableArea';
import { PageConfig, Mission } from '@/type/Page';
import "./embla.css";

type PropType = {
  slides: {
    page_config: PageConfig[];
  };
  onChange: (selectedIndex: number) => void;
  onItemsChange: (pageIndex: number, updatedItems: Mission) => void;
};

export type EmblaCarouselHandles = {
  updateSlideItemsAttributes: (index: number, attributes: Partial<Mission>[]) => void;
};

const EmblaCarousel = forwardRef<EmblaCarouselHandles, PropType>((props, ref) => {
  const { slides, onChange, onItemsChange } = props;
  const slidesCount = slides.page_config.length;
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
    onChange(selected);
    setSelectedIndex(selected);
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
    console.log("taert");
    // onItemsChange(index, result);
  }, [onItemsChange]);
  const onMissionUpdate= useCallback((index, result) => {
    console.log("taert");
    onItemsChange(index, result);
  }, [onItemsChange]);
  useEffect(() => {
    // Initialize refs array with the correct length
    setDraggableRefs(slides.page_config.map(() => React.createRef<DraggableAreaHandles>()));
  }, [slides.page_config.length]);

  useImperativeHandle(ref, () => ({
    updateSlideItemsAttributes: (index: number, attributes: Partial<Mission>[]) => {
      if (draggableRefs[index] && draggableRefs[index].current) {
        draggableRefs[index].current.updateItemsAttributes(attributes);
      }
    }
  }));
  
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.page_config.map((value, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <DraggableArea
                  ref={draggableRefs[index]}
                  key={`draggable-${index}`}
                  items={value.missions}
                  onExport={(result) => handleExportResult(index, result)}
                  onMissionUpdate={(item)=>{onMissionUpdate(index,item)}}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
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
});

EmblaCarousel.displayName = 'EmblaCarousel';

export default EmblaCarousel;
