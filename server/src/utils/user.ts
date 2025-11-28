import { prisma } from "../../lib/prisma";
export const getAuthed = async (id: number) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id }
        });

        return user;
    } catch (err) {
        console.log(err)
    }
}