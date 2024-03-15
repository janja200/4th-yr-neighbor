import { db } from "@/lib/db";
import {ProductForm } from "./_components/ProductsForm";

const ProductsPage =async ({params}:{params:{storeId:string,productId:string}}) => {
    const isNewProduct=params.productId==="new"?true:false;
    let product=null
    const categories = await db.category.findMany({
        where: {
          storeId: params.storeId,
        },
      });
    
    const sizes = await db.size.findMany({
        where: {
          storeId: params.storeId,
        },
      });
    
    const colors = await db.color.findMany({
        where: {
          storeId: params.storeId,
        },
       });
    if(!isNewProduct){
        product=await db.product.findUnique({where:{
            id:params.productId
         },
          include:{
            images:true,
           
          }
        });
         
          
    }
    return ( 
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm 
            categories={categories} 
            colors={colors}
            sizes={sizes}
            initialData={product}
            />
        </div>
        </div>
     );
}
 
export default ProductsPage;