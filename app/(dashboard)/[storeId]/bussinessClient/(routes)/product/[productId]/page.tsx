import getProduct from "@/actions/store/get-product";
import getProducts from "@/actions/store/get-products";
import Gallery from "@/components/store/BCcomponents/Gallery";
import Info from "@/components/store/BCcomponents/Info";
import ProductList from "@/components/store/BCcomponents/ProductList";
import Container from "@/components/store/BCcomponents/ui/Container";

interface productPageProps{
    params:{storeId:string,productId:string},
}
const ProductPage:React.FC<productPageProps> =async ({
    params
}) => {
    const product=await getProduct(params.productId,params.storeId)
    const suggestedProducts=await getProducts({
        categoryId:product?.category?.id
    },params.storeId)
    return ( 
        <div className="bg-white">
            <Container>
              <div className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-6">
                    <Gallery images={product.images}/>
                   <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <Info data={product}/>
                   </div>
                </div>
                <hr className="my-10"/>
                <ProductList title="Related items" data={suggestedProducts}/>
              </div>
            </Container>
        </div>
     );
}
 
export default ProductPage;