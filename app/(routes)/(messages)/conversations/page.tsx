'use client';

import EmptyState from "@/components/messages/EmptyState";
import useConversation from "@/hooks/messages/useConversation";
import clsx from "clsx";


const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx(
      'lg:pl-80 h-full lg:block', 
      isOpen ? 'block' : 'hidden'
    )}>
      <EmptyState />
    </div>
  )
}

export default Home;
