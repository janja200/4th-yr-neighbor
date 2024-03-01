import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";


const getUsers = async () => {
  const User =await currentUser();

  if (!User?.email) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        NOT: {
          email: User.email
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
