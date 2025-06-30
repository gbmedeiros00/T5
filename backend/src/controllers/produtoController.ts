import { Request, Response } from "express";
import prisma from "../services/prisma";

export const listar = async (_: Request, res: Response) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
};

export const criar = async (req: Request, res: Response) => {
  const { nome, preco, tipo, categoria, descricao } = req.body;
  const produto = await prisma.produto.create({
    data: { nome, preco, tipo, categoria, descricao }
  });
  res.status(201).json(produto);
};

export const atualizar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco, tipo, categoria, descricao } = req.body;
  const produto = await prisma.produto.update({
    where: { id },
    data: { nome, preco, tipo, categoria, descricao }
  });
  res.json(produto);
};

export const deletar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.produto.delete({ where: { id } });
  res.status(204).send();
};