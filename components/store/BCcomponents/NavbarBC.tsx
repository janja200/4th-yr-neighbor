import Link from "next/link";
import Container from "./ui/Container";
import MainNavBC from "./MainNavBC";
import NavbarActions from "./NavbarActions";
import getCategories from "@/actions/store/get-categories";

export const revalidate=0;
interface NavbarbcProps{
  storeId:string
}
const NavbarBC = async({storeId}:NavbarbcProps) => {
  const categories=await getCategories(storeId)
    return ( 
        <Container>
         <div className="relative border-b  px-4 sm:px-6 lg:px-8 flex h-16 items-center ">
          <Link href="" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">
                Store
            </p>
          </Link>
          <MainNavBC data={categories}/>
          <NavbarActions/>
         </div>
        </Container>
     );
}
 
export default NavbarBC;