"use client";
import React, { useState, useEffect, useCallback } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { Page } from '@/type/Page';
import "./embla.css"


type PropType = {
  slides: {
    page_config:Page[]
  }
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
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    onChange(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex,onChange])

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
          {slides.page_config.map((value,index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
              <Frame position={value.framework || ""} missions={value.missions}/>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover rounded-none"
            src={value.image||""}
          />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.page_config.map((value,index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                src={value.image || ""}
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
  missions:Array<any>
}

export const Frame: React.FC<IMyProps> = (props: IMyProps) => {
  var position = props.position;

  // var parent_missions = props.parent_missions;
  // var child_missions = props.child_missions;
  // console.log(position);
// function Frame() {
  var missions = props.missions
  while (missions.length < 4) {
    missions.push({text:"+"}); // Fill in with empty or placeholder missions
  }
  return (
  <div key={position} className={`frame absolute grid  
  ${
    position == "" && "hidden"
  }
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
    {
      
      missions.map((mission,index)=>{
        return (
        <div className='mission-placeholder relative justify-center items-center text-center text-white inline-block'  key={index}>
          {/* <div className='mission-box max-h-full max-w-full'></div> */}
          
          {mission.text == "+" && <div className='px-2'>
            <svg
              width="8rem"
              height="7.5rem"
              viewBox="0 0 200 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeDasharray="24,24"
                rx={6}
                ry={6}
              />

              <g stroke="white" strokeWidth="4">
                <line x1="50%" y1="25" x2="50%" y2="125" strokeLinecap="round" />
                <line x1="25%" y1="50%" x2="150" y2="50%" strokeLinecap="round"/>
              </g>
            </svg>
          </div>
          }
          {
            mission.text != "+" && 
            <div className='py-2 px-3 relative'>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 inset-0 w-full h-full object-cover rounded-none"
                src="/static/outerframe-3.jpg"
              />
              {/* <img src= alt="" className=" inset-0 w-full h-full object-cover"/> */}

              <div className="absolute inset-0 flex items-center justify-center">
                <span className=" text-black p-1 text-base">{mission.text}</span>
              </div>
            </div>
          }
          
          {/* <img className="absolute w-full h-full top-0 left-0" src=""/> */}
          {/* <div className='w-full h-full'  style={{position:"absolute",backgroundImage:`url("/static/outerframe-1.png")`}} ></div>
          <div className="relative text-base z-10 w-full h-full text-center"><span>{mission.text || "+"}</span></div> */}
        </div>
        )
      })
    }
    {/* <div className='mission-placeholder flex p-2'>
      <div className='mission-box max-h-full max-w-full'>{parent_missions}</div>
    </div>
    <div className='mission-placeholder flex p-2'>
      <div className='mission-box max-h-full max-w-full'>{parent_missions}</div>
    </div>
    <div className='mission-placeholder flex p-2'>
      <div className='mission-box max-h-full max-w-full'>{child_missions}</div>
    </div> */}
    
  </div>);
}

export default EmblaCarousel
