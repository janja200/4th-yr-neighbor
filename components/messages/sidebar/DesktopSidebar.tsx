'use client';

import DesktopItem from "./DesktopItem";
import { useState } from "react";

import { ExtendedUser } from "@/next-auth";
import useRoutes from "@/hooks/messages/useRoutes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

interface DesktopSidebarProps {
  currentUser: ExtendedUser
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ currentUser, }, 'TEST')

  return ( 
    <>
      
      <div className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      ">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div 
            onClick={() => setIsOpen(true)} 
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar>
            <AvatarImage src={currentUser?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
        </Avatar>
          </div>
        </nav>
      </div>
    </>
   );
}
 
export default DesktopSidebar;