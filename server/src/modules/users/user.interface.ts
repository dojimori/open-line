import { User } from "../../../generated/prisma/client";
import { CreateUserDto } from "./dto/create.dto";

export interface IUserRepository {
  create(payload: CreateUserDto ): Promise<User>;
  findByUsername(username: string): Promise<User|null>;
}