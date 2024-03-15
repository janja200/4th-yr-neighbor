import { Billboard } from "@/types/types";

const getBillboard=async(id:string,storeId:string):Promise<Billboard>=>{
   const URL=`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/billboards`;
   const res= await fetch(`${URL}/${id}`);
   return res.json()
}

export default getBillboard;