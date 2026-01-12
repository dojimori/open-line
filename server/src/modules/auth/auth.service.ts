import { User } from "../../../generated/prisma/client";
import authRepository from "./auth.repository";
import { RegisterDto } from "./dto/register.dto";
import bcrypt from "bcryptjs"
import userRepository from "../users/user.repository";
import { LoginDto } from "./dto/login.dto";
import userService from "../users/user.service";


// TODO: Create custom error instance to modify status codes

class AuthService {
  // TODO refactor error handling lmao
  async register(payload: RegisterDto): Promise<User | undefined> {
    const { username, password, passwordConfirmation } = payload;
    if (!username || !password || !passwordConfirmation) {
      throw new Error("Please fill in missing fields.");
    }

    if (password !== passwordConfirmation) {
      // TODO refactor: throw new AppError with status 409
      throw new Error("Passwords does not match.");
    }

    if (password.length < 6) {
      // TODO refactor: throw new AppError with status 409
      throw new Error("Password must be atleast 6 characters.");
    }
    try {
      const existingUser = await userRepository.findByUsername(username);

      if (existingUser) {
        // TODO refactor: throw new AppError with status 409
        throw new Error("Username already taken.");
      }

      const user = await authRepository.register({ username, password });

      return user;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
  

  // TODO refactor error handling lmao
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
    } catch (error: any) {
        throw new Error(`Error logging in: ${error.message}`)
    }

  }
}

export default new AuthService();