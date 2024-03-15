import { useRouter } from "next/navigation";
import { BiSolidEditLocation } from "react-icons/bi";
import { FaFeather } from "react-icons/fa";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/home')}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <BiSolidEditLocation size={20} color="white" />
      <div >
      <div className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      ">
        <FaFeather size={30} color="white" />
      </div>
      <div className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
      ">
        <p 
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        ">
          Neighbor
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default SidebarLogo;
