"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { colorColumn, columns } from "./columns"
import Heading from "@/components/store/Heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/store/ui/data-table"
import { ApiList } from "@/components/store/ui/api-list"

interface sizeClientProps{
  data:colorColumn[]
}
export const ColorClient:React.FC<sizeClientProps>=({
  data
})=>{
    const router=useRouter()
    const params=useParams()

    return(
        <>
         <div className="flex items-center justify-between">
           <Heading 
              title={`Colors (${data.length})`}
              description="Manage colors for your store"
           />
           <Button onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
             <Plus className="mr-2 h-4 w-4"/>
             Add new
           </Button>
         </div>
         <Separator/>
         <DataTable searchKey="name" columns={columns} data={data}/>
         <Heading title="Api" description="Api calls for colors"/>
         <Separator/>
         <ApiList entityName="colors" entityId="colorId"/>
        </>
    )
}