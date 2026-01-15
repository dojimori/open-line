import { Profile, User } from "../../../generated/prisma/client";
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
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return user;
  }

  async findById(id: number, includeProfile: boolean = false): Promise<User> {
    const user = includeProfile
      ? await prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            profile: true,
          },
        })
      : await prisma.user.findUnique({
          where: {
            id,
          },
        });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    return user;
  }

  async upsertProfile({
      displayName,
      aboutMe,
      gender,
      country,
      likes,
      dislikes,
      relationship,
      profilePicture,
    }: Profile,
    userId: number
  ) {
    return await prisma.profile.upsert({
      where: { userId },
      create: {
        displayName: displayName ?? undefined,
        profilePicture: profilePicture ?? undefined,
        gender: gender ?? undefined,
        aboutMe: aboutMe ?? undefined,
        likes: likes ?? undefined,
        dislikes: dislikes ?? undefined,
        country: country ?? undefined,
        relationship: relationship ?? undefined,
        user: {
          connect: { id: userId },
        },
      },
      update: {
        displayName: displayName ?? undefined,
        profilePicture: profilePicture ?? undefined,
        gender: gender ?? undefined,
        aboutMe: aboutMe ?? undefined,
        likes: likes ?? undefined,
        dislikes: dislikes ?? undefined,
        relationship: relationship ?? undefined,
        country: country ?? undefined,
      },
    });
  }
}

export default new UserRepository();
