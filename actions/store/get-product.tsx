import { Product } from "@/types/types";


const getProduct=async(id:string,storeId:string):Promise<Product>=>{
   const URL=`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/products`;
   const res= await fetch(`${URL}/${id}`);
   return res.json()
}

export default getProduct;