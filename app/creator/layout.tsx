"use client";
import styles from './creator.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faPalette,
    faPeopleRoof,
    faChildReaching,
    faWandMagicSparkles,
    faWrench,
    faFloppyDisk,
    faShare
 } from "@fortawesome/free-solid-svg-icons";

 import { usePathname } from 'next/navigation'

 import {Link,Tabs, Tab,Card, CardHeader, CardBody, CardFooter, Image, NextUIProvider, ScrollShadow, ThemeColors,Button} from "@nextui-org/react";


import EmblaCarousel from '@/app/ui/carousel/EmblaCarousel'
import clsx from 'clsx';
import React from 'react';



 export default function Layout({
    children,...props
  }: {
    children: React.ReactNode;
  },)  {
    const SLIDE_COUNT = 13
    // const SLIDES = Array.from(Array(SLIDE_COUNT).keys()
    var SLIDES = [
        {
            "framework": "left",
            "mode": "focus",
            "user_image": {
                "uri": "https://nextui.org/images/card-example-4.jpeg"
            }, 
            "image" : "https://nextui.org/images/fruit-1.jpeg", 
            "missions": {
                "parents": {
                    "frame": 0,
                    "mission": "mid"
                },
                "children": {
                    "frame": 0,
                    "mission": "mid"
                }
            }

        },
        {
            "framework": "top",
            "mode": "focus",
            "user_image": {
                "uri": "https://nextui.org/images/card-example-4.jpeg"
            }, 
            "image" : "https://nextui.org/images/fruit-2.jpeg", 
            "missions": {
                "parents": {
                    "frame": 0,
                    "mission": "mid"
                },
                "children": {
                    "frame": 0,
                    "mission": "mid"
                }
            }

        }
    ]
    const pathname = usePathname()


    const [values, setValues] = React.useState(0);
    const handleSlideChange = (index) => {
        console.log(index)
        setValues(index);
    };
    const [page, setPage] = React.useState("");
    var tabs = [
        {
            key :"books",
            title : "範本"
        },
        {
            key :"framework",
            title : "t2"
        },
        {
            key :"mode",
            title : "t3"
        }
    ]
    const switchPage = (e,path:string) => {
        setPage(path);
        switch (page) {
            case "creator":
                tabs = [
                    {
                        key :"books",
                        title : "範本"
                    },
                    {
                        key :"framework",
                        title : "t2"
                    },
                    {
                        key :"mode",
                        title : "t3"
                    }
                ]
                break
            case "parentMission":
                tabs = [
                    {
                        key :"category",
                        title : "Categ"
                    },
                    {
                        key :"framework",
                        title : "t2"
                    },
                    {
                        key :"mode",
                        title : "t3"
                    }
                ]
                break
            case "childMission":
                tabs = [
                    {
                        key :"books",
                        title : "範本"
                    },
                    {
                        key :"framework",
                        title : "t2"
                    },
                    {
                        key :"mode",
                        title : "t3"
                    }
                ]
                break
            case "tools":
                tabs = [
                    {
                        key :"books",
                        title : "範本"
                    },
                    {
                        key :"framework",
                        title : "t2"
                    },
                    {
                        key :"mode",
                        title : "t3"
                    }
                ]
                break
            default:
                tabs = [
                    {
                        key :"books",
                        title : "範本"
                    },
                    {
                        key :"framework",
                        title : "t2"
                    },
                    {
                        key :"mode",
                        title : "t3"
                    }
                ]
        }
    }
    const [frame, setFrame] = React.useState(0);
    const Context = React.createContext("left");
    
    // const handleFrameChange = (index) => {
    //     console.log(index)
    //     setFrame(index);
    // };
    // const [ context, setContext ] = React.useState({theme:"",page_config:[{}]})


    return (
        <NextUIProvider style={{height:"100%"}}>
      <main className={styles.Palette}>
        {/* <div  > */}
            <div style={{
                background:"#808080",
                display:"flex",
                flexDirection:"column",
                textAlign: "center"
            }}>
                <div className={styles.item} onClick={(e) => switchPage(e, "creator")}>
                    <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                    <span>製作繪本</span>
                </div>
                <div className={styles.item} onClick={(e) => switchPage(e, "parentMission")}>
                    <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                    <span>家長任務</span>
                </div>
                <div className={styles.item} onClick={(e) => switchPage(e, "childMission")}>
                    <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                    <span>孩子任務</span>
                </div>
                <div className={styles.item} onClick={(e) => switchPage(e, "tools")}>
                    <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                    <span>智能工具</span>
                </div>
                <div className={styles.item} onClick={(e) => switchPage(e, "aaaaa")}>
                    <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                    <span>了解更多</span>
                </div>

                
            </div>
            {/* <Context.Provider value={{frame,setFrame}}> */}
            <div style={{background:"#525252"}} className='w-[250px]'>
                <Tabs variant="underlined"  size="lg" fullWidth={Boolean(true)} color="primary" style={{padding:"20px 0"}}>
                    <Tab title="Books" className={`w-full ${page=="books" && "visible"}`} ><BooksTab/></Tab>
                    <Tab title="Framework" className={`w-full ${page=="framework" && "visible"}`} ><FrameworkTab/></Tab>
                    <Tab title="Mode" className={`w-full ${page=="mode" && "visible"}`} ><ModeTab/></Tab>
                    <Tab title="Category" className={`w-full ${page=="category" && "visible"}`} ><CategoryTab/></Tab>
                    {/* <Tab title="Books" className={`w-full ${page=="books" && "visible"}`} ><BooksTab/></Tab>
                    <Tab title="Books" className={`w-full ${page=="books" && "visible"}`} ><BooksTab/></Tab> */}
                </Tabs>
            </div>
            {/* </Context.Provider> */}
                <div className='justify-center items-center flex grow h-full w-full flex-col'>
                {/* <div className='bg-black' style={{aspectRatio:4/3,height:"60vh"}}></div> */}
                <div className='flex flex-row justify-end p-2 w-full mt-2'>
                    <Button radius="full" size="sm" className="mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                        <FontAwesomeIcon icon={faFloppyDisk} className="fas fa-check"></FontAwesomeIcon>
                        Save
                    </Button>
                    <Button radius="full" size="sm" className="mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                        <FontAwesomeIcon icon={faShare} className="fas fa-check"></FontAwesomeIcon>
                        Export
                    </Button>
                </div>
                <EmblaCarousel slides={SLIDES} onChange={handleSlideChange} />
                
                
            </div>
            
        </main>
        </NextUIProvider>

    )
  }






type Book = {
  theme : string;
  page_config : Array<object>
}
const booklists = [1,2,3,4,5]


export const BooksTab = ()=>{
  return ( 
//   <Tab key="theme" title="範本" className="w-full " >
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

  )
}

export const  FrameworkTab = ()=>{
  return ( 
    // <Tab key="framework" tit/le="框架" className="w-full">
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



  )
}

export const  ModeTab = ()=>{
  return ( 

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

  )
}

export const  CategoryTab = () => {
    return (
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
    )
}