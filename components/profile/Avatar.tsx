"use client"
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  fetchedUser?:User;
  image?:string;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder ,fetchedUser,image}) => {
  const router = useRouter();
  console.log("fetchedUser",fetchedUser)
  const onClick = useCallback((event: any) => {
    event.stopPropagation();

    const url = `/profile/${userId}`;

    router.push(url);
  }, [router, userId]);

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.image ||image || '/images/placeholder.png'}
      />
    </div>
  );
}
 
export default Avatar;