"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import {Tabs, Tab} from "@nextui-org/react"; 
import { Context } from "@/libs/context"
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
export default function Page() {
  const booklists = [1,2,3,4,5]
    const [ context, setContext ] = React.useState()
  return (
    <Context.Provider value={[context, setContext]}>
    <Tabs key="underlined" variant="underlined" aria-label="Tabs variants" size="lg" fullWidth="true" color="primary" style={{padding:"20px 0"}}>
    <Tab key="photos" title="範本" className="w-full" >

    <ScrollShadow className="w-full h-[80vh]">
        
        {booklists.map((booklists) => (
          <div style={{margin:"auto",marginBottom:"10px"}}>
          <Card 
            className="col-span-12 sm:col-span-4 bg-0" 
            shadow="none"
            style={{
                margin:"auto",
                width: "180px",
                
                marginBottom:"10px"}}>
            <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-[120px] object-cover"
            src="https://nextui.org/images/card-example-4.jpeg"
            />
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center ">
                <h4 className="font-bold text-large ">Frontend Radio</h4>
            </CardHeader>
        </Card>
        </div>
        ))}
        
        </ScrollShadow>

    </Tab>
    <Tab key="music" title="Music" className="w-full">
      <ScrollShadow className="w-full h-[80vh]">
        
        {booklists.map((booklists) => (
          <div style={{margin:"auto",marginBottom:"10px"}}>
            <Card 
              className="col-span-12 sm:col-span-4 bg-0" 
              shadow="none"
              style={{
                  margin:"auto",
                  width: "180px",
                  
                  marginBottom:"10px"}}>
              <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-[120px] object-cover"
              src="https://nextui.org/images/card-example-4.jpeg"
              />
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center ">
                  <h4 className="font-bold text-large ">Frontend Radio</h4>
              </CardHeader>
            </Card>
          </div>
        ))}
        
        </ScrollShadow>


      </Tab>
    <Tab key="videos" title="Videos" className="w-full">
    <ScrollShadow className="w-full h-[80vh]">
        
        {booklists.map((booklists) => (
          <div style={{margin:"auto",marginBottom:"10px"}}>
          <Card className="col-span-12 sm:col-span-4 " style={{margin:"auto",width: "180px",height: "120px"}}>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-4.jpeg"
          />
        </Card>
        </div>
        ))}
        
        </ScrollShadow>
    </Tab>
  </Tabs>
  </Context.Provider>
  );
}