"use client"
import { Billboard as BillboardType } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
interface BillboardProps{
    data:BillboardType
}

const HomeBillboard:React.FC<BillboardProps> = ({
    data
}) => {
  const router=useRouter()
  const params=useParams()
  const handleClick=()=>{
    router.push(`/${data.id}/bussinessClient`)
  }
    return ( 
        <div 
        onClick={handleClick}
        className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden"
        >
          <div 
          className="rounded-xl relative aspect-square sm:aspect-[2/1] md:aspect-[2.4/1] p-3 overflow-hidden bg-cover bg-gray-100"
          style={{backgroundImage:`url(${data?.imageUrl})`}}>
            <div
             className="h-full w-full flex flex-col justify-center items-center text-center gap-8"
            >
              <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                {data?.label} 
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default HomeBillboard;