import { db } from "@/lib/db";
import { ColorClient } from "./_components/ColorClient"
import { colorColumn } from "./_components/columns";
import {format} from "date-fns"
const SizesPage = async({params}:{params:{storeId:string}}) => {
  const colors= await db.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
       createdAt:"desc"
    }
  })
  const formattedColors:colorColumn[]=colors.map((color)=>({
    id:color.id,
    name:color.name,
    value:color.value,
    createdAt:format(color.createdAt,"MMMM do, yyyy")
  }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <ColorClient data={formattedColors}/>
            </div>
        </div>
     );
}
 
export default SizesPage;