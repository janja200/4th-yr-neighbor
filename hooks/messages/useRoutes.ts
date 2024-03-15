import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { useCurrentUser } from "../use-current-user";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const currentUser = useCurrentUser();

  const routes = useMemo(() => [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/home',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.isTwoFactorEnabled,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/profile/${currentUser?.id}`,
      auth: true,
    },
    { 
      label: 'Chat', 
      href: '/conversations', 
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId,
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: HiUsers, 
      active: pathname === '/users',
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname, conversationId, currentUser]);

  return routes;
};

export default useRoutes;

