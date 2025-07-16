import { Request, Response } from "express";
import prisma from "../../lib/prisma";


export const get = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todos.findMany();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const post = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.body;
        const todo = await prisma.todos.create({ data: { title, description, status } });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todos.findUnique({ where: { id: parseInt(id) } });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const put = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const todo = await prisma.todos.update({ where: { id: parseInt(id) }, data: { title, description, status } });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todos.delete({ where: { id: parseInt(id) } });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export default {
    get,
    getById,
    post,
    put,
    deleteTodo
}