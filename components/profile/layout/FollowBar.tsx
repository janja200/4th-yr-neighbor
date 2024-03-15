"use client"
import Avatar from '../Avatar';
import { User } from '@prisma/client';

interface FollowBarProps{
  users:User[]
}
const FollowBar :React.FC<FollowBarProps>= ({users}) => {

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-white-800 rounded-xl p-4 border-[1px] border-slate-800">
        <h2 className="text-black text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} image={user.image}/>
              <div className="flex flex-col">
                <p className="text-black font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-800 text-sm">@{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
