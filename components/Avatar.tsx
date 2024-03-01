'use client';

import { User } from "@prisma/client";

//import useActiveList from "../hooks/useActiveList";
import Image from "next/image";
import { Avatar as Av,AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa";

interface AvatarProps {
  user?: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  //const { members } = useActiveList();
  //const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div >
       <Av>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
          <span 
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          " 
        />
        </Av>
        
    </div>
  );
}

export default Avatar;