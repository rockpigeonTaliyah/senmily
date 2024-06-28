import React from 'react';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";

export const OuterframeTab = (props: any) => {
    var bubbles = [
        {
            fid: 0,
            image: "/bubble/yellow-1.png"
        },
        {
            fid: 1,
            image: "/bubble/yellow-2.png"
        },
        {
            fid: 0,
            image: "/bubble/yellow-3.png"
        },
        {
            fid: 1,
            image: "/bubble/yellow-4.png"
        },
        {
            fid: 0,
            image: "/bubble/yellow-5.png"
        },
        {
            fid: 1,
            image: "/bubble/blue-1.png"
        },
        {
            fid: 0,
            image: "/bubble/blue-2.png"
        },
        {
            fid: 1,
            image: "/bubble/blue-3.png"
        },
        {
            fid: 0,
            image: "/bubble/blue-4.png"
        },
        {
            fid: 1,
            image: "/bubble/blue-5.png"
        }
    ]
    return (
        <ScrollShadow className="w-full h-[80vh]">
            {bubbles.map((bubble, index) => (
                <div style={{ margin: "auto", marginBottom: "10px" }} key={index} onClick={() => { props.func(bubble.image); }}>
                    <Card
                        className="col-span-12 sm:col-span-4 bg-0 rounded-none"
                        shadow="none"
                        style={{
                            margin: "auto",
                            width: "180px",
                            marginBottom: "10px"
                        }}>
                        <Image
                            removeWrapper
                            alt="Card background"
                            className="z-0 w-full h-[120px] object-cover rounded-none object-contain"
                            src={bubble.image}
                        />
                    </Card>
                </div>
            ))}
        </ScrollShadow>
    )
}