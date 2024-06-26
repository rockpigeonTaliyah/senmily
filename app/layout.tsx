import '@/app/ui/global.css';
import Providers from '@/components/layout/providers';
// import { inter } from '@/app/ui/fonts';
import SideNav from '@/app/ui/navbar/page';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Link from 'next/link';
import {Image}  from "@nextui-org/react";
import * as React from "react";
config.autoAddCss = false;
import { Metadata } from "next";
import { auth } from '@/auth';
export const metadata: Metadata = {
  manifest: "/manifest.json", // we are accessing our manifest file here  
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);
  return (
    <html lang="en">
      <body className={`antialiased`} style={{height:"100vh"}}>
      <Providers session={session}>
        <div style={{display:"flex",flexDirection:"column",height:"inherit"}}>
          {session && session.user && <div className="bg-yellow-100 flex-row flex m-w-screen justify-between gap-2 p-2 border-box">
            <Link  href={{ pathname: '/' }} className="ml-[1rem]">
            <Image src="https://senmily.s3.ap-southeast-1.amazonaws.com/resources/logo/logo.png" className='h-[70px]'/>  
            </Link>
            <SideNav/>
          </div>}
          <div className="grow h-100">{children}</div>
        </div>
        </Providers>
      </body>
    </html>
   
  );
}