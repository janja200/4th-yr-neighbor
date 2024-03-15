"use client"
import Button from "./Button";
import Currency from "./ui/Currency";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useCart from "@/hooks/store/use-cart";

const Summary = () => {
    const items=useCart((state)=>state.items)
    const searchParams=useSearchParams()
    const params=useParams()
    const removeAll=useCart((state)=>state.removeAll)
    const totalPrice=items.reduce((total,item)=>{
         return total+Number(item.price)
    },0)
    useEffect(()=>{
        if(searchParams.get("canceled")){
            toast.success("Payment completed")
            removeAll()
        }
        if(searchParams.get("canceled")){
            toast.error("Something went wrong")
        }
    },[searchParams,removeAll])
    const onCheckout=async()=>{
        const response=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${params.storeId}/checkout`,{
            productIds:items.map((item)=>item.id)
        })
        window.location=response.data.url
    }
    return ( 
        <div className="
           mt-16 
           rounded-md
           bg-gray-50
           px-4
           py-6
           sm:p-6
           lg:col-span-5
           lg:mt-0
           lg:p-8
        ">
         <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
         <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
             <div className="text-base font-medium text-gray-900">
               Order total
             </div>
             <Currency value={totalPrice}/>
          </div>
         </div>
         <Button onClick={onCheckout} className="w-full mt-6">
            Checkout
         </Button>
        </div>
     );
}
 
export default Summary;