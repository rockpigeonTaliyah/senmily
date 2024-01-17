import React, { useContext ,useRef} from 'react';
import Moveable from "react-moveable";


import Face6Icon from '@mui/icons-material/Face6';
export default function DraggableIcons(props) {
    const targetRef = useRef();
    // const
    return (
        <div className="container" style={{zIndex:100}}>
                        <div className="target" ref={targetRef}>Target</div>
                        <Moveable
                            target={targetRef}
                            draggable={true}
                            throttleDrag={1}
                            edgeDraggable={false}
                            startDragRotate={0}
                            throttleDragRotate={0}
                            onDrag={e => {
                                e.target.style.transform = e.transform;
                            }}
                        />
                    </div>
        // <Face6Icon/>
        // <div></div>
    )
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