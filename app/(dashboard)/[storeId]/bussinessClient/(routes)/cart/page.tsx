"use client"

import CartItem from "@/components/store/BCcomponents/CartItem";
import Summary from "@/components/store/BCcomponents/summary";
import useCart from "@/hooks/store/use-cart";
import { useEffect, useState } from "react";

const CartPage = () => {
    const cart=useCart()
    const [mounted,setMounted]=useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null
    }
    return ( 
        <div className="bg-white">
          <h1 className="text-3xl font-bold text-black">
            Shopping cart
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
           <div className="lg:col-span-7">
             {cart.items.length===0 &&(<p>
                No item added to cart
             </p>)}
             <ul>
                {cart.items.map((item)=>(
                    <CartItem
                      key={item.id}
                      data={item}
                    />
                ))}
             </ul>
           </div>
           <Summary/>
          </div>
        </div>
     );
}
 
export default CartPage;