import MainNav from "./MainNav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import StoreLatLng from "@/hooks/store/store-location";
import { currentUser } from "@/lib/auth";

const Navbar =async () => {

   const user=await currentUser()
  
   if(!user){
      redirect("/")
   }
   const stores= await db.store.findMany({
      where:{
         userId:user.id
      }
   })
    return ( 
        <div
         className="border-b">
           <div className="flex h-16 items-center px-4">
              <StoreLatLng/>
              <StoreSwitcher items={stores}/>
              <MainNav className="mx-6"/>
              <div className="ml-auto flex items-center space-x-4">
              </div>
            </div> 
        </div>
     );
}
 
export default Navbar;