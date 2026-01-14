import { Chat } from "../../../generated/prisma/client";

export interface IChatRepository {
  getAll(): Promise<Chat[] | null>;
}