import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const User = await currentUser();

    if (!User?.email) {
      return null;
    }
  
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;
