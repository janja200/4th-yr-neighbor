import { db } from "@/lib/db";
import { ColorForm } from "./_components/ColorsForm";

const BillboardPage =async ({params}:{params:{colorId:string}}) => {
    const isNewColor=params.colorId==="new"?true:false;
    let colors=null
    if(!isNewColor){
        colors=await db.color.findUnique({where:{
            id:params.colorId
        }});
    }
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <ColorForm store={colors}/>
            </div>
        </div>
     );
}
 
export default BillboardPage;