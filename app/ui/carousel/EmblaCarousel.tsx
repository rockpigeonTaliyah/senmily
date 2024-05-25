"use client";
import React, { useState, useEffect, useCallback } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import "./embla.css"

type PropType = {
  slides: object[]
  onChange :any
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, onChange, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    onChange(emblaMainApi.selectedScrollSnap());
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla theme-light">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((value,index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
              <Frame position={value.framework} parent_missions={value.missions.parents.mission} child_missions={value.missions.children.mission}/>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={value.image}
          />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((value,index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                src={value.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
interface IMyProps {
  position:string,
  parent_missions:string,
  child_missions:string
}

export const Frame: React.FC<IMyProps> = (props: IMyProps) => {
  var position = props.position;
  var parent_missions = props.parent_missions;
  var child_missions = props.child_missions;
// function Frame() {
  return (
  <div className={`frame absolute grid  
  ${
    position == "top" || position == "bottom" ? "grid-cols-4 w-full " : "grid-rows-4 h-full"
  }

  ${
    position == "top" && "top-0" ||
    position == "bottom" && "bottom-0" ||
    position == "left" && "left-0" ||
    position == "right" && "right-0"
  }
  
  `}>
    <div className='mission-placeholder flex'>
      <div className='mission-box'>{parent_missions}</div>
    </div>
    <div className='mission-placeholder flex'>
      <div className='mission-box'>{parent_missions}</div>
    </div>
    <div className='mission-placeholder flex'>
      <div className='mission-box'>{child_missions}</div>
    </div>
    <div className='mission-placeholder flex'>
      <div className='mission-box'>{child_missions}</div>
    </div>
  </div>);
}

export default EmblaCarousel
