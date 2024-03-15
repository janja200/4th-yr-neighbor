"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

interface storeUserLocationProps{
    latitude:number,
    longitude:number,
}
export const storeUserLocation=async(
    {latitude,longitude,}:storeUserLocationProps)=>{
   const user=await currentUser()
   const locationAdded=await db.userLocation.findFirst({
    where:{
        userId:user?.id
    }
   })
   if(locationAdded && locationAdded.country ==null && locationAdded.region ==null){
     return {data:"geocode"}
   }
   if(user?.id && !locationAdded){
       const response=await db.userLocation.create({
            data:{
                latitude,
                longitude,
                userId:user?.id
            }
        })
        console.log("location added",response)
        return {data:response}
    }
    
    return {data:"location already added"}
}