"use client"
import { cn } from "@/lib/utils";
import { Image as imageType } from "@/types/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface GalleryTabProps{
    image:imageType
}
const GalleryTab:React.FC<GalleryTabProps> = ({
    image
}) => {
    return ( 
       <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
         {({selected})=>(
            <div>
                <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                <Image
                    fill
                    alt=""
                    src={image.url}
                    className="object-cover object-center"
                />
                </span>
                <span
                 className={cn("absolute inset-0 rounded-md ring-2 ring-offset-2",selected?"ring-black":"ring-transparent")}
                />
            
            </div>
         )}
       </Tab>
     );
}
 
export default GalleryTab;