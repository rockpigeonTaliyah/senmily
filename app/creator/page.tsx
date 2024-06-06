"use client";
import styles from './creator.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPalette, faPeopleRoof, faChildReaching,
    faWandMagicSparkles, faFloppyDisk, faShare
} from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from 'uuid';
import { Link, Card, CardHeader, Image, NextUIProvider, ScrollShadow, Button ,Avatar, CardBody, Divider, CardFooter, ButtonGroup, CircularProgress} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import EmblaCarousel, { EmblaCarouselHandles } from '@/app/ui/carousel/EmblaCarousel'
import React, { useState, useCallback, useRef } from 'react';
import { PageConfig, Mission } from '@/type/Page';
import Chatbot from '@/app/ui/chatbot/page';
import  AvatarCreator from '@/app/ui/avatar/page';

// const handleItemsChange = (pageIndex: number, updatedItems: Mission[]) => {
//   console.log(`Items in slide ${pageIndex} updated: `, updatedItems);
// };

export default function Page() {
    const [loading , setLoading] = useState(false);
    const [parent_mission_selectKey, set_parent_mission_selectKey] = useState("0");
    const [children_mission_selectKey, set_children_mission_selectKey] = useState("0");
    const [focusMission, setFocusMission] = useState({});
    const emblaRef = useRef<EmblaCarouselHandles>(null);
    const [book, setBook] = useState({
        bid: null,
        title: "",
        coverImage: "",
        pages: [{ modes: [{ id: 0, image: "" }] }],
        page_config: [{ framework: "bottom", mode: null, user_image: null, image: "", missions: [] }],
    });
    const [currentSlide, setCurrentSlide] = useState(0);

    const UpdateBook = (e: any, book: any) => {
        setBook((originalBook) => ({
            ...originalBook,
            bid: book.bid,
            title: "",
            coverImage: book.coverImage,
            pages: book.pages,
            page_config: book.pages.map((page: any) => ({
                framework: null,
                mode: 0,
                user_image: null,
                image: page.modes[0].image,
                missions: [{
                    cid : [],
                    mid : 0,
                    id :uuidv4(),
                    initialPosition: {
                        x:388 ,
                        y:590,
                    },
                    frame:"",
                    image:"",
                    target : "",
                    text: page.text,
                }],
            })),
        }));
    };

    // const UpdateFramework = (frame: any) => {
    //     setBook((prevBook) => ({
    //         ...prevBook,
    //         page_config: prevBook.page_config.map((config, index) =>
    //             index === currentSlide ? { ...config, framework: frame } : config
    //         ),
    //     }));
    // };

    const UpdateMode = (mode: any) => {
        setBook((prevBook) => ({
            ...prevBook,
            page_config: prevBook.page_config.map((config: any, index) =>
                index === currentSlide ? { ...config, mode, image: prevBook.pages[currentSlide].modes[mode].image } : config
            ),
        }));
    };

    const UpdateMission = (mission: Mission) => {
        if (mission.target === "parent") set_parent_mission_selectKey("2");
        if (mission.target === "child") set_children_mission_selectKey("2");

        setFocusMission({ ...mission, initialPosition: { x: 0, y: 0 } });
    };

    const UpdateOuterFrame = (outerframe: any) => {
        if (Object.keys(focusMission).length === 0) return;

        const updatedFocusMission = {
            ...focusMission,
            frame: outerframe,
        };

        const missions = [...book.page_config[currentSlide].missions, updatedFocusMission];

        setBook((prevBook) => ({
            ...prevBook,
            page_config: prevBook.page_config.map((config, index) =>
                index === currentSlide ? { ...config, missions } : config
            ),
        }));
        setFocusMission({})
    };

    const handleItemsChange = useCallback((pageIndex: number, updatedItem: Mission) => {
      setBook((prevBook) => ({
          ...prevBook,
          page_config: prevBook.page_config.map((config, index) =>
              index === pageIndex ? {
                  ...config,
                  missions: config.missions.map((mission) =>
                      mission.id === updatedItem.id ? { ...mission, ...updatedItem } : mission
                  )
              } : config
          ),
      }));
  }, []);
  

    const handleSlideChange = (index: number) => {
        // console.log("Slide changes : ",index-1);
        
        setCurrentSlide(index);
        // console.log(book.page_config[currentSlide]);
    };

    const [page, setPage] = useState("creator");
    const [category, setCategory] = useState(0);

    const UpdateCategory = (categType: any, categ: any) => {
        if (categType === "parent") { set_parent_mission_selectKey("1"); }
        if (categType === "child") { set_children_mission_selectKey("1"); }
        setCategory(categ);
    };

    const saveBook = () => {
        var b = book;
        b.pages = null;
        // unset(b.pages);
        console.log("final book:",b);
        console.log("final book:", JSON.stringify(b));
    };

    const [isFullscreen,setFullscreen] = useState(false);
    return (
        <NextUIProvider style={{ height: "100%" }}>
            <div className={`duration-300 transition-all left-0 top-0 w-full h-full bg-white text-center justify-center items-center flex fixed   ${loading?"z-50 opacity-100":"-z-10 opacity-0"} `}><CircularProgress label="Loading..." /></div>
            <div className={`text-white border-box fixed w-full h-[2rem] top-0 left-0 ${
                isFullscreen ? "z-30 block" : " -z-10 hidden"
            }`} onClick={(e)=>{
             let emblaDiv = document.querySelector(".embla") as HTMLElement; // type assertion here
             setLoading(true);
              setTimeout(() => {
                // Change the styles
                emblaDiv.style.top = `0px`;
                emblaDiv.style.left = `0px`;

                // Remove the fullscreen class
                emblaDiv.classList.remove("fullscreen");
                setFullscreen(false);
                // Wait for another 3 seconds for the styles to update
                setTimeout(() => {
                  // Then disable loading
                  setLoading(false);
                }, 500);
              }, 1000);
            }}>shrink <FontAwesomeIcon icon={faFloppyDisk} className="fas fa-check"></FontAwesomeIcon></div>
            <main className={styles.Palette}>
                <div style={{
                    background: "#696969",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center"
                }}>
                    <div className={`${styles.item} ${page === "creator" && styles.highlighted}`} onClick={() => setPage("creator")}>
                        <FontAwesomeIcon icon={faPalette} className="fas fa-check"></FontAwesomeIcon>
                        <span>製作繪本</span>
                    </div>
                    <div className={`${styles.item} ${page === "parentMission" && styles.highlighted}`} onClick={() => setPage("parentMission")}>
                        <FontAwesomeIcon icon={faPeopleRoof} className="fas fa-check"></FontAwesomeIcon>
                        <span>家長任務</span>
                    </div>
                    <div className={`${styles.item} ${page === "childMission" && styles.highlighted}`} onClick={() => setPage("childMission")}>
                        <FontAwesomeIcon icon={faChildReaching} className="fas fa-check"></FontAwesomeIcon>
                        <span>孩子任務</span>
                    </div>
                    <div className={`${styles.item} ${/^tools*/.test(page) && styles.highlighted}`} onClick={() => setPage("tools")}>
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="fas fa-check"></FontAwesomeIcon>
                        <span>智能工具</span>
                    </div>
                </div>

                <div style={{ background: "#383838" }} className=''>
                    {page === "creator" &&
                        <Tabs key="creator" variant="underlined" size="lg" fullWidth={Boolean(true)} color="primary">
                            <Tab title="範本" key="0"><BooksTab func={UpdateBook} bid={book.bid} /></Tab>
                            <Tab title="模式" key="1"><ModeTab func={UpdateMode} book={book} slideid={currentSlide} /></Tab>
                        </Tabs>
                        ||
                        page === "parentMission" &&
                        <Tabs key="parent" variant="underlined" size="lg" fullWidth={Boolean(true)} color="primary" selectedKey={parent_mission_selectKey} onSelectionChange={(s) => set_parent_mission_selectKey(s.toString())}>
                            <Tab title="目標" key="0" className="w-full"><CategoryTab type="parent" func={UpdateCategory} /></Tab>
                            <Tab title="任務" key="1" className="w-full"><MissionTab type="parent" category={category} func={UpdateMission} /></Tab>
                            <Tab title="外框" key="2" className="w-full"><OuterframeTab type="parent" func={UpdateOuterFrame} /></Tab>
                        </Tabs>
                        ||
                        page === "childMission" &&
                        <Tabs key="child" variant="underlined" size="lg" fullWidth={Boolean(true)} color="primary" selectedKey={children_mission_selectKey} onSelectionChange={(s) => set_children_mission_selectKey(s.toString())}>
                            <Tab title="目標" key="0" className="w-full"><CategoryTab type="child" func={UpdateCategory} /></Tab>
                            <Tab title="任務" key="1" className="w-full"><MissionTab type="child" category={category} func={UpdateMission} /></Tab>
                                <Tab title="外框" key="2" className="w-full"><OuterframeTab type="child" func={UpdateOuterFrame} /></Tab>
                            </Tabs>
                        ||
                        /^tools*/.test(page)  && <ToolsView func={setPage}></ToolsView>
                    }
                </div>

                <div className=' items-center flex grow h-full w-full flex-col'>
                    {
                        page === "tools/chatbot" && <>
                            <div className="h-full w-full box-border px-5">
                                <Chatbot/>
                            </div>
                        </>
                        || page === "tools/avatar" && <>
                             <div className="h-full w-full box-border px-5">
                                <AvatarCreator/>
                            </div>
                        </>
                        || book.bid == null && <>
                            <div className="w-full h-full flex justify-center items-center">
                                <div className="w-[50%] h-[500px] text-center shadow-lg rounded-lg">請選擇範本</div>
                            </div>
                            {/* <div>{JSON.stringify(book)}</div> */}
                        </>
                        || book.bid != null && <>
                        <div className='flex flex-row justify-end w-full mt-2 py-2 border-box'>
                                            
                            <Button radius="full" size="sm" className="mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={(e)=>{
                                    let emblaDiv = document.querySelector(".embla") as HTMLElement; // type assertion here
                                    let rect = emblaDiv.getBoundingClientRect();
                                    setLoading(true);

                                    // Wait for 3 seconds for the loading overlay animation to complete
                                    setTimeout(() => {
                                        // Change the styles

                                        // Remove the fullscreen class
                                        emblaDiv.classList.add("fullscreen");
                                        setFullscreen(true);
                                        // Wait for another 3 seconds for the styles to update
                                        setTimeout(() => {
                                        // Then disable loading
                                        setLoading(false);
                                        }, 500);
                                    }, 500);
                                    
                            }}>
                                <FontAwesomeIcon icon={faFloppyDisk} className="fas fa-check"></FontAwesomeIcon>
                                Reader Mode
                            </Button>
                            <Button radius="full" size="sm" className="mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={saveBook}>
                                <FontAwesomeIcon icon={faFloppyDisk} className="fas fa-check"></FontAwesomeIcon>
                                Save
                            </Button>
                            <Button radius="full" size="sm" className="hidden mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={generatePDF}>
                                <FontAwesomeIcon icon={faShare} className="fas fa-check"></FontAwesomeIcon>
                                Export
                            </Button>
                        </div>
                        {/* <Stage ref={stageRef}/> */}
                        <EmblaCarousel  slides={book} onChange={handleSlideChange} onItemsChange={handleItemsChange} setLoading={setLoading}/>
                    </>
                    }
                </div>
            </main>
        </NextUIProvider>
    )
}

