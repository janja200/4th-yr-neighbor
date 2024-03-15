import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Notification } from "@prisma/client";

const getNotifications = async (): Promise<Notification[] | null> => {
  try {
    const user=await currentUser()
    const res = await db.notification.findMany({
      where: {
        userId:user?.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    await db.user.update({
      where: {
        id: user?.id
      },
      data: {
        hasNotification: false,
      }
    })
    return res; // No need for res.json() as it's not an HTTP response.
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Handle errors appropriately, and you may want to return a default value or rethrow the error.
  }
};

export default getNotifications;