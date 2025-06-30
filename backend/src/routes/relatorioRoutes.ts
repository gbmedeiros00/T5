import { Router } from "express";
import * as Relatorio from "../controllers/relatorioController";

const router = Router();

router.get("/top5-valor", Relatorio.top5PorValor);
router.get("/top10-quantidade", Relatorio.top10MaisConsumiram);
router.get("/top10-menor", Relatorio.top10MenosConsumiram);
router.get("/produtos-mais", Relatorio.produtosMaisConsumidos);
router.get("/servicos-mais", Relatorio.servicosMaisConsumidos);
router.get("/produtos-por-raca", Relatorio.produtosPorRaca);
router.get("/servicos-por-raca", Relatorio.servicosPorRaca);
router.get("/produtos-por-tipo", Relatorio.produtosPorTipo);
router.get("/servicos-por-tipo", Relatorio.servicosPorTipo);

export default router;