// Other supporting tabs...

const generatePDF = async () => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    const slides = document.querySelectorAll('.embla__slide__number');

    for (let i = 0; i < slides.length; i++) {
        await html2canvas(slides[i] as HTMLElement, {
            scale: 2,
            allowTaint: true,
            useCORS: true,
        })
        .then(function (canvas) {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 297; // A4 width in mm
            const pageHeight = 210; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            console.log(`Slide ${i} captured successfully.`);
        })
        .catch(function (error) {
            console.error(`Failed to capture slide ${i}:`, error);
        });

        if (i < slides.length - 1) {
            doc.addPage();
        }
    }

    console.log("finished");
    doc.save('book-export.pdf');
};

// Supporting Tabs...

const BooksTab = (props: any) => {
    var books = [
        {
            bid: 0,
            title: "",
            coverImage: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/library/book1/coverImage.png",
            pages: [
                {
                    text: "test 0",
                    modes: [
                        {
                            id : 0,
                            image : "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/library/book1/pages/0/default.png"
                          },
                          {
                            id : 1,
                            image : "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/library/book1/pages/0/P1Mode1.png"
                          },
                          {
                            id : 2,
                            image : "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/library/book1/pages/0/P1Mode2.png"
                          },
                          {
                            id : 3,
                            image : "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/library/book1/pages/0/P1Mode3.png"
                          }
                    ]
                },
                {
                    text: "test 1 ",
                    modes: [
                        {
                            id: 0,
                            image: "https://nextui.org/images/card-example-5.jpeg"
                        },
                        {
                            id: 1,
                            image: "https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id: 2,
                            image: "https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id: 3,
                            image: "https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    text: "test 2 ",
                    modes: [
                        {
                            id: 0,
                            image: "https://nextui.org/images/card-example-1.jpeg"
                        },
                        {
                            id: 1,
                            image: "https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id: 2,
                            image: "https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id: 3,
                            image: "https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    text: "test 3 ",
                    modes: [
                        {
                            id: 0,
                            image: "https://nextui.org/images/card-example-2.jpeg"
                        },
                        {
                            id: 1,
                            image: "https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id: 2,
                            image: "https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id: 3,
                            image: "https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
                {
                    text: "test 4 ",
                    modes: [
                        {
                            id: 0,
                            image: "https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id: 1,
                            image: "https://nextui.org/images/card-example-3.jpeg"
                        },
                        {
                            id: 2,
                            image: "https://nextui.org/images/card-example-4.jpeg"
                        },
                        {
                            id: 3,
                            image: "https://nextui.org/images/card-example-2.jpeg"
                        }
                    ]
                },
            ]
        }
    ]

    return (
        <ScrollShadow className="w-full h-[80vh]">
            {books.map((book, index) => (
                <div className="m-auto mb-2 flex justify-center items-center" key={index} onClick={(e) => props.func(e, book)}>
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

const FrameworkTab = (props: any) => {
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

const ModeTab = (props: any) => {
    console.log()
    // console.log();
    var array_id = props.slideid - 1;
    const modeList = [
        {
            mid: 0,
            name: "一般模式",
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/mode/1-normal.png"
        },
        {
            mid: 1,
            name: "專注模式",
            image:  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/mode/2-focus.png"
        },
        {
            mid: 2,
            name: "認讀模式",
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/mode/3-read.png"
        },
        {
            mid: 3,
            name: "社交模式",
            image:  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/mode/4-social.png"
        }
    ]
    console.log("mode:",props.book);
    console.log(array_id);
    return (
        <ScrollShadow className="w-full h-[80vh]">
            {modeList.map((mode: any) => (
                <div style={{ margin: "auto", marginBottom: "10px" }} className='text-center' key={mode.mid} onClick={() => props.func(mode.mid)}>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className={`z-0 w-full h-full object-cover rounded-none ${props.book.page_config[array_id+1].mode == mode.mid && "rounded-lg border-slate-300 border-4"}`}
                        src={mode.image}
                        style={{ margin: "auto", width: "180px", height: "120px" }}
                    />
                                        <div><span className="text-white py-2">{mode.name}</span></div>
                </div>
            ))}
        </ScrollShadow>
    )
}

const CategoryTab = (props: any) => {
    var category: object[] = [];
    if (props.type && props.type === "parent") {
        category = [
            {
                "image": "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/1-focus.png",
                "categ_name": "專注閱讀",
                cid: 0
            },
            {
                "image": "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/2-social.png",
                "categ_name": "社交學習",
                cid: 1
            },
            {
                "image":"https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/3-language.png",
                "categ_name": "語言理解",
                cid: 2
            },
            {
                "image":  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/4-read.png",
                "categ_name": "讀寫學習",
                cid: 3
            }
        ]
    }
    else if (props.type && props.type === "child") {
        category = [
            {
                "image": "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/1-focus.png",
                "categ_name": "專注閱讀",
                cid: 0
            },
            {
                "image": "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/2-social.png",
                "categ_name": "社交學習",
                cid: 1
            },
            {
                "image":"https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/3-language.png",
                "categ_name": "語言理解",
                cid: 2
            },
            {
                "image":  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/4-read.png",
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

const MissionTab = (props: any) => {
    const parent_missions = [
        {
            mid: 0,
            cid: [0, 2],
            target: "parent",
            text: "留意子女專注的位置",
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/1-focus.png"
        },
        {
            mid: 1,
            cid: [0, 2],
            target: "parent",
            text: "留意子女專注的位置",
            image:  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/2-social.png"
        },
        {
            mid: 2,
            cid: [1],
            target: "parent",
            text: "留意子女專注",
            image:  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/3-language.png"
        },
        {
            mid: 3,
            cid: [3],
            target: "parent",
            text: "留意子女專注的位置",
            image:  "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/target/4-read.png"
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

const OuterframeTab = (props: any) => {
    var frames = [
        {
            fid: 0,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/yellow-1.png"
        },
        {
            fid: 1,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/yellow-2.png"
        },
        {
            fid: 0,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/yellow-3.png"
        },
        {
            fid: 1,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/yellow-4.png"
        },
        {
            fid: 0,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/yellow-5.png"
        },
        {
            fid: 1,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/blue-1.png"
        },
        {
            fid: 0,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/blue-2.png"
        },
        {
            fid: 1,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/blue-3.png"
        },
        {
            fid: 0,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/blue-4.png"
        },
        {
            fid: 1,
            image: "https://senmily.s3.ap-southeast-1.amazonaws.com/resources/frame/blue-5.png"
        }
    ]
    return (
        <ScrollShadow className="w-full h-[80vh]">
            {frames.map((frame, index) => (
                <div style={{ margin: "auto", marginBottom: "10px" }} key={index} onClick={() => { props.func(frame.image); }}>
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
                            src={frame.image}
                        />
                    </Card>
                </div>
            ))}
        </ScrollShadow>
    )
}

const ToolsView = (props: any) => {
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
