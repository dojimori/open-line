
import { Request, Response } from 'express'
import { prisma } from '../../../lib/prisma'

export const getAllChats = async (req: Request, res: Response) => {
    try {
        const chats = await prisma.chat.findMany({
            take: 18,
            include: {
                user: {
                    include: {
                        profile: true
                    }
                }
            }
        }) 

        res.status(200).send({ chats });
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Something went terribly wrong' })
    }
}