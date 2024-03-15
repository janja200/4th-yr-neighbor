"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { productColumn, columns } from "./columns"
import Heading from "@/components/store/Heading"
import { DataTable } from "@/components/store/ui/data-table"
import { ApiList } from "@/components/store/ui/api-list"
import { Separator } from "@/components/ui/separator"

interface productClientProps{
  data:productColumn[]
}
export const ProductClient:React.FC<productClientProps>=({
  data
})=>{
    const router=useRouter()
    const params=useParams()

    return(
        <>
         <div className="flex items-center justify-between">
           <Heading 
              title={`Products (${data.length})`}
              description="Manage products for your store"
           />
           <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
             <Plus className="mr-2 h-4 w-4"/>
             Add new
           </Button>
         </div>
         <Separator/>
         <DataTable searchKey="name" columns={columns} data={data}/>
         <Heading title="Api" description="Api calls for products"/>
         <Separator/>
         <ApiList entityName="products" entityId="productId"/>
        </>
    )
}