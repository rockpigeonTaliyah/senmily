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
import { BooksTab, CategoryTab, MissionTab, ModeTab, OuterframeTab, ToolsTab } from '@/components/creatorTabs';

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

    const UpdateBook = (e, book) => {
        console.log("Book.pages: ", book.pages);
      
        // Define the base URL once to avoid typos and make easier future modifications
        const baseUrl = "https://senmily-resource.s3.ap-southeast-1.amazonaws.com/";
      
        // Update and reuse updatedPages for both pages and page_config in the final object
        const updatedPages = book.pages.map((page, pageIndex) => {
          // Check for pictures existence and length
          const hasPictures = page.pictures && page.pictures.length > 0;
      
          // Update pictures with prefixed URLs if they exist
          const updatedPictures = hasPictures
            ? page.pictures.map((picture) => ({
                ...picture,
                image: `${baseUrl}${picture.image}`,
              }))
            : [];
      
          // Simplify the access to the first picture's image and mode
          const firstUpdatedPicture = updatedPictures[0] || {}; // Fallback to an empty object
          console.log("firstUpdatedPicture:", firstUpdatedPicture);
      
          // Preparing the return structure for each page
          return {
            // Updated page structure for storing modified pictures
            ...page,
            pictures: updatedPictures,
            // Include additional page config used previously in page_config if necessary
            framework: null, // Add framework here (if applicable)
            mode: firstUpdatedPicture.mode || 0, // Add mode here if needed
            user_image: null, // Add user_image
            image: firstUpdatedPicture.image || "", // Add main image
            missions: [{
              cid: [],
              mid: 0,
              id: uuidv4(),
              initialPosition: {
                x: 388,
                y: 590,
              },
              frame: "",
              image: "", // Add mission image
              target: "",
              text: page.text || "", // Adding guard for text existence
            }],
          };
        });
        console.log("updatedPages:", updatedPages);
        setBook((originalBook) => ({
          ...originalBook,
          bid: book.id,
          title: "", // Ensure this is intentionally reset
          coverImage: book.coverImage,
          pages: updatedPages, 
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
    // const UpdateMode = (mode: any) => {
    //     // page.pictures[0].mode
    //     setBook((prevBook) => ({
    //         ...prevBook,
    //         page_config: prevBook.page_config.map((config: any, index) =>
    //             index === currentSlide ? { ...config, mode, image: prevBook.pages[currentSlide].modes[mode].image } : config
    //         ),
    //     }));
    // };

    // const filteredmode = pages[currentSlide].pictures.filter((pic) => pic.mode === mode);
    // console.log("filteredmode:",filteredmode);
    // if (pages[currentSlide] && pages[currentSlide].pictures && filteredmode.length > 0) {
    //     const modeImage = filteredmode[0].image;
    const UpdateMode = (mode: any) => {
        setBook((prevBook) => {
          // Clone the pages array to avoid direct mutation
          const pages = [...prevBook.pages];
          const filteredmode = pages[currentSlide].pictures.filter((pic) => pic.mode === mode);
          // Make sure the current page exists
          if (pages[currentSlide]) {
            // Directly update the current page's 'mode' property
            pages[currentSlide].mode = mode;
            const modeImage = filteredmode[0].image;
            // If you need to update the 'image' based on the selected mode, do so here
            // For example: 
            // const modeImage =  'some logic to find the mode image url';  
            if (modeImage) {
              pages[currentSlide].image = modeImage;
            }
      
            // Return the updated book object with the modified 'pages' array
            return {
              ...prevBook,
              pages: pages,
            };
          }
      
          // Return unchanged book if the current page doesn't exist
          return prevBook;
        });
      };
    const UpdateMission = (mission: Mission) => {
        if (mission.target === "parent") set_parent_mission_selectKey("2");
        if (mission.target === "child") set_children_mission_selectKey("2");

        setFocusMission({ ...mission, initialPosition: { x: 0, y: 0 } });
    };

    const UpdateOuterFrame = (outerframe: any) => {
        console.log("outerframe");
        if (Object.keys(focusMission).length === 0) return;
      
        // Create a new mission object 
        const newMission = {
          ...focusMission,
          frame: outerframe,
        };
      
        // Update the current page's missions array
        setBook((prevBook) => {
          const pages = [...prevBook.pages];
      
          if (pages[currentSlide]) {
            pages[currentSlide].missions = [
              ...pages[currentSlide].missions, 
              newMission, 
            ];
            return {
              ...prevBook,
              pages: pages,
            };
          } else {
            return prevBook; // Return the unchanged book if the page doesn't exist
          }
        });
      
        setFocusMission({}); 
      };

      const handleItemsChange = useCallback((pageIndex: number, updatedItem: Mission) => {
        setBook((prevBook) => {
          const pages = [...prevBook.pages]; // Clone the pages array
          
          if (pages[pageIndex]) { // Check if the page exists
            pages[pageIndex].missions = pages[pageIndex].missions.map((mission) =>
              mission.id === updatedItem.id ? { ...mission, ...updatedItem } : mission
            );
            return {
              ...prevBook,
              pages: pages, // Update the pages array
            };
          } else {
            return prevBook; // Return the unchanged book if the page doesn't exist
          }
        });
      }, []);
  

    const handleSlideChange = (index: number) => {
        
        setCurrentSlide(index);
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
        // b.pages = null;
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
                        /^tools*/.test(page)  && <ToolsTab func={setPage}></ToolsTab>
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
                        <EmblaCarousel  slides={book.pages} onChange={handleSlideChange} onItemsChange={handleItemsChange} setLoading={setLoading}/>
                    </>
                    }
                </div>
            </main>
        </NextUIProvider>
    )
}


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












