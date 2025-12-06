import { Request, Response } from 'express'
import { prisma } from '../../../lib/prisma';

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(404).json(null)
        }

        return res.status(200).json({ user })
    } catch (err) {
        console.log(err)
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const authed = req.session.user;
        const {
            imageFile,
            username,
            displayName,
            aboutMe,
            gender,
            country,
            likes,
            dislikes
        } = req.body;
        if (!authed) {
            return res.status(403);
        }

        const body = req.body;
        console.log(body)
        // await prisma.profile.upsert({
        //     where: { id: authed.id },
        //     create: {
        //         displayName: "w",
        //         profilePicture: "w",
        //         gender: "w",
        //         aboutMe: "w",
        //         likes: "w",
        //         dislikes: "w",
        //         country: "w",
        //         coverPicture: "w"
        //     }
        // })

        await prisma.profile.upsert({
            where: { userId: authed.id },
            create: {
                displayName,
                profilePicture: imageFile,
                gender,
                aboutMe,
                likes,
                dislikes,
                country,
                user: {
                    connect: { id: authed.id }
                }
            },
            update: {
                displayName,
                profilePicture: imageFile,
                gender,
                aboutMe,
                likes,
                dislikes,
                country,
            }
        })


        res.status(201).json(body)
    } catch (error) {
        console.log(error)
    }
}