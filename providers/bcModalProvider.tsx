"use client"
import PreviewModal from "@/components/store/BCcomponents/ui/preview-modal";
import { useEffect, useState } from "react";

const BcModalProvider = () => {
    const [mounted,setMounted]=useState(false)
    useEffect(()=>{
       setMounted(true)
    },[])
    if(!mounted){
        return null
    }
    return ( 
        <>
          <PreviewModal/>
        </>
     );
}
 
export default BcModalProvider;