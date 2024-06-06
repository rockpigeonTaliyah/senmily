"use client"

import { Avatar, Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useState,useEffect } from "react";

const Steps = [
    {
        id : 1,
        message : "小朋友鍾意咩題材內容 ? ",
        type : "bot",
        choices : {
            A: "交通",
            B: "動物",
            C: "冒險",
            D: "科學",
        },
        api : "",
        trigger : 2
    },
    {
        id : 2,
        message : "小朋友睇書有咩困難 ? ",
        type : "bot",
        api :"",
        choices : {
            A: "阿仔好難專注",
            B: "文字程度太難",
            C: "故事情節太複雜",
            D: "唔明啲人物想法",
        }
    }
]


export default function Chatbot(){
    const [record, setRecord] =useState([]);
    const [step, setStep] =useState(0);
    useEffect(() => {
        // 
        setRecord((record) => [
                        ...record,
                        Steps[step]
        ])
    }, [Steps,step]); 
    const triggerStep = (id:number)=>{

        setRecord((record) => [
                ...record,
                Steps[id-1]
        ])
    }
    return (
        record.map((r,index)=>{
            // return "asdasd"
            console.log(r)
            if(r.type == "bot"){return <QuestionBlock key={index} block={r} triggerStep={triggerStep} updateRecord={setRecord} />}
            else if (r.type == "answer"){return <AnswerBlock key={index} block={r}/>}
        })
    )

}  

const QuestionBlock = ({block, ...props }) => {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div className="w-full flex flex-row gap-4 items-center justify-start my-5">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
        <Card className="min-w-[20rem]">
            <CardHeader className="flex gap-3">
                <span className='font-bold'>{block.message}</span>
            </CardHeader>
            <Divider/>
            {
            block.choices && Object.keys(block.choices).map((key, index) => {
                return (
                    
                <Button className={`rounded-none  bg-transparent`} key={index} isDisabled={isClicked}  onClick={(e)=>
                    {
                        setIsClicked(true);
                        
                        props.updateRecord((r)=>[
                            ...r,
                            {
                                type:"answer",
                                message : block.choices[key]
                            }
                        ])
                        if (block.id === 1){
                            var msg = "謝謝您!\n已為你推薦書本《神奇的動物王國》。"
                        }else {
                            var msg = "謝謝您!\n已為您調整至專注模式"
                        }
                        props.updateRecord((r)=>[
                            ...r,
                            {
                                type:"bot",
                                message : msg
                            }
                        ])
                        if(block.trigger){
                            
                            props.triggerStep(block.trigger)
                            // fetch(block.api)
                            //     .then(response => response.json()) // Convert the response data to a JSON object
                            //     .then(data => {
                            //     // Do something with 'data'
                            //     props.triggerStep(block.trigger) // Call the trigger step function
                            //     })
                            //     .catch(error => console.error('Error:', error)); // Catch and log any errors
                            }
                        }
                }>{`${key}. ${block.choices[key]}`}</Button>
                );
            })
            }
        </Card>
    </div>
    )
};


const AnswerBlock = ({block,...props}) => {
    return (
        <div className="w-full flex flex-row gap-4 items-center justify-end my-5">
            <Card className="h-min gap-4">
                <CardBody >
                    <span>{block.message}</span>
                </CardBody>
            </Card>
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
        </div>
    )
}