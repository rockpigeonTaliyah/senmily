import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";
export const MissionTab = (props: any) => {
    const parent_missions = [
        {
            mid: 0,
            cid: [0, 2],
            target: "parent",
            text: "留意子女專注的位置",
            image: "/category/1-focus.png"
        },
        {
            mid: 1,
            cid: [0, 2],
            target: "parent",
            text: "留意子女專注的位置",
            image:  "/category/2-social.png"
        },
        {
            mid: 2,
            cid: [1],
            target: "parent",
            text: "留意子女專注",
            image:  "/category/3-language.png"
        },
        {
            mid: 3,
            cid: [3],
            target: "parent",
            text: "留意子女專注的位置",
            image:  "/category/4-read.png"
        }
    ]
    const child_missions = [
        {
            mid: 0,
            cid: [0, 2],
            target: "child",
            text: "ask your parent!",
            image: "/static/read-read.png"
        },
        {
            mid: 1,
            cid: [0, 2],
            target: "child",
            text: "child mission 2!",
            image: "/static/read-read.png"
        },
        {
            mid: 2,
            cid: [1],
            target: "child",
            text: "mission3!",
            image: "/static/read-read.png"
        },
        {
            mid: 3,
            cid: [3],
            target: "child",
            text: "mission4!",
            image: "/static/read-read.png"
        }
    ]
    var missions = props.type == "parent" ? parent_missions : child_missions
    const filtered_missions = missions.filter(mission => mission.cid.includes(props.category));

    return (
        <ScrollShadow className="w-full h-[80vh]">
            {filtered_missions.map((mission, index) => (
                <div style={{ margin: "auto", marginBottom: "10px" }} key={uuidv4()} onClick={() => { props.func({ ...mission, id: uuidv4(), initialPosition: { x: 0, y: 0 }, text: mission.text }); }}>
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
                            className="z-0 w-full h-[120px] object-cover rounded-none"
                            src={mission.image}
                        />
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-white ">
                            <span className=''>{mission.text}</span>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </ScrollShadow>
    )
}