import userRepository from "./user.repository";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../generated/prisma/client";
import { CreateUserDto } from "./dto/create.dto";
import bcrypt from 'bcryptjs'

class UserService {
  async create(payload: CreateUserDto) {
     try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(payload.password, salt);
      const user = await userRepository.create({ ...payload, password: hashedPassword })
      return user;
    } catch(error) {
      throw new Error(`Error creating user: ${error}`)
    }
  }
  async findByUsername(username: string): Promise<User | null> {
    // return await prisma.user.findFirst({
    //   where: {username}
    // })
    try {
      const user = await userRepository.findByUsername(username)

      return user;
    } catch(error) {
      throw new Error(`Error finding user by username: ${error}`)
    }
  }
}

export default new UserService(); 