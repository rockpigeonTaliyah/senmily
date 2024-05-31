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
 import jsPDF from 'jspdf';
 import html2canvas from 'html2canvas';

import EmblaCarousel from '@/app/ui/carousel/EmblaCarousel'
import React from 'react';
import { Page } from '@/type/Page';


 export default function Page()  {
    const pathname = usePathname()
    const [book, setBook] = React.useState({
        bid : null,
        title : "",
        coverImage : "",
        pages : [
            {
                modes :[
                    {
                        id : 0,
                        image :"https://nextui.org/images/card-example-1.jpeg"
                    }
                ]
            }
        ],
        page_config : [
            {
                
                "framework": "bottom",
                "mode": null,
                "user_image": null,
                "image" : "", 
                "missions": [{text:"+"}]
            }
        ]
    });
    var BookRef = {};
    const UpdateBook  = (e:any,book:any) => {
        setBook(original_book => ({
          ...original_book,
            bid:book.bid ,
            title : "",
            coverImage : book.coverImage,
            pages : book.pages,
            page_config : book.pages.map((page: any) => {
            return {
                "framework": null,
                "mode": 0,
                "user_image": null,
                "image" : page.modes[0].image, 
                "missions": [{text:"+"}]
            }
            },)
        }));
    }
    const [Frame, setFrame] = React.useState(null);
    const UpdateFramework = (frame:any)=>{
        console.log("Update Frame",frame)
        console.log("Current Slide : ",currentSlide);
        var new_book = book;
        new_book.page_config[currentSlide].framework = frame;
        // setBook(new_book)
        setBook(prevBook => ({
            ...prevBook,
            page_config: prevBook.page_config.map((config, index) =>
              index === currentSlide ? { ...config, framework: frame } : config
            ),
          }));
    }
    const [Mode, setMode] = React.useState(null);
    const UpdateMode = (mode:any)=>{
        var new_book = book;
        new_book.page_config[currentSlide].mode = mode
        setBook(prevBook => ({
            ...prevBook,
            page_config: prevBook.page_config.map((config, index) =>
              index === currentSlide ? { ...config, mode: mode, image:prevBook.pages[currentSlide].modes[mode].image } : config
            ),
          }));
    }
    const [Mission, setMission] = React.useState([]);
    const UpdateMission = (mission:any)=>{
        console.log("Current Missions",book.page_config[currentSlide].missions);
        const emptyIndexes = book.page_config[currentSlide].missions.reduce((acc:Array<any>, item, index) => {
            if (item.text && item.text === "+") {
              acc.push(index);
            }
            return acc;
          }, []);
          var missions =book.page_config[currentSlide].missions;
          const res: boolean = missions
            .map(obj => JSON
                .stringify(obj))
            .includes(JSON.stringify(mission));
          if(res){
            console.log("mission already in !")
          }
          console.log("Missions", missions);
          emptyIndexes.length != 0 && (missions[emptyIndexes[0]] = mission);
        setBook(prevBook => ({
            ...prevBook,
            page_config: prevBook.page_config.map((config, index) =>
              index === currentSlide ? { ...config, missions:missions} : config
            ),
          }));
    }
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const handleSlideChange = (index:any) => {
        console.log(index)
        console.log("testing");

        setCurrentSlide(index);
    };
    const [page, setPage] = React.useState("creator");
    const [parent_tab, setParentTab] = React.useState(0);
    const [child_tab, setChildTab] = React.useState(0);
    const [category,setCateory] = React.useState(0);
    const UpdateCategory = (categ:any)=>{
        setCateory(categ);
    }
    return (
        <NextUIProvider style={{height:"100%"}}>
      <main className={styles.Palette}>
        {/* <div  > */}
            <div style={{
                background:"#696969",
                display:"flex",
                flexDirection:"column",
                textAlign: "center"
            }}>
                <div className={`${styles.item} ${page =="creator" && styles.highlighted}`} onClick={()=>setPage("creator")}>
                    <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                    <span>製作繪本</span>
                </div>
                <div className={`${styles.item} ${page =="parentMission" && styles.highlighted}`} onClick={()=>setPage("parentMission")}>
                    <FontAwesomeIcon icon={faPeopleRoof} className="fas fa-check"></FontAwesomeIcon>
                    <span>家長任務</span>
                </div>
                <div className={`${styles.item} ${page =="childMission" && styles.highlighted}`} onClick={()=>setPage("childMission")}>
                    <FontAwesomeIcon icon={faChildReaching} className="fas fa-check"></FontAwesomeIcon>
                    <span>孩子任務</span>
                </div>
                <div className={`${styles.item} ${page =="tools" && styles.highlighted}`} onClick={()=>setPage("tools")}>
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="fas fa-check"></FontAwesomeIcon>
                    <span>智能工具</span>
                </div>
                <div className={`${styles.item} ${page =="" && styles.highlighted}`} onClick={()=>setPage("")}>
                    <FontAwesomeIcon icon={faWrench} className="fas fa-check"></FontAwesomeIcon>
                    <span>了解更多</span>
                </div>

                
            </div>
            {/* <Context.Provider value={{frame,setFrame}}> */}
            <div style={{background:"#383838"}} className='w-[250px]'>
                {
                    page=="creator" && 
                    <Tabs key="creator" variant="underlined"  size="lg" fullWidth={Boolean(true)} color="primary" style={{padding:"20px 10px 0"}}  >
                        <Tab title="範本" ><BooksTab func={UpdateBook} bid={book.bid}/></Tab>
                        <Tab title="框架" ><FrameworkTab func={UpdateFramework} framework={book.page_config[currentSlide].framework}/></Tab>
                        <Tab title="模式" ><ModeTab func={UpdateMode} mode={book.page_config[currentSlide].mode}/></Tab>
                    </Tabs>
                    ||
                    page=="parentMission" &&
                    <Tabs key="parent" variant="underlined"  size="lg" fullWidth={Boolean(true)} color="primary" style={{padding:"20px 10px 0"}}>
                        <Tab title="目標"  className="w-full" ><CategoryTab type="parent" func={UpdateCategory}/></Tab>
                        <Tab title="任務"  className="w-full" ><MissionTab type="parent" category={category}  func={UpdateMission}/></Tab>
                        <Tab title="外框"  className="w-full" ><OuterframeTab type="parent" /></Tab>
                    </Tabs>
                    ||
                    page=="childMission" &&
                    <Tabs key="child" variant="underlined"  size="lg" fullWidth={Boolean(true)} color="primary" style={{padding:"20px 10px 0"}}  >
                        <Tab title="目標" value="0" className="w-full" ><CategoryTab type="child" func={UpdateCategory}/></Tab>
                        <Tab title="任務" value="1" className="w-full" ><MissionTab type="child" category={category} func={UpdateMission}/></Tab>
                        <Tab title="外框" value="2" className="w-full" ><OuterframeTab type="child"/></Tab>
                    </Tabs>
                    ||
                    page=="tools" && <ToolsView></ToolsView>
                }
                
                

                
            </div>
            {/* </Context.Provider> */}
                <div className='justify-center items-center flex grow h-full w-full flex-col'>
                {/* <div className='bg-black' style={{aspectRatio:4/3,height:"60vh"}}></div> */}
                <div className='flex flex-row justify-end p-2 w-full mt-2'>
                    <Button radius="full" size="sm" className="mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                        <FontAwesomeIcon icon={faFloppyDisk} className="fas fa-check"></FontAwesomeIcon>
                        Save
                    </Button>
                    <Button radius="full" size="sm" className="mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={generatePDF}>
                        <FontAwesomeIcon icon={faShare} className="fas fa-check"></FontAwesomeIcon>
                        Export
                    </Button>
                </div>
                <EmblaCarousel slides={book} onChange={handleSlideChange} />
                
                
            </div>
            
        </main>
        </NextUIProvider>

    )
  }






