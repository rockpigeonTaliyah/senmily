import '@/app/ui/global.css';
// import { inter } from '@/app/ui/fonts';
import SideNav from '@/app/ui/navbar/page';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Link from 'next/link';
import * as React from "react";
config.autoAddCss = false;
import { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json", // we are accessing our manifest file here  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`} style={{height:"100vh"}}>
        <div style={{display:"flex",flexDirection:"column",height:"inherit"}}>
          <div className="bg-yellow-100 flex-row flex m-w-screen justify-between gap-2">
            <Link  href={{ pathname: '/' }}><span>logo</span> </Link>
            
            <SideNav/>
          </div>
          <div className="grow h-100">{children}</div>
        </div>
      </body>
    </html>
   
  );
}