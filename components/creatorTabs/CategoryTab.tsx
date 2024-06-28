import React from 'react';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";

export const CategoryTab = (props: any) => {
    var category: object[] = [];
    if (props.type && props.type === "parent") {
        category = [
            {
                "image": "/category/1-focus.png",
                "categ_name": "專注閱讀",
                cid: 0
            },
            {
                "image": "/category/2-social.png",
                "categ_name": "社交學習",
                cid: 1
            },
            {
                "image":"/category/3-language.png",
                "categ_name": "語言理解",
                cid: 2
            },
            {
                "image":  "/category/4-read.png",
                "categ_name": "讀寫學習",
                cid: 3
            }
        ]
    }
    else if (props.type && props.type === "child") {
        category = [
            {
                "image": "/category/1-focus.png",
                "categ_name": "專注閱讀",
                cid: 0
            },
            {
                "image": "/category/2-social.png",
                "categ_name": "社交學習",
                cid: 1
            },
            {
                "image":"/category/3-language.png",
                "categ_name": "語言理解",
                cid: 2
            },
            {
                "image":  "/category/4-read.png",
                "categ_name": "讀寫學習",
                cid: 3
            }
        ]
    }
    return (
        <ScrollShadow className="w-full h-[80vh]">
            {category.map((categ: any) => (
                <div className="m-auto text-white" key={categ.categ_name} onClick={() => props.func(props.type, categ.cid)}>
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
                            src={categ.image}
                        />
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center ">
                            <span className="text-large text-white">{categ.categ_name}</span>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </ScrollShadow>
    )
}