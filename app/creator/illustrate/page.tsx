"use client";
import React, { useEffect, useState } from "react";
import {Tabs, Tab,} from "@nextui-org/react"; 
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

type Book = {
  theme : string;
  page_config : Array<object>
}
export default function Page() {
  const booklists = [1,2,3,4,5]
  // const data = await getData()
  const [data, setData] = useState([]);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getData();
  //     console.log(result);
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);



  return (

    <Tabs key="underlined" variant="underlined" aria-label="Tabs variants" size="lg" fullWidth="true" color="primary" style={{padding:"20px 0"}}>
    <Tab key="theme" title="範本" className="w-full " >
    {/*  */}
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
        {/* <Card className="col-span-12 sm:col-span-4 bg-0" style={{margin:"auto",width: "170px",height: "220px"}}>
        
      </Card> */}
      </div>
      ))}
      
      </ScrollShadow>

    </Tab>
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
  </Tabs>

  );
}
