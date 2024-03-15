import { Category } from "@/types/types";

const getCategory=async(id:string,storeId:string):Promise<Category>=>{
   const URL=`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/categories`;
   const res= await fetch(`${URL}/${id}`);
   return res.json()
}

export default getCategory;