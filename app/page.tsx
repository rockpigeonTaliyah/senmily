// import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
// import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import SideNav from './ui/navbar/page';


export default function Page() {
  return (
    
    <main className="flex min-h-screen flex-col h-100">
      <div className="bg-yellow-100 flex-row flex m-w-screen justify-between ">
        <p>logo</p>
        <SideNav/>
      </div>
      
      <div className="flex flex-col grow ">
        <div className="wave grow-0">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path d="M0,200 C200,300 400,100 500,100 L500,00 L0,0 Z" className='wavesvg'></path>
          </svg>
        </div>
        <div className="flex flex-row grow-0" style={{position: 'relative'}}>
          <div className="container flex-1 px-4 flex flex-col">
            <h1 className="bold title">那實共做七天下會里幾往占昔口，起亭四比首他火</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
            <a href="#" className="btn btn-primary bg-white py-1 rounded-full px-4 w-fit">乍告羊姊</a>
          </div>
          <div className="flex-1">
            <div className="block circle h-auto w-80 rounded-full bg-black"></div>
          </div>
        </div>
        <div className='w-full h-auto grow flex' style={{}}>
          <h1><span>Library</span></h1>
        </div>  
      </div>
      
      
    </main>
  );
}
