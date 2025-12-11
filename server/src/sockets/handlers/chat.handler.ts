import { Server, Socket } from "socket.io"
import { users } from "..";
import { prisma } from "../../../lib/prisma";


export const chatHandler = (io: Server, socket: Socket) => {
    socket.on('chat:message', async (data) => {
        const messenger = users.get(socket.id)
        const { message, time } = data;
        io.emit('chat:message', {
            message,
            time,
            user: messenger
        });

        // store chat message to db
        // 1. kwaon nato ang user
        // 2. associate ang chat ani nga user


        const user = await prisma.user.findUnique({
            where: {
                id: data.userId
            }
        })

        if (!user) {
            return;
        }

        await prisma.chat.create({
            data: {
                message,
                type: 'chat',
                user: {
                    connect: { id: user.id }
                }
            }
        })

    });
}