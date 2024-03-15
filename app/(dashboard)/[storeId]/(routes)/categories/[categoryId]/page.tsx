import { db } from "@/lib/db";
import { CategoryForm } from "./_components/CategoryForm";

const CategoryPage =async ({params}:{params:{storeId:string,categoryId:string}}) => {
    const isNewCategory=params.categoryId==="new"?true:false;
    let category=null
    const billboards=await db.billboard.findMany({
        where:{
            storeId:params.storeId
        }
    })
    if(!isNewCategory){
        category=await db.category.findUnique({where:{
            id:params.categoryId
        }});
    }
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <CategoryForm billboards={billboards} initialData={category}/>
            </div>
        </div>
     );
}
 
export default CategoryPage;