import getUsers from '@/actions/messages/getUsers';
import FollowBar from '@/components/profile/layout/FollowBar';
import Sidebar from '@/components/profile/layout/Sidebar';
import StoreUserLatLng from '@/hooks/use-storeUserLocation';

const Layout: React.FC<{ children: React.ReactNode }> = async({ children }) => {
   const users=await getUsers()
  return (
    <div className="h-screen">
      <StoreUserLatLng/>
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div 
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
              overflow-scroll
          ">
            {children}
          </div>
          <FollowBar users={users}/>
        </div>
     </div>
    </div>
  )
}

export default Layout;