import Link from 'next/link';
import NavLinks from '@/app/ui/navbar/layout';
import { PowerIcon } from '@heroicons/react/24/outline';
import './navbar.module.css';
export default function SideNav() {
  return (
    // <div className="flex h-full flex- ">
      
    <div className="flex   justify-between space-x-2  p-2">
      <NavLinks/>
      {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>   */}
    </div>
  );
}
