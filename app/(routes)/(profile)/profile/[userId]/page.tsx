import getFetchedUser from "@/actions/getFetchedUser";
import getUser from "@/actions/getUser";
import Header from "@/components/profile/Header";
import UserBio from "@/components/profile/users/UserBio";
import UserHero from "@/components/profile/users/UserHero";
import { currentUser } from "@/lib/auth";
import { ClipLoader } from "react-spinners";



const UserView = async({params}:{params:{userId:string}}) => {
  const userid=params.userId
  const User  =await currentUser();
  const otherUser = await getFetchedUser(userid as string);
  const currentFetchedUser = await getUser(User?.id as string);
  if (!otherUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={otherUser?.name!} />
      <UserHero userId={User?.id as string} fetchedUser={otherUser!} />
      <UserBio userId={params.userId as string} fetchedUser={otherUser!} currentUser={User!} currentFetchedUser={currentFetchedUser!}/>
      
    </>
   );
}
 
export default UserView;