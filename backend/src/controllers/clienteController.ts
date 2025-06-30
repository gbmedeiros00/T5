import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listar = async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
};

export const criar = async (req: Request, res: Response) => {
  const { nome, nomeSocial, cpf, rg, dataCadastro, email, telefone, genero } = req.body;
  const cliente = await prisma.cliente.create({
    data: {
      nome,
      nomeSocial,
      cpf,
      rg,
      dataCadastro: new Date(dataCadastro),
      email,
      telefone,
      genero
    }
  });
  res.status(201).json(cliente);
};

export const atualizar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, nomeSocial, cpf, rg, dataCadastro, email, telefone, genero } = req.body;
  const cliente = await prisma.cliente.update({
    where: { id },
    data: {
      nome,
      nomeSocial,
      cpf,
      rg,
      dataCadastro: new Date(dataCadastro),
      email,
      telefone,
      genero
    }
  });
  res.json(cliente);
};

export const deletar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.consumo.deleteMany({
      where: { clienteId: id },
    });

    await prisma.cliente.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao deletar cliente.' });
  }
};