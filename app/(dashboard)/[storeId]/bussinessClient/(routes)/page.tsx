import getBillboard from "@/actions/store/get-billboards";
import getProducts from "@/actions/store/get-products";
import Billboard from "@/components/store/BCcomponents/Billboard";
import ProductList from "@/components/store/BCcomponents/ProductList";
import Container from "@/components/store/BCcomponents/ui/Container";
import { db } from "@/lib/db";

export const revalidate=0;
interface bussinessClientPageProps{
  params:{storeId:string}
}
const bussinessClientPage = async({
  params
}:bussinessClientPageProps) => {
  const Billboardid = await db.billboard.findFirst({
    where: {
      storeId: params.storeId, 
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
   
    const billboardId = Billboardid?.id;
    const products=await getProducts({isFeatured:true},params.storeId)

    const billboard=await getBillboard(billboardId!,params.storeId)
    return ( 
        <Container>
            <div className="space-y-10 pb-10">
              <Billboard data={billboard}/>
            </div>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
               <ProductList title="Featured Products" data={products}/>
            </div>
        </Container>
     );
}
 
export default bussinessClientPage;