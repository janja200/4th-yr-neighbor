import { db } from "@/lib/db";
import { BillboardClient } from "./_components/BillboardClient";
import { billboardColumn } from "./_components/columns";
import {format} from "date-fns"
const BillboardsPage = async({params}:{params:{storeId:string}}) => {
  const billboards= await db.billboard.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
       createdAt:"desc"
    }
  })
  const formattedBillboards:billboardColumn[]=billboards.map((billboard)=>({
    id:billboard.id,
    label:billboard.label,
    createdAt:format(billboard.createdAt,"MMMM do, yyyy")
  }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <BillboardClient data={formattedBillboards}/>
            </div>
        </div>
     );
}
 
export default BillboardsPage;