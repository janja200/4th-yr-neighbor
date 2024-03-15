import NavbarBC from "@/components/store/BCcomponents/NavbarBC";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation"


export default async function DashboardLayout({
    children,
    params
}:{
    children:React.ReactNode;
    params:{storeId:string}
}){
    const user=await currentUser()
    if(!user?.id){
        redirect("/")
    }
  

    return(
        <>
          <NavbarBC storeId={params.storeId}/>
          {children}
        </>
    )
}