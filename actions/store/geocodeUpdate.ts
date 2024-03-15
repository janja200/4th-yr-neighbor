"use server"

import { db } from "@/lib/db"

interface GeocodeUpdateProps{
    latitude:number,
    longitude:number,
    storeId:string
}
export const GeocodeUpdate=async(
    {latitude,longitude,storeId}:GeocodeUpdateProps)=>{
   const storeInDb=await db.store.findFirst({
    where:{
        id:storeId
    }
   })
   
   if(storeInDb){
       const response=await db.location.create({
            data:{
                latitude,
                longitude,
                storeId
            }
        })
        console.log(response)
    }
    
}