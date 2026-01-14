import { Chat } from "../../../generated/prisma/client";
import { IChatRepository } from "./chat.interface";
import { prisma } from "../../../lib/prisma";

class ChatRepository implements IChatRepository {
  async create(message: string, type: string, userId: number): Promise<Chat> {
    try {
      return await prisma.chat.create({
        data: {
          message,
          type: "chat",
          user: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      console.log(`database error: ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<Chat[] | []> {
    try {
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
    } catch (error) {
      console.log(`database error: ${error}`);
      throw error
    }
  }
}

export default new ChatRepository();
