'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react';
import './main.css';
export interface StageMethods {
  showTime: () => void;
}

const Stage = forwardRef<StageMethods>((props, ref) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const starterRef = useRef<HTMLButtonElement>(null);

  const showTime = () => {
    console.log("Show time!")
    if (curtainRef.current) curtainRef.current.className = 'open';
    if (sceneRef.current) sceneRef.current.className = 'expand';
    if (starterRef.current) {
      starterRef.current.className = 'fade-out';
      setTimeout(() => {
        starterRef.current!.style.display = 'none';
      }, 2000);
    }
  };

  useImperativeHandle(ref, () => ({
    showTime,
  }));

  return (
    <div id='scene'>
      <div id='curtain'>     
      <h1>asdf</h1>
        <div className='ground'></div>
        <div className='left'></div>
        <div className='right'></div>
      </div>
    </div>
  );
});
Stage.displayName = "stage"
export default Stage;