type Book = {
  theme : string;
  page_config : Page[]
}
const booklists = [1,2,3,4,5]




const BooksTab = (props:any)=>{
    var books = [
        {
            bid : 0,
            title : "",
            coverImage : "/resources/library/book1/coverImage.png",
            pages : [
                {
                    modes :[
                        {
                            id : 0,
                            image :"https://nextui.org/images/card-example-1.jpeg"
                        },
                        {
                            id : 1,
                            image :"https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id : 2,
                            image :"https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id : 3,
                            image :"https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    modes :[
                        {
                            id : 0,
                            image :"https://nextui.org/images/card-example-5.jpeg"
                        },
                        {
                            id : 1,
                            image :"https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id : 2,
                            image :"https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id : 3,
                            image :"https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    modes :[
                        {
                            id : 0,
                            image :"https://nextui.org/images/card-example-1.jpeg"
                        },
                        {
                            id : 1,
                            image :"https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id : 2,
                            image :"https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id : 3,
                            image :"https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    modes :[
                        {
                            id : 0,
                            image :"https://nextui.org/images/card-example-2.jpeg"
                        },
                        {
                            id : 1,
                            image :"https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id : 2,
                            image :"https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id : 3,
                            image :"https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    modes :[
                        {
                            id : 0,
                            image :"https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id : 1,
                            image :"https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id : 2,
                            image :"https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id : 3,
                            image :"https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
            ]
        }
    ]
    
  return ( 
    <ScrollShadow className="w-full h-[80vh]">
    {books.map((book,index) => (
      <div className="m-auto mb-2 flex justify-center items-center" key={index}  onClick={(e) => props.func(e, book)}>
          <Image
            loading="eager"
            alt="Card background"
            className={`z-0 w-[200px] h-full object-cover ${props.bid == book.bid && "rounded-lg border-slate-300 border-4"}`}
            src={book.coverImage}
          />
      </div>
    ))}
    </ScrollShadow>

  )
}


 const  FrameworkTab = (props:any)=>{
    console.log(props.book);
    const frameworkList = [
        {
            name : null,
            image :"/static/frame-none.png"
        },
        {
            name : "top",
            image :"/static/frame-top.png"
        },
        {
            name : "left",
            image :"/static/frame-left.png"
        },
        {
            name : "right",
            image :"/static/frame-right.png"
        },
        {
            name : "bottom",
            image :"/static/frame-bottom.png"
        }
    ]
    console.log("Props Framwrok:  ",props.framework);
  return ( 
    // <Tab key="framework" tit/le="框架" className="w-full">
      <ScrollShadow className="w-full h-[80vh]">
        {frameworkList.map((framework,index) => (
            
          <div style={{margin:"auto",marginBottom:"10px"}} key={index} onClick={()=>props.func(framework.name)}>
        <Image
            removeWrapper
            alt="Card background"
            className={`z-0 w-full h-full object-cover rounded-none ${props.framework == framework.name && "rounded-lg border-slate-300 border-4"}`}
            style={{margin:"auto",width: "180px",height: "120px"}}
            src={framework.image}
          />
        </div>
        ))}
        
        </ScrollShadow>



  )
}

 const  ModeTab = (props:any)=>{
    const modeList = [
        {
            mid : 0,
            name : "一般模式",
            image: "/static/mode-normal.png"
        },
        {
            mid : 1,
            name : "專注模式",
            image: "/static/mode-1.png"
        },
        {
            mid : 2,
            name : "認讀模式",
            image: "/static/mode-2.png"
        },
        {
            mid : 3,
            name : "社交模式",
            image: "/static/mode-3.png"
        }
    ]
  return ( 

    <ScrollShadow className="w-full h-[80vh]">
        
        {modeList.map((mode:any) => (
          <div style={{margin:"auto",marginBottom:"10px"}} className='text-center' key={mode.mid} onClick={()=>props.func(mode.mid)}>
            <Image
            removeWrapper
            alt="Card background"
            className={`z-0 w-full h-full object-cover rounded-none ${props.mode == mode.mid && "rounded-lg border-slate-300 border-4"}`}
            src={mode.image}
            style={{margin:"auto",width: "180px",height: "120px"}}
          />
          <div><span>{mode.name}</span></div>
          
        </div>
        ))}
        
        </ScrollShadow>

  )
}

 const  CategoryTab = (props:any) => {
    var category : object[] = [];
    if (props.type && props.type === "parent"){
        category =  [
            {
                "image" : "https://nextui.org/images/fruit-4.jpeg",
                "categ_name" : "專注閱讀",
                cid:0
            },
            {
                "image" : "https://nextui.org/images/fruit-3.jpeg",
                "categ_name" : "社交學習",
                cid:1
            },
            {
                "image" : "https://nextui.org/images/fruit-3.jpeg",
                "categ_name" : "語言理解",
                cid:2
            },
            {
                "image" : "https://nextui.org/images/fruit-3.jpeg",
                "categ_name" : "讀寫學習",
                cid:3
            }
        ]
    }
    else if (props.type && props.type === "child"){
        category =  [
            {
                "image" : "https://nextui.org/images/fruit-4.jpeg",
                "categ_name" : "專注閱讀",
                cid:0
            },
            {
                "image" : "https://nextui.org/images/fruit-3.jpeg",
                "categ_name" : "社交學習",
                cid:1
            },
            {
                "image" : "https://nextui.org/images/fruit-3.jpeg",
                "categ_name" : "語言理解",
                cid:2
            },
            {
                "image" : "https://nextui.org/images/fruit-3.jpeg",
                "categ_name" : "讀寫學習",
                cid:3
            }
        ]
    }
    return (
  <ScrollShadow className="w-full h-[80vh]">
        
  {category.map((categ:any) => (
    <div className="m-auto text-white" key={categ.categ_name}  onClick={()=>props.func(categ.cid)}>
    <Card 
      className="col-span-12 sm:col-span-4 bg-0 rounded-none" 
      shadow="none"
      style={{
          margin:"auto",
          width: "180px",
          
          marginBottom:"10px"}}>
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


 const  MissionTab = (props:any) => {
    const parent_missions = [
        {
          mid :0,
          cid : [0,2],
          target : "parent",
          text :"留意子女專注的位置",
          image : "/static/read-read.png"
        },
        {
          mid :1,
          cid : [0,2],
          target : "parent",
          text :"留意子女專注的位置",
          image : "/static/read-read.png"
        },
        {
          mid :2,
          cid : [1],
          target : "parent",
          text :"留意子女專注",
          image : "/static/read-read.png"
        },
        {
            mid :3,
            cid : [3],
            target : "parent",
            text :"留意子女專注的位置",
            image : "/static/read-read.png"
          }
      ]
      const child_missions = [
        {
          mid :0,
          cid : [0,2],
          target : "child",
          text :"ask your parent!",
          image : "/static/read-read.png"
        },
        {
          mid :1,
          cid : [0,2],
          target : "child",
          text :"child mission 2!",
          image : "/static/read-read.png"
        },
        {
          mid :2,
          cid : [1],
          target : "child",
          text :"mission3!",
          image : "/static/read-read.png"
        },
        {
            mid :3,
            cid : [3],
            target : "child",
            text :"mission4!",
            image : "/static/read-read.png"
          }
      ]
  var missions = props.type == "parent" ? parent_missions : child_missions
  console.log("Category Chosen: ",props.categ);
  
  const filtered_missions = missions.filter(mission => mission.cid.includes(props.category));
  

return (
  <ScrollShadow className="w-full h-[80vh]">
        
  { filtered_missions.map((mission,index) => (
    <div style={{margin:"auto",marginBottom:"10px"}} key={index} onClick={()=>props.func(mission)}>
    <Card 
      className="col-span-12 sm:col-span-4 bg-0 rounded-none" 
      shadow="none"
      style={{
          margin:"auto",
          width: "180px",
          
          marginBottom:"10px"}}>
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

 const  OuterframeTab = (props:any) => {
  var frames = [
    {
      fid :0,
      image : "/static/outerframe-1.png"
    },
    {
      fid :1,
      image : "/static/outerframe-2.png"
    },
    {
      fid :2,
      image : "/static/outerframe-3.png"
    },
    {
      fid :3,
      image : "/static/outerframe-4.png"
    },
    {
      fid :4,
      image : "/static/outerframe-5.png"
    }
  ]
    return (
  <ScrollShadow className="w-full h-[80vh]">
        
  {frames.map((frame,index) => (
    <div style={{margin:"auto",marginBottom:"10px"}} key={index}>
    <Card 
      className="col-span-12 sm:col-span-4 bg-0 rounded-none" 
      shadow="none"
      style={{
          margin:"auto",
          width: "180px",
          
          marginBottom:"10px"}}>
      <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-[120px] object-cover rounded-none"
      src={frame.image}
      />
  </Card>
  </div>
  ))}
  
  </ScrollShadow>
    )
}

const generatePDF = async () => {
    const doc = new jsPDF('l', 'mm');
    
    const slides = document.querySelectorAll('.embla__slide__number');
    

    for (let i = 0; i < slides.length; i++) {
        await html2canvas(slides[i] as HTMLElement, {
            allowTaint: true,
            useCORS: true,
        })
        .then(function(canvas) {
            var imgData = canvas.toDataURL('image/jpeg');
            doc.addImage(imgData, 'JPG', 0, 0, 297, 210);
            console.log(`Slide ${i} captured successfully.`);
        })
        .catch(function(error) {
            console.error(`Failed to capture slide ${i}:`, error);
        });

        
        
        if (i < slides.length - 1) {
          doc.addPage();
        }
    }
    console.log("finished")
    doc.save('book-export.pdf');
};

const ToolsView = () => {
    return (
        <>
        <div className='w-full h-full pt-[3rem]'>
        <div className="m-auto text-center w-[180px] mb-1">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-[120px] object-cover rounded-none"
                src="/static/mode-normal.png"
            />
            <div className="my-2 text-white"><span>自訂角色</span></div>
        </div>
        <div className="m-auto text-center w-[180px] mb-1">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-[120px] object-cover rounded-none"
                src="/static/mode-normal.png"
            />
            <div className="my-2 text-white"><span>Chatbot</span></div>
        </div>
        <div className="m-auto text-center w-[180px] mb-1">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-[120px] object-cover rounded-none"
                src="/static/mode-normal.png"
            />
            <div className="my-2 text-white"><span>AI picture</span></div>
        </div>
        </div>
        </>
    );
//     自訂角色
// Chatbot
// AI picture
}


