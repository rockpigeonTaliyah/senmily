"use client";
import React, { useEffect, useState } from "react";
import {Tabs, Tab,} from "@nextui-org/react"; 
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

type Book = {
  theme : string;
  page_config : Array<object>
}
const booklists = [1,2,3,4,5]
export default function Page() {
  
  return (
    <>
    <Tabs variant="underlined"  size="lg" fullWidth="true" color="primary" style={{padding:"20px 0"}}>
    <Tab key="theme" title="範本" className="w-full " ></Tab>
    <Tab key="theme" title="範本" className="w-full " ></Tab>
    <Tab key="theme" title="範本" className="w-full " ></Tab>
      {/* <BooksTab/>
      <FrameworkTab/>
      <ModeTab/> */}
    </Tabs>
    </>
  );
}


export const BooksTab = ()=>{
  return ( 
  <Tab key="theme" title="範本" className="w-full " >
    <ScrollShadow className="w-full h-[80vh]">
    {booklists.map((booklists) => (
      <div className="m-auto mb-2 flex justify-center items-center" key={booklists} >
          <Image
            loading="eager"
            // removeWrapper
            alt="Card background"
            className="z-0 w-[200px] h-full object-cover"
            src="https://nextui.org/images/card-example-4.jpeg"
          />
      </div>
    ))}
    </ScrollShadow>
  </Tab>)
}

export const  FrameworkTab = ()=>{
  return ( 
    <Tab key="framework" title="框架" className="w-full">
      <ScrollShadow className="w-full h-[80vh]">
        
        {booklists.map((booklists,index) => (
          <div style={{margin:"auto",marginBottom:"10px"}} key={index}>
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
  )
}

export const  ModeTab = ()=>{
  return ( 
    <Tab key="mode" title="模式" className="w-full">
    <ScrollShadow className="w-full h-[80vh]">
        
        {booklists.map((page:any) => (
          <div style={{margin:"auto",marginBottom:"10px"}} key={page}>
          <Card className="col-span-12 sm:col-span-4 " style={{margin:"auto",width: "180px",height: "120px"}}>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={page.image}
          />
        </Card>
        </div>
        ))}
        
        </ScrollShadow>
    </Tab>
  )
}

export const  CategoryTab = () => {
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
}