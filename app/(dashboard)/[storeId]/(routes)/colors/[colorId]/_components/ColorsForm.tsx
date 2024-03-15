"use client"
import { Color} from "@prisma/client"
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
interface ColorsFormProps{
    store:Color |null
}
const formSchema=z.object({
    name:z.string().min(1),
    value:z.string().min(4).regex(/^#/,{
      message:"String must be valid hexcode"
    }),
})

type ColorsFormValues=z.infer<typeof formSchema>;

export const ColorForm:React.FC<ColorsFormProps>=({
    store
})=>{
    const params=useParams()
    const router =useRouter()
    const [open,setOpen]=useState(false)
    const [loading,setloading]=useState(false)
    const title=store?"Edit color":"Create color"
    const description=store?"Edit a color":"Add a new color"
    const toastMessage=store?"Color updated":"Color created"
    const action=store?"Save changes":"Create"
    const form=useForm<ColorsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:store || {
          name:'',
          value:''
        }
    })
    const onSubmit=async(data:ColorsFormValues)=>{
        try {
          setloading(true)
          if(store){
            await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`,data)
          }else{
            await axios.post(`/api/${params.storeId}/colors`,data)
          }
          router.refresh()
          router.push(`/${params.storeId}/colors`)
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
        await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
        router.refresh()
        router.push(`/${params.storeId}/colors`)
        toast.success("Color deleted")
      } catch (error) {
        toast.error("Make sure you removed all products using this color first")
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
                              placeholder="Color name" 
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
                          <div className="flex items-center gap-x-4">
                            <Input
                              disabled={loading}
                              placeholder="Color value" 
                              {...field}
                            />
                            <div className="border p-4 rounded-full" style={{backgroundColor:field.value}}/>
                           </div>
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