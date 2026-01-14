import chatRepository from "./chat.repository";
import { Chat } from "../../../generated/prisma/client";

class ChatService {
  async create(message: string, type: string, userId: number): Promise<Chat> {
    return chatRepository.create(message, type, userId);
  }

  async getAll(): Promise<Chat[]| []> {
    const chats = await chatRepository.getAll();
    chats?.reverse();
    return chats;
  }
}

export default new ChatService();