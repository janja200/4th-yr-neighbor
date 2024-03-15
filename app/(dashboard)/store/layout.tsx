import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ModalProvider } from "@/providers/modal-provider";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children,
 
}:{
    children:React.ReactNode;

}){
   const user=await currentUser()
   if(!user?.id){
    redirect("/login")
   }

   const store= await db.store.findFirst({
    where:{
        userId:user.id
    }
   })
   if (store){
    redirect(`/${store.id}`)
   }
   return(
    <>
    <ModalProvider/>
    {children}
    </>
   )
}