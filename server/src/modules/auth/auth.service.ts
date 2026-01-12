import { User } from "../../../generated/prisma/client";
import authRepository from "./auth.repository";
import { RegisterDto } from "./dto/register.dto";
import bcrypt from "bcryptjs"
import userRepository from "../users/user.repository";
import { LoginDto } from "./dto/login.dto";
import userService from "../users/user.service";


// TODO: Create custom error instance to modify status codes

class AuthService {
  async register(payload: RegisterDto): Promise<User | undefined> {
    const { username, password } = payload;
    if (!username || !password) {
      throw new Error("Please fill in missing fields..");
    }

    if (password.length < 6) {
      // return res.status(409).json({ message: "Password must be atleast 6 characters." });
    }
    try {
      const existingUser = await userRepository.findByUsername(username);

      if (existingUser) {
        // TODO refactor: throw new AppError with status 409
        throw new Error("Username already taken.");
      }

      const user = await authRepository.register(payload);

      return user;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async login(payload: LoginDto) {
    try {
      const { username, password } = payload;
      if (!username || !password) {
        throw new Error("Please fill in missing fields..");
      }
      
      const user = await userService.findByUsername(username);

      if (!user) {
        // TODO refactor: throw new AppError with status 409
        throw new Error(`Invalid account.`)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        // TODO refactor: throw new AppError with status 409
        throw new Error(`Invalid account.`)
      }

      return user;
    } catch (error) {
        throw new Error(`Error logging in: ${error}.`)
    }

  }
}

export default new AuthService();