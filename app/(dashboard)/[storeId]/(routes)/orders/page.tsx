import {format} from "date-fns"
import { formatter } from "@/lib/utils";
import { orderColumn } from "./_components/columns";
import { OrderClient } from "./_components/OrderClient";
import { db } from "@/lib/db";
const OrdersPage = async({params}:{params:{storeId:string}}) => {
  const orders= await db.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy:{
       createdAt:"desc"
    }
  })
  const formattedOrders:orderColumn[]=orders.map((order)=>({
    id:order.id,
    phone:order.phone,
    address:order.address,
    products:order.orderItems.map((orderItem)=>orderItem.product.name).join(","),
    totalPrice:formatter.format(order.orderItems.reduce((total,item)=>{
         return total+Number(item.product.price)
    },0)),
    isPaid:order.isPaid,
    createdAt:format(order.createdAt,"MMMM do, yyyy")
  }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <OrderClient data={formattedOrders}/>
            </div>
        </div>
     );
}
 
export default OrdersPage;