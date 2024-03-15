"use client"
import { Billboard, Size} from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/store/modals/AlertModal";
import Heading from "@/components/store/Heading";
import { Separator } from "@/components/ui/separator";

interface SizesFormProps{
    store:Size |null
}
const formSchema=z.object({
    name:z.string().min(1),
    value:z.string().min(1)
})

type SizesFormValues=z.infer<typeof formSchema>;

export const SizesForm:React.FC<SizesFormProps>=({
    store
})=>{
    const params=useParams()
    const router =useRouter()
    const [open,setOpen]=useState(false)
    const [loading,setloading]=useState(false)
    const title=store?"Edit size":"Create size"
    const description=store?"Edit a size":"Add a new size"
    const toastMessage=store?"Size updated":"Size created"
    const action=store?"Save changes":"Create"
    const form=useForm<SizesFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:store || {
          name:'',
          value:''
        }
    })
    const onSubmit=async(data:SizesFormValues)=>{
        try {
          setloading(true)
          if(store){
            await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
          }else{
            await axios.post(`/api/${params.storeId}/sizes`,data)
          }
          router.refresh()
          router.push(`/${params.storeId}/sizes`)
          toast.success(toastMessage)
        } catch (error) {
          toast.error("something went wrong")
        }finally{
           setloading(false)
        }
    }
    const onDelete=async()=>{
      try {
        setloading(true)
        await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
        router.refresh()
        router.push(`/${params.storeId}/sizes`)
        toast.success("Size deleted")
      } catch (error) {
        toast.error("Make sure you removed all categories first")
      }finally{
        setloading(false)
      }
    }
    return(
        <>
        <AlertModal
           isOpen={open}
           onClose={()=>setOpen(false)}
           onConfirm={()=>onDelete()}
           loading={loading}
        />
        <div className="flex items-center justify-between">

            <Heading
               title={title}
               description={description}
            />
            {store && (

            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={()=>setOpen(true)}
            >
             <Trash className="w-4 h-4 hover:shrink-0"/>
            </Button>
            )}
            
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            
              <div className="grid grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Size name" 
                              {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    
                  )}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Size value" 
                              {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    
                  )}
                />

              </div>
              <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
            </form>
        </Form>
        <Separator/>
       
        </>
    )
}