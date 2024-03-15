"use client"
import { Billboard} from "@prisma/client"
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
import { ImageUpload } from "@/components/store/ui/imageUpload";
import { Separator } from "@/components/ui/separator";
interface BillBoardsFormProps{
    store:Billboard |null
}
const formSchema=z.object({
    label:z.string().min(1),
    imageUrl:z.string().min(1)
})

type BillBoardsFormValues=z.infer<typeof formSchema>;

export const BillBoardsForm:React.FC<BillBoardsFormProps>=({
    store
})=>{
    const params=useParams()
    const router =useRouter()
    const [open,setOpen]=useState(false)
    const [loading,setloading]=useState(false)
    const title=store?"Edit billboard":"Create billboard"
    const description=store?"Edit a billboard":"Add a new billboard"
    const toastMessage=store?"Billboard updated":"Billboard created"
    const action=store?"Save changes":"Create"
    const form=useForm<BillBoardsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:store || {
          label:'',
          imageUrl:''
        }
    })
    const onSubmit=async(data:BillBoardsFormValues)=>{
        try {
          setloading(true)
          if(store){
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data)
          }else{
            await axios.post(`/api/${params.storeId}/billboards`,data)
          }
          router.refresh()
          router.push(`/${params.storeId}/billboards`)
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
        await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
        router.refresh()
        router.push(`/${params.storeId}/billboards`)
        toast.success("Billboard deleted")
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
            <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Background image</FormLabel>
                        <FormControl>
                            <ImageUpload
                               disabled={loading}
                               onRemove={(url)=>field.onChange("")}
                               onChange={(url)=>field.onChange(url)}
                               value={field.value?[field.value]:[]}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
              <div className="grid grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="label"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Billboard label" 
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