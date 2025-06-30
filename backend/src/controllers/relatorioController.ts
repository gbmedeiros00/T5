import { Request, Response } from "express";
import prisma from "../services/prisma";

export const top5PorValor = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT c.clienteId, cl.nome, SUM(p.preco * c.quantidade) AS valorTotal
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    JOIN Cliente cl ON cl.id = c.clienteId
    GROUP BY c.clienteId, cl.nome
    ORDER BY valorTotal DESC
    LIMIT 5;
  `);
  res.json(resultado);
};

export const top10MaisConsumiram = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT c.clienteId, cl.nome, SUM(c.quantidade) AS quantidadeTotal
    FROM Consumo c
    JOIN Cliente cl ON cl.id = c.clienteId
    GROUP BY c.clienteId, cl.nome
    ORDER BY quantidadeTotal DESC
    LIMIT 10;
  `);
  res.json(resultado);
};

export const top10MenosConsumiram = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT c.clienteId, cl.nome, SUM(c.quantidade) AS quantidadeTotal
    FROM Consumo c
    JOIN Cliente cl ON cl.id = c.clienteId
    GROUP BY c.clienteId, cl.nome
    ORDER BY quantidadeTotal ASC
    LIMIT 10;
  `);
  res.json(resultado);
};

export const produtosMaisConsumidos = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    WHERE p.tipo = 'Produto'
    GROUP BY p.nome
    ORDER BY total DESC
    LIMIT 10;
  `);
  res.json(resultado);
};

export const servicosMaisConsumidos = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    WHERE p.tipo = 'Serviço'
    GROUP BY p.nome
    ORDER BY total DESC
    LIMIT 10;
  `);
  res.json(resultado);
};

export const produtosPorRaca = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, pt.raca, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    JOIN Pet pt ON pt.id = c.petId
    WHERE p.tipo = 'Produto'
    GROUP BY p.nome, pt.raca
    ORDER BY pt.raca, total DESC;
  `);
  res.json(resultado);
};

export const servicosPorRaca = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, pt.raca, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    JOIN Pet pt ON pt.id = c.petId
    WHERE p.tipo = 'Serviço'
    GROUP BY p.nome, pt.raca
    ORDER BY pt.raca, total DESC;
  `);
  res.json(resultado);
};

export const produtosPorTipo = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, pt.tipo AS tipo, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    JOIN Pet pt ON pt.id = c.petId
    WHERE p.tipo = 'Produto'
    GROUP BY p.nome, pt.tipo
    ORDER BY pt.tipo, total DESC;
  `);
  res.json(resultado);
};

export const servicosPorTipo = async (_: Request, res: Response) => {
  const resultado = await prisma.$queryRawUnsafe(`
    SELECT p.nome, pt.tipo AS tipo, SUM(c.quantidade) AS total
    FROM Consumo c
    JOIN Produto p ON p.id = c.produtoId
    JOIN Pet pt ON pt.id = c.petId
    WHERE p.tipo = 'Serviço'
    GROUP BY p.nome, pt.tipo
    ORDER BY pt.tipo, total DESC;
  `);
  res.json(resultado);
};