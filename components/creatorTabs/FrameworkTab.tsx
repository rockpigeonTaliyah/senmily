import React from 'react';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";
export const FrameworkTab = (props: any) => {
    const frameworkList = [
        {
            name: null,
            image: "/static/frame-none.png"
        },
        {
            name: "top",
            image: "/static/frame-top.png"
        },
        {
            name: "left",
            image: "/static/frame-left.png"
        },
        {
            name: "right",
            image: "/static/frame-right.png"
        },
        {
            name: "bottom",
            image: "/static/frame-bottom.png"
        }
    ]
    return (
        <ScrollShadow className="w-full h-[80vh]">
            {frameworkList.map((framework, index) => (
                <div style={{ margin: "auto", marginBottom: "10px" }} key={index} onClick={() => props.func(framework.name)}>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className={`z-0 w-full h-full object-cover rounded-none ${props.framework == framework.name && "rounded-lg border-slate-300 border-4"}`}
                        style={{ margin: "auto", width: "180px", height: "120px" }}
                        src={framework.image}
                    />
                </div>
            ))}
        </ScrollShadow>
    )
}