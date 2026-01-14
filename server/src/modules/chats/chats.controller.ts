
import { Request, Response } from 'express'
import { prisma } from '../../../lib/prisma'
import chatService from './chat.service';

class ChatController {
    async getAll(req: Request, res: Response) {
        const chats = await chatService.getAll();
        chats?.reverse();
        res.status(200).send({ chats });
    }
}

export default new ChatController();

// export const getAllChats = async (req: Request, res: Response) => {
//     try {
//         const chats = await prisma.chat.findMany({
//             take: 18,
//             include: {
//                 user: {
//                     include: {
//                         profile: true
//                     }
//                 }
//             },
//             orderBy: {
//                 time: 'desc'
//             }
//         })
//         chats.reverse();
//         res.status(200).send({ chats });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Something went terribly wrong' })
//     }
// }