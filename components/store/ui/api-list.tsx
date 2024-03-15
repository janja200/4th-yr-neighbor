"use client"

import { useParams } from "next/navigation"
import { ApiAlert } from "./ApiAlert"
import { useOrigin } from "@/hooks/store/useOrigin"

interface apiListProps{
    entityName:string,
    entityId:string
}
export const ApiList:React.FC<apiListProps>=({
    entityName,
    entityId
})=>{
    const params=useParams()
    const origin=useOrigin()
    const baseUrl=`${origin}/api/${params.storeId}`
    return(
        <>
          <ApiAlert 
             title="GET"
             variant="public"
             description={`${baseUrl}/${entityName}`}
          />
          <ApiAlert 
             title="GET"
             variant="public"
             description={`${baseUrl}/${entityName}/{${entityId}}`}
          />
          <ApiAlert 
             title="POST"
             variant="admin"
             description={`${baseUrl}/${entityName}`}
          />
          <ApiAlert 
             title="PATCH"
             variant="admin"
             description={`${baseUrl}/${entityName}/{${entityId}}`}
          />
          <ApiAlert 
             title="DELETE"
             variant="admin"
             description={`${baseUrl}/${entityName}/{${entityId}}`}
          />
        </>
    )
}