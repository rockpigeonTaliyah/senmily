import Link from 'next/link';
 // import Font Awesome CSS
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from '@nextui-org/react';



export default function Page() {
  return (
    <main className='h-full flex flex-col'>
      <div className="flex flex-col flex-1">
        <div className="wave grow-0">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path d="M0,200 C200,300 400,100 500,100 L500,00 L0,0 Z" className='wavesvg'></path>
          </svg>
        </div>
        <div className="flex flex-row " style={{position: 'relative'}}>
          <div className="container flex-1 px-4 flex flex-col" style={{padding:"1rem"}}>
            <p
            
            className="bold"
            style={{
              fontSize:"3rem",
              fontWeight:"bold"
            }}>一起製作</p>

            <p
            
            className="bold"
            style={{
              fontSize:"3rem",
              fontWeight:"bold"
            }}>屬於你和孩子的</p>
            <p
            
            className="bold"
            style={{
              fontSize:"3rem",
              fontWeight:"bold"
            }}>專屬繪本</p>

              <p 
                className="flex-1"
                style={{
                  fontSize:"1.5rem",
                  paddingBottom: "1rem"
                }}
              >
              我們相信每個孩子都是獨特的,擁有自己的想像力,透過這個工具,你將有機會獲得屬於一個你和孩子的專屬繪本,與小朋友一同學習探索和成長
              </p>
            
            <Button 
              variant='shadow'
              href="#" 
              className="btn btn-primary bg-white p2-1 rounded-full px-4 w-fit"
              style={{padding:"1rem 3rem",fontWeight:"bold"}}
              >立即製作</Button>
          </div>
          <div className="flex-1 flex center">
            <div className="block circle h-auto w-80 rounded-full bg-black m-auto"></div>
          </div>
        </div>
      </div>

      
      <p 

                style={{
                  fontSize:"1.5rem",
                  fontWeight:"bold",

                  paddingLeft: "1rem"
                }}
              >
          我的書櫃
      </p>

      
      <div className="shelf">
        <div className="block">
        
           {/* <a > */}
           <Link
           className='book-cover justify-content-center flex align-items-center'
            href={{
              pathname: '/creator'
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="fas fa-check" style={{ fontSize :"3rem" }}></FontAwesomeIcon>
            </Link>
            
           {/* </a> */}
        </div>
        <div className="block">
        <div className='book-cover justify-content-center flex align-items-center'>
           <FontAwesomeIcon icon={faPlus} className="fas fa-check" style={{ fontSize :"3rem" }}></FontAwesomeIcon>
           </div>
        </div>
        <div className="block">
        <div className='book-cover justify-content-center flex align-items-center'>
           <FontAwesomeIcon icon={faPlus} className="fas fa-check" style={{ fontSize :"3rem" }}></FontAwesomeIcon>
           </div>
        </div>
        <div className="block">
        <div className='book-cover justify-content-center flex align-items-center'>
           <FontAwesomeIcon icon={faPlus} className="fas fa-check" style={{ fontSize :"3rem" }}></FontAwesomeIcon>
           </div>
        </div>
        <div className="block">
        <div className='book-cover justify-content-center flex align-items-center'>
           <FontAwesomeIcon icon={faPlus} className="fas fa-check" style={{ fontSize :"3rem" }}></FontAwesomeIcon>
           </div>
        </div>
      </div>
      
      </main>
  );
}
