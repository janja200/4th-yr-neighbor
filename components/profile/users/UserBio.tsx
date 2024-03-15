"use client"
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import { User } from "@prisma/client";
import Button from "@/components/messages/Button";
import { ExtendedUser } from "@/next-auth";
import SettingsModal from "@/components/messages/sidebar/SettingsModal";
import { useState } from "react";
import useFollow from "@/hooks/profile/useFollow";




interface UserBioProps {
  userId: string;
  currentUser:ExtendedUser,
  fetchedUser:User & { followersCount: number }
  currentFetchedUser:User
}

const UserBio: React.FC<UserBioProps> = ({ userId,currentUser,fetchedUser,currentFetchedUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isFollowing, toggleFollow } = useFollow(userId,currentFetchedUser);

  return ( 
    <>
    <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button onClick={() => setIsOpen(true)} >Edit</Button>
        ) :(
          <Button
            onClick={toggleFollow} 
            secondary={!isFollowing}
          >{isFollowing ? 'Unfollow' : 'Follow'}</Button>
        ) } 
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-black text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.name}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black">
            {fetchedUser?.bio}
          </p>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
            <BiCalendar size={24} />
            <p>
              Joined {format(fetchedUser.createdAt, 'yyyy-MM-dd HH:mm:ss')}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
    </>
   );
}
 
export default UserBio;