import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { RegisterDto } from "./dto/register.dto";
import authService from "./auth.service";
import { LoginDto } from "./dto/login.dto";

class AuthController {
  /**
   * @route /api/auth/register
   */
  async register(req: Request, res: Response) {
    try {
      const payload: RegisterDto = {
        username: req.body.username,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      };

      await authService.register(payload);

      res.status(201).json({ message: "Registered successfully, please login." });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @route /api/auth/login
   */

  async login(req: Request, res: Response) {
    try {
      const payload: LoginDto = {
        username: req.body.username,
        password: req.body.password,
      };

      const user = await authService.login(payload);

      req.session.user = { id: user.id, username: user.username };

      res.status(200).json({ message: "Login successfully.", user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuthController();

// export const register = async (req: Request, res: Response) => {
//     try {
//         const { username, password } = req.body;

//         if (username.trim() == '' || password.trim() == '') {
//             return res.status(409).json({ message: 'Please fill in missing fields.'})
//         }

//         if (password.length < 6) {
//             return res.status(409).json({ message: 'Password must be atleast 6 characters.'})
//         }

//         const userNameExists = await prisma.user.findFirst({
//             where: {
//                 username: username
//             }
//         })

//         if (userNameExists) {
//             return res.status(409).json({ message: ''})
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const user = await prisma.user.create({
//             data: {
//                 username,
//                 password: hashedPassword
//             }
//         });

//         res.status(201).json({ message: 'Registered successfully, please login.'})
//     } catch(err) {
//         console.log(err)
//         res.status(500).json({ message: `${err}`})
//     }
// }

// export const login = async (req: Request, res: Response) => {
//     try {
//         if (req.session.user) return res.status(409).json({ message: 'Session already exists.'})
// ;

//         const { username, password } = req.body;
//         console.log('body', req.body);

//         if (username.trim() == '' || password.trim() == '') {
//             return res.status(409).json({ message: 'Please fill in missing fields.'})
//         }

//         const user = await prisma.user.findFirst({
//             where: {
//                 username: username
//             }
//         })
//         if (!user) {
//             return res.status(409).json({ message: 'Invalid account.'})
//         }

//         const isValid = await bcrypt.compare(password, user.password);

//         if (!isValid) {
//             return res.status(409).json({ message: 'Invalid account.'})
//         }

//         req.session.user = { id: user.id, username: user.username };

//         return res.status(200).json({ message: 'Login successfully.', user });
//     } catch(error) {
//         console.log(error)
//         return res.status(500).json({ message: 'Login failed :('});
//     }
// }

// export const logout = async (req: Request, res: Response) => {
//     req.session.destroy((err) => {
//         if(err) {
//             console.log(err)
//         } else {
//             console.log('Session destroyed');
//         }
//     });

//     return res.json({ message: 'Logged out'})
// }
