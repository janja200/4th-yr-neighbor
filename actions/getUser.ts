import { db } from "@/lib/db";
import { User } from "@prisma/client";

const getUser = async (userId: string): Promise<User | null> => {
  try {
    const res = await db.user.findUnique({
      where: {
        id:userId,
      },
    });
    
    return res; // No need for res.json() as it's not an HTTP response.
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Handle errors appropriately, and you may want to return a default value or rethrow the error.
  }
};

export default getUser;