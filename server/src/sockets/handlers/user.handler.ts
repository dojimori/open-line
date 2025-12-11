import { Server, Socket } from "socket.io";
import { users } from "..";

const onDisconnectHandler = (io: Server, socket: Socket) => {
    const user = users.get(socket.id);
    if (user) {
        io.emit('left', `${user.displayName || user.username} left the chat`)
        console.log(socket.id)
        users.delete(socket.id)
    }
}

export const userHandler = (io: Server, socket: Socket) => {
    socket.on('join', (data) => {
        // console.log(`${username} joined.`)
        users.set(socket.id, {
            username: data.username, 
            id: data.id, 
            displayName: data.displayName,
            profilePicture: data.profilePicture
        });

        io.emit('active-users', Array.from(users.values()));
        io.emit('joined', `${data.displayName || data.username} joined the chat`)
    })


    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })

    socket.on('stop_typing', (data) => {
        socket.broadcast.emit('stop_typing');
    })

    socket.on('left', () => {
        onDisconnectHandler(io, socket)
        io.emit('active-users', Array.from(users.values()));
    });

    socket.on('disconnect', () => {
        onDisconnectHandler(io, socket)
        io.emit('active-users', Array.from(users.values()));
    });
}