import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { JWTService } from "../../lib/jwt";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../validation";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
    try {
        const validateData = registerSchema.parse(req.body);

        const existingUser = await prisma.users.findUnique({ where: { email: validateData.email } });
        if (existingUser) {
            return res.status(422).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(validateData.password, 12);
        
        //create user and session in a transaction
        const {user, session} = await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data:{
                    username: validateData.username,
                    email: validateData.email,
                    password: hashedPassword
                }
            })

            const session = await tx.sessions.create({
                data:{
                    userId: user.id,
                    ipAddress: req.ip,
                    userAgent: req.get("user-agent") || "",
                    payload: JSON.stringify({
                        userId: user.id,
                        lastActivity: Math.floor(Date.now() / 1000)
                    }),
                    lastActivity: Math.floor(Date.now() / 1000)
                }
            })

            return {user, session}
        })

        const tokens = await JWTService.generateTokens(user, session.id);

        //Don;t send sensitive data
        const {password: _, ...userWithoutPassword} = user;

        res.status(201).json({
            user: userWithoutPassword,
            ...tokens
        })
    } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(422).json({
                message: "Validation failed",
                errors: error
            });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const validateData = loginSchema.parse(req.body);
        
        const user = await prisma.users.findUnique({
            where: { email: validateData.email },
        })

        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(validateData.password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //Create new session
        const session = await prisma.sessions.create({
            data: {
                userId: user.id,
                ipAddress: req.ip,
                userAgent: req.headers['user-agent'],
                payload: JSON.stringify({
                    userId: user.id,
                    lastActivity: Math.floor(Date.now() / 1000)
                }),
                lastActivity: Math.floor(Date.now() / 1000)
            }
        })

        const tokens = await JWTService.generateTokens(user, session.id);

        const { password: _, refreshToken: __, ...userWithoutSensitive } = user;

        res.status(200).json({
            user: userWithoutSensitive,
            ...tokens
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default {
    register,
    login
}