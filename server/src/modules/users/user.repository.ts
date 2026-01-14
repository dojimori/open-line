import { User } from "../../../generated/prisma/client";
import { IUserRepository } from "./user.interface";
import { prisma } from "../../../lib/prisma";
import { CreateUserDto } from "./dto/create.dto";

class UserRepository implements IUserRepository {
  async create(payload: CreateUserDto): Promise<User> {
    return await prisma.user.create({
      data: payload,
    });
  }
  
  async findByUsername(username: string): Promise<User> {
    try {
      const user = await prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }

      return user; 
    } catch (error) {
      console.log(`REPO error: ${error}`)
      throw error;
    }
  }
}

export default new UserRepository();
