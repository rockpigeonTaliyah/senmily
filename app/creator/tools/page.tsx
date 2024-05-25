"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import {Tabs, Tab} from "@nextui-org/react"; 
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
export default function Page() {
  return (
    <main className="w-full" style={{padding:"1.5rem"}}>
      <div style={{margin:"auto"}}>
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
      </main>
  );
}
