
import getProducts from "@/actions/store/get-products";
import Filter from "./_components/Filter";
import getSizes from "@/actions/store/get-sizes";
import getColors from "@/actions/store/get-colors";
import getCategory from "@/actions/store/get-category";
import Container from "@/components/store/BCcomponents/ui/Container";
import Billboard from "@/components/store/BCcomponents/Billboard";
import MobileFilter from "@/components/store/BCcomponents/MobileFilter";
import NoResults from "@/components/store/BCcomponents/ui/No-results";
import ProductCard from "@/components/store/BCcomponents/ui/productCard";

export const revalidate=0;
interface CategoryPageProps{
    params:{categoryId:string,storeId:string},
    searchParams:{
        colorId:string,
        sizeId:string,
    }
}
const CategoryPage:React.FC<CategoryPageProps> = async({
    params,
    searchParams
}) => {
    const products=await getProducts({
        categoryId:params.categoryId,
        colorId:searchParams.colorId,
        sizeId:searchParams.sizeId,
    },params.storeId)
    const sizes=await getSizes(params.storeId)
    const colors =await getColors(params.storeId)
    const category=await getCategory(params.categoryId,params.storeId)

    return ( 
        <div className="bg-white">
            <Container>
                <Billboard data={category.billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                   <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    <MobileFilter sizes={sizes} colors={colors}/>
                    <div className="hidden lg:block">
                        <Filter
                          valueKey="sizeId"
                          name="Sizes"
                          data={sizes}
                        />
                        <Filter
                          valueKey="colorId"
                          name="Colors"
                          data={colors}
                        />
                    </div>
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                      {products.length===0 && <NoResults/> }
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((item)=>(
                            <ProductCard key={item.id} data={item}/>
                        ))}
                      </div>
                    </div>
                   </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryPage;