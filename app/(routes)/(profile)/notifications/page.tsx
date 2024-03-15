import getNotifications from "@/actions/getNotifications";
import Header from "@/components/profile/Header";
import NotificationsFeed from "@/components/profile/NotificationsFeed";

const Notifications =async () => {
  const notification=await getNotifications();
  return ( 
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed fetchedNotifications={notification!}/>
    </>
   );
}
 
export default Notifications;