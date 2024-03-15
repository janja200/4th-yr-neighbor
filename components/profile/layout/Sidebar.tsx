"use client"
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import useRoutes from '@/hooks/messages/useRoutes';

const Sidebar = () => {

  const items = useRoutes()

  return (
    <>
    <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                alert={item.alert}
                auth={item.auth}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
      </>
  )
};

export default Sidebar;
