"use client"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({className, ...props}:React.HTMLAttributes<HTMLElement>) => {
    const pathname=usePathname()
    const params=useParams()
    const routes=[
      {
        href:`/${params.storeId}`,
        label:"Overview",
        active:pathname===`/${params.storeId}`,
      },
      {
            href:`/${params.storeId}/billboards`,
            label:"Billboards",
            active:pathname===`/${params.storeId}/billboards` || pathname===`/${params.storeId}/billboards/new`,
        },
        {
          href:`/${params.storeId}/categories`,
          label:"Categories",
          active:pathname===`/${params.storeId}/categories` || pathname===`/${params.storeId}/categories/new`,
      },
      {
          href:`/${params.storeId}/colors`,
          label:"Colors",
          active:pathname===`/${params.storeId}/colors` || pathname===`/${params.storeId}/colors/new`,
      },
       {
        href:`/${params.storeId}/products`,
        label:"Products",
        active:pathname===`/${params.storeId}/products` || pathname===`/${params.storeId}/products/new`,
       },
       {
        href:`/${params.storeId}/orders`,
        label:"Orders",
        active:pathname===`/${params.storeId}/orders` || pathname===`/${params.storeId}/orders/new`,
       },
      {
        href:`/${params.storeId}/sizes`,
        label:"sizes",
        active:pathname===`/${params.storeId}/sizes` || pathname===`/${params.storeId}/sizes/new`,
    },
      {
            href:`/${params.storeId}/settings`,
            label:"settings",
            active:pathname===`/${params.storeId}/settings`,
        }
    ];
    
    return (
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active ? 'text-black border-b-4 border-black dark:text-white' : 'text-muted-foreground'
              )}
            >
              {route.label}
          </Link>
          ))}
        </nav>
      )
}
 
export default MainNav;