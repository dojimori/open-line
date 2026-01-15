import userRepository from "./user.repository";
import { prisma } from "../../../lib/prisma";
import { Profile, User } from "../../../generated/prisma/client";
import { CreateUserDto } from "./dto/create.dto";
import bcrypt from "bcryptjs";

class UserService {
  async create(payload: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = await userRepository.create({ ...payload, password: hashedPassword });
    return user;
  }
  async findByUsername(username: string) {
    return await userRepository.findByUsername(username);
  }

  async findById(id: number) {
    const { password, ...safeUser } = await userRepository.findById(id);
    return safeUser;
  }

  async findByIdWithProfile(id: number) {
    const { password, ...safeUser } = await userRepository.findById(id, true);
    return safeUser;
  }

  async upsertProfile(
    payload: Profile,
    userId: number
  ) {
    // TODO: check aboutMe, likes, and dislikes length if it exceeds to 200 characters
    await userRepository.upsertProfile(payload, userId);

  }
}

export default new UserService();
