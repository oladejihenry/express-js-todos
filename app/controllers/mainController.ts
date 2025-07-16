import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const get = async (req: Request, res: Response) => {
    const todos = await prisma.todos.findMany();
    res.json(todos);
}

export const post = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;
    const todo = await prisma.todos.create({ data: { title, description, status } });
    res.json(todo);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await prisma.todos.findUnique({ where: { id: parseInt(id) } });
    res.json(todo);
}

export const put = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const todo = await prisma.todos.update({ where: { id: parseInt(id) }, data: { title, description, status } });
    res.json(todo);
}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await prisma.todos.delete({ where: { id: parseInt(id) } });
    res.json(todo);
}

export default {
    get,
    getById,
    post,
    put,
    deleteTodo
}