import { Request, Response } from 'express'
import { prisma } from '../../../lib/prisma';
import bcrypt from "bcryptjs"


export const register = async (req: Request, res: Response) => {
    try {
        // await prisma.user.create({
        //     data: {
        //         username: 'test-user',
        //         password: '123123'
        //     }
        // })

        // res.status(201).send('created')
        const { username, password } = req.body;
        
        if (username.trim() == '' || password.trim() == '') {
            return res.status(409).json({ message: 'Please fill in missing fields.'})
        }

        if (password.length < 6) {
            return res.status(409).json({ message: 'Password must be atleast 6 characters.'})
        }

        const userNameExists = await prisma.user.findFirst({
            where: { 
                username: username
            }
        })

        if (userNameExists) {
            return res.status(409).json({ message: 'Username already taken.'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'Registered successfully, please login.'})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: `${err}`})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        if (req.session.user) return res.status(409).json({ message: 'Session already exists.'})
;

        const { username, password } = req.body;
        console.log('body', req.body);

        if (username.trim() == '' || password.trim() == '') {
            return res.status(409).json({ message: 'Please fill in missing fields.'})
        }

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })
        if (!user) {
            return res.status(409).json({ message: 'Invalid account.'})
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(409).json({ message: 'Invalid account.'})
        }

        req.session.user = { id: user.id, username: user.username };
    
        return res.status(200).json({ message: 'Login successfully.', user });
    } catch(error) {
        console.log(error)
        return res.status(500).json({ message: 'Login failed :('});
    }
}

export const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Session destroyed');
        }
    });

    return res.json({ message: 'Logged out'})
}