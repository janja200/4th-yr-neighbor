import { db } from "@/lib/db";
import { SizesForm } from "./_components/SizesForm";

const BillboardPage =async ({params}:{params:{sizeId:string}}) => {
    const isNewSize=params.sizeId==="new"?true:false;
    let sizes=null
    if(!isNewSize){
        sizes=await db.size.findUnique({where:{
            id:params.sizeId
        }});
    }
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <SizesForm store={sizes}/>
            </div>
        </div>
     );
}
 
export default BillboardPage;