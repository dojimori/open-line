import { Chat } from "../../../generated/prisma/client";
import { IChatRepository } from "./chat.interface";
import { prisma } from "../../../lib/prisma";

class ChatRepository implements IChatRepository {
  async getAll(): Promise<Chat[] | null> {
    return await prisma.chat.findMany({
      take: 18,
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        time: "desc",
      },
    });
  }
}


export default new ChatRepository();