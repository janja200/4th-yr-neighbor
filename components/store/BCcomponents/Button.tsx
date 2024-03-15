"use client"

export interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement>{}
import { cn } from "@/lib/utils";
import { forwardRef } from "react"

const Button=forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type="button",
    ...props
},ref)=>{
    return(
        <button
         ref={ref}
         {...props}
         className={cn("w-auto rounded-full bg-black border-transparent px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition",
         className)}
        >
         {children}
        </button>
    )
})

Button.displayName="Button";
export default Button;