"use server"

import { db } from "@/lib/db"

interface storeLocationProps{
    latitude:number,
    longitude:number,
    storeId:string
}
export const StoreLocation=async(
    {latitude,longitude,storeId}:storeLocationProps)=>{
   const storeInDb=await db.store.findFirst({
    where:{
        id:storeId
    }
   })
   let response=null
   const locationAdded=await db.location.findFirst({
    where:{
        storeId
    }
   })
   if(storeInDb && !locationAdded){
       response=await db.location.create({
            data:{
                latitude,
                longitude,
                storeId
            }
        })
    }
    
    return {data:response}
}