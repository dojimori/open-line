import { Chat } from "../../../generated/prisma/client";

export interface IChatRepository {
  create(message: string, type: string, userId: number): Promise<Chat>;
  getAll(): Promise<Chat[] | null>;
}