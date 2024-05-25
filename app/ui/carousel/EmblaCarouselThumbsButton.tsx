import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
type PropType = {
  selected: boolean
  index: number
  onClick: () => void
  src: string
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick ,src} = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        {/* {index + 1} */}
        <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={src}
          />
      </button>
    </div>
  )
}
