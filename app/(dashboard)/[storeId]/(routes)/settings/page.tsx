import { redirect } from "next/navigation";
import { SettingsForm } from "./_components/SettingsForm";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface settingsPageProps{
    params:{storeId:string}
}
const SettingsPage:React.FC<settingsPageProps> = async({params}) => {
    const user=await currentUser()
    if(!user?.id){
        redirect("/")
    }
    const store=await db.store.findFirst({
        where:{
            id:params.storeId,
            userId:user.id
        }
    })
    if(!store){
        redirect("/")
    }
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
             <SettingsForm store={store}/>
            </div>
        </div>
     );
}
 
export default SettingsPage;