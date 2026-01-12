import { User } from "../../../generated/prisma/client";
import authRepository from "./auth.repository";
import { RegisterDto } from "./dto/register.dto";
import userService from "../users/user.service";
import userRepository from "../users/user.repository";

class AuthService {
  async register(payload: RegisterDto): Promise<User | undefined> {
    const { username, password } = payload;
    if (!username || !password) {
      throw new Error("Please fill in missing fields..");
      // return res.status(409).json({ message: "Please fill in missing fields." });
    }

    if (password.length < 6) {
      // return res.status(409).json({ message: "Password must be atleast 6 characters." });
    }
    try {
      const existingUser = await userRepository.findByUsername(username);

      if (existingUser) {
        throw new Error("Username already taken.");
      }

      const user = await authRepository.register(payload);

      return user;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}

export default new AuthService();