import { db } from "@/lib/db";
import { BillBoardsForm } from "./_components/BillBoardsForm";

const BillboardPage =async ({params}:{params:{billboardId:string}}) => {
    const isNewBillboard=params.billboardId==="new"?true:false;
    let billboard=null
    if(!isNewBillboard){
        billboard=await db.billboard.findUnique({where:{
            id:params.billboardId
        }});
    }
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <BillBoardsForm store={billboard}/>
            </div>
        </div>
     );
}
 
export default BillboardPage;