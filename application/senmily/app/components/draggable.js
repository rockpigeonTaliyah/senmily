import React, { useContext ,useRef} from 'react';
import Moveable from "react-moveable";
import '../global.css'


import Face6Icon from '@mui/icons-material/Face6';
export default function DraggableIcons(props) {
    const targetRef = useRef(null);
    const moveableRef = useRef(null);

    return (
        <div className="root">
             <div className="container" style={{

             }}>
                 {/* <div className="target" ref={targetRef} style={{
                     width: "200px",
                     height: "150px",
                     transform: "scale(1.5, 1)",
                 }}>Target</div> */}
                 <Face6Icon className="target" ref={targetRef} style={{transform: "scale(1.8)",position:"absolute",color:"yellow",zIndex:10}}/>
                 <Moveable
                    // style={{display:"none"}}
                     ref={moveableRef}
                     target={targetRef}
                     draggable={true}
                     throttleDrag={1}
                     origin={false}
                     hideDefaultLines={true}
                     edgeDraggable={false}
                     startDragRotate={0}
                     throttleDragRotate={0}
                    //  scalable={true}
                     keepRatio={false}
                     throttleScale={0}
                     snappable={true}
                     bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}
                     onDrag={e => {
                         e.target.style.transform = e.transform;
                     }}
                    //  onScale={e => {
                    //      e.target.style.transform = e.drag.transform;
                    //  }}
                     onBound={e => {
                         console.log(e);
                     }}
                 />
             </div>
         </div>
     );
    // const targetRef = useRef();
    // const moveableRef = useRef();
    // const
    // return (

        // <div style={{zIndex:100,width:"fit-content",height:"fit-content",display:"block",position:"absolute"}} ref={targetRef} >
        //                 {/* <div className="target" ref={targetRef}>Target</div> */}
        //                 <Face6Icon />
        //                 <Moveable
        //                     ref={moveableRef}
        //                     target={targetRef}
        //                     draggable={true}
        //                     rotatable={false}
        //                     // draggable={true}
        //                     // throttleDrag={1}
        //                     edgeDraggable={false}
        //                     // startDragRotate={0}
        //                     // throttleDragRotate={0}
        //                     //   scalable={true}
        //                     keepRatio={false}
        //                     throttleScale={0}
        //                     snappable={true}
        //                     bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}
        //                      onDrag={e => {
        //                          e.target.style.transform = e.transform;
        //                      }}
        //                      onScale={e => {
        //                          e.target.style.transform = e.drag.transform;
        //                      }}
        //                      onBound={e => {
        //                          console.log(e);
        //                      }}
        //                 />
        //             </div>
        // <Face6Icon/>
        // <div></div>
    // )
}
// import * as React from "react";
// import Moveable from "react-moveable";

// export default function App() {
//     const targetRef = React.useRef<HTMLDivElement>(null);

//     return (
//         <div className="root">
//             <div className="container">
//                 <div className="target" ref={targetRef}>Target</div>
//                 <Moveable
//                     target={targetRef}
//                     draggable={true}
//                     throttleDrag={1}
//                     edgeDraggable={false}
//                     startDragRotate={0}
//                     throttleDragRotate={0}
//                     onDrag={e => {
//                         e.target.style.transform = e.transform;
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }