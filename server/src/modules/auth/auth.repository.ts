import { IAuthRepository } from "./auth.interface";
import { User } from "../../../generated/prisma/client";
import { RegisterDto } from "./dto/register.dto";
import { prisma } from "../../../lib/prisma";
import userService from "../users/user.service";
import { CreateUserDto } from "../users/dto/create.dto";

class AuthRepository implements IAuthRepository {
  async register(payload: CreateUserDto): Promise<User> {
    const user = userService.create(payload);
    return user;
  }

  login(payload: any) {

  }
}

export default new AuthRepository();
