import Image from "next/image";

import Avatar from "../Avatar"
import { User } from "@prisma/client";

interface UserHeroProps {
  userId: string;
  fetchedUser:User
}

const UserHero: React.FC<UserHeroProps> =async ({ userId,fetchedUser }) => {
  

  return ( 
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar  isLarge hasBorder userId={fetchedUser.id} fetchedUser={fetchedUser}/>
        </div>
      </div>
    </div>
   );
}
 
export default UserHero;