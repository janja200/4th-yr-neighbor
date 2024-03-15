import { db } from "@/lib/db";
import { User } from "@prisma/client";

type UserWithFollowersCount = User & { followersCount: number };

const getFetchedUser = async (userId: string): Promise<UserWithFollowersCount | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser) {
      return null;
    }

    const followersCount = await db.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    });

    const userWithFollowersCount: UserWithFollowersCount = {
      ...existingUser,
      followersCount
    };

    return userWithFollowersCount;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default getFetchedUser;
