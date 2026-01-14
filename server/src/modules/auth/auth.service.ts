import { User } from "../../../generated/prisma/client";
import { RegisterDto } from "./dto/register.dto";
import bcrypt from "bcryptjs"
import userRepository from "../users/user.repository";
import { LoginDto } from "./dto/login.dto";
import userService from "../users/user.service";
import { AppError } from "../../errors/app.error";

class AuthService {
  async register(payload: RegisterDto): Promise<User | undefined> {
    const { username, password, passwordConfirmation } = payload;
    if (!username || !password || !passwordConfirmation) {
      throw new AppError("Please fill in missing fields", 409);
    }

    if (password !== passwordConfirmation) {
      throw new AppError("Passwords does not match", 409);
    }

    if (password.length < 6) {
      throw new AppError("Password must be atleast 6 characters", 409);
    }

    try {
      const existingUser = await userRepository.findByUsername(username);

      if (existingUser) {
        throw new AppError("Username already taken", 409);
      }

      const user = await userRepository.create({ username, password });

      return user;
    } catch (error: any) {
      if (error?.message == 'USER_NOT_FOUND') {
        throw new AppError('User not found.', 404);
      }

      throw new AppError('Failed to register user', 500);
    }
  }
  
  async login(payload: LoginDto) {
    try {
      const { username } = payload;
      const _password = payload.password;
      if (!username || !_password) {
        throw new AppError("Please fill in missing fields..", 400);
      }
      
      const user = await userService.findByUsername(username);

      if (!user || !(await bcrypt.compare(_password, user.password))) {
        throw new AppError('Invalid account, please double check your username or password', 401)
      }

      const { password, ...safeUser } = user;

      return safeUser;
    } catch (error: any) {
      if (error.message == 'USER_NOT_FOUND') {
        throw new AppError('User not found, please double check your username or password', 404)
      }

      throw error;
    }

  }
}

export default new AuthService();