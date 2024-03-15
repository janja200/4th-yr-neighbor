"use client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import Heading from "@/components/store/Heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/store/ui/data-table"
import { ApiList } from "@/components/store/ui/api-list"
import { Separator } from "@/components/ui/separator"

interface categoryClientProps{
  data:CategoryColumn[]
}
export const CategoryClient:React.FC<categoryClientProps>=({
  data
})=>{
    const router=useRouter()
    const params=useParams()
    return(
        <>
         <div className="flex items-center justify-between">
           <Heading 
              title={`Categories (${data.length})`}
              description="Manage categories for your store"
           />
           <Button onClick={()=>router.push(`/${params.storeId}/categories/new`)}>
             <Plus className="mr-2 h-4 w-4"/>
             Add new
           </Button>
         </div>
         <Separator/>
         <DataTable searchKey="name" columns={columns} data={data}/>
         <Heading title="Api" description="Api calls for Categories"/>
         <Separator/>
         <ApiList entityName="Categories" entityId="categoryId"/>
        </>
    )
}