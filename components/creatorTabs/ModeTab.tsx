import React from 'react';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";

export  const ModeTab = (props: any) => {
  console.log(); 
  // console.log();
  var array_id = props.slideid; 
  const modeList = [
    {
      mid: 0,
      name: "一般模式",
      image: "/mode/1-normal.png"
    },
    {
      mid: 1,
      name: "專注模式",
      image:  "/mode/2-focus.png"
    },
    {
      mid: 2,
      name: "認讀模式",
      image: "/mode/3-read.png"
    },
    {
      mid: 3,
      name: "社交模式",
      image:  "/mode/4-social.png"
    }
  ]
  console.log("mode:",props.book);
  console.log(props.book.pages);
  console.log("array_id:",array_id);

  return (
    <ScrollShadow className="w-full h-[80vh]">
      {modeList.map((mode: any) => (
        <div 
          style={{ margin: "auto", marginBottom: "10px" }} 
          className='text-center' 
          key={mode.mid} 
          onClick={() => props.func(mode.mid)} 
        >
          <Image
            removeWrapper
            alt="Card background"
            className={`z-0 w-full h-full object-cover rounded-none 
            ${props.book.pages[array_id].mode == mode.mid && "rounded-lg border-slate-300 border-4" || "brightness-50"}`} 
            src={mode.image}
            style={{ margin: "auto", width: "180px", height: "120px" }}
          />
          <div><span className="text-white py-2">{mode.name}</span></div>
        </div>
      ))}
    </ScrollShadow>
  )
}