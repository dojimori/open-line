import { Server, Socket } from "socket.io"
import { users } from "..";
import { prisma } from "../../../lib/prisma";
import userService from "../../modules/users/user.service";

export const chatHandler = (io: Server, socket: Socket) => {
    socket.on('chat:message', async (data) => {
        const messenger = users.get(socket.id)
        const { message, time } = data;
        io.emit('chat:message', {
            message,
            time,
            user: messenger
        });

        const user = await userService.findById(data.id)

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