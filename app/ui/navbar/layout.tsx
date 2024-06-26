'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CubeIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
// import css

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
import { signOut, useSession } from 'next-auth/react';

const links = [
  { 
    name: '首頁', 
    href: '/', 
    icon: HomeIcon 
  },
  { 
    name: '製作繪本', 
    href: '/creator', 
    icon: CubeIcon 
  },
  {
    name: '學習進度',
    href: '/progress',
    icon: ChartBarIcon,
  },
  { 
    name: '關於我們', 
    href: '/aboutus', 
    icon: UserGroupIcon 
  },
  { 
    name: '帳戶', 
    href: '/dashboard/customers', 
    icon: UserIcon 
  },
  
];

export default function NavLinks() {

  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px]  items-center justify-center  text-sm font-medium  md:flex-none md:justify-start '
            )}
            onClick={() => signOut()}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block ml-2">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
