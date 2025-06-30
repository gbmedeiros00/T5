import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listar = async (req: Request, res: Response) => {
  const pets = await prisma.pet.findMany();
  res.json(pets);
};

export const criar = async (req: Request, res: Response) => {
  const { nome, tipo, raca, genero, clienteId } = req.body;
  const pet = await prisma.pet.create({
    data: {
      nome,
      tipo,
      raca,
      genero,
      cliente: { connect: { id: clienteId } }
    }
  });
  res.status(201).json(pet);
};

export const atualizar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, tipo, raca, genero } = req.body;
  const pet = await prisma.pet.update({
    where: { id },
    data: { nome, tipo, raca, genero }
  });
  res.json(pet);
};

export const deletar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.pet.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao deletar pet.' });
  }
};