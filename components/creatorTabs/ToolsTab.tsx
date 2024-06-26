import React from 'react';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";

export const ToolsTab = (props: any) => {
    return (
        <>
            <div className='w-full  pt-[3rem]'>
                <div onClick={()=>props.func("tools/avatar")} className="m-auto text-center w-[180px] mb-1">
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-[120px] object-cover rounded-none"
                        src="/static/mode-normal.png"
                    />
                    <div className="my-2 text-white"><span>自訂角色</span></div>
                </div>
                <div onClick={()=>props.func("tools/chatbot")} className="m-auto text-center w-[180px] mb-1">
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-[120px] object-cover rounded-none"
                        src="/static/mode-normal.png"
                    />
                    <div className="my-2 text-white"><span>Chatbot</span></div>
                </div>
            </div>
        </>
    );
}
