import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import userService from "./user.service";
import { AppError } from "../../errors/app.error";

class UserController {
  /**
   *
   * @param req
   * @param res
   * @route /api/users/
   * @returns status 200
   */
  async me(req: Request, res: Response) {
    const isAuth = req.session.user;

    if (!isAuth) {
      return res.status(403).json(null);
    }

    const user = await userService.findByIdWithProfile(isAuth.id);

    return res.status(200).json({ user });
  }

  /**
   *
   * @param req
   * @param res
   * @route /api/users/profile
   * @returns status 200
   */
  async updateProfile(req: Request, res: Response) {
    const isAuth = req.session.user;

    if (!isAuth) {
      return res.status(403);
    }

    const file = (req as any).file;
    const profilePicture = file ? `/uploads/profiles/${file.filename}` : undefined;
    await userService.upsertProfile({ ...req.body, profilePicture }, isAuth.id);
    const user = await userService.findByIdWithProfile(isAuth.id);

    res.status(200).json({ user });
  }
}

export default new UserController();