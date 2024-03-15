import { Category } from "@/types/types";

const getCategories=async(storeId:string):Promise<Category[]>=>{
   const URL=`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/categories`;
   const res= await fetch(URL);
   return res.json()
}

export default getCategories;