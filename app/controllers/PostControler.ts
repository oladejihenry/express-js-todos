import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const get = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.posts.findMany();
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await prisma.posts.findUnique({ where: { id: parseInt(id) } });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const post = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(422).json({ message: "Missing required fields" });
        }
        const post = await prisma.posts.create({ data: { title, content, authorId: (req as any).user.id } });
        if (!post) {
            return res.status(404).json({ message: "Post not created" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const put = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await prisma.posts.update({ where: { id: parseInt(id) }, data: { title, content } });
    res.json(post);
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await prisma.posts.delete({ where: { id: parseInt(id) } });
    res.json(post);
}

export default {
    get,
    getById,
    post,
    put,
    deletePost
}