import { Color } from "@/types/types";


const getColors=async(storeId:string):Promise<Color[]>=>{
   const URL=`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/colors`;
   const res= await fetch(URL);
   return res.json()
}

export default getColors;