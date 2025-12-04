import { Request, Response } from 'express'

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(404).json(null)
        }

        return res.status(200).json({ user })
    } catch(err) {
        console.log(err)
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        console.log(body)
        res.json(body)
    } catch(error) {
        console.log(error)
    }
}