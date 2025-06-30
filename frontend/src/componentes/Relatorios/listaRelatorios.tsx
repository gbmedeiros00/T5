import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

type ProdutoServico = {
    nome: string;
    quantidade: number;
    valor: number;
    raca?: string;
    tipo?: string;
};

type Cliente = {
    id: number;
    nome: string;
    racaPet?: string;
    tipoPet?: string;
    consumo: {
        valorTotal: number;
        quantidadeTotal: number;
        produtos: ProdutoServico[];
        servicos: ProdutoServico[];
    };
};

const RELATORIOS = [
    { key: "topValor", label: "Top 5 clientes por valor", endpoint: "top5-valor" },
    { key: "topQtd", label: "Top 10 clientes por quantidade", endpoint: "top10-quantidade" },
    { key: "produtosMais", label: "Produtos mais consumidos", endpoint: "produtos-mais" },
    { key: "servicosMais", label: "Serviços mais consumidos", endpoint: "servicos-mais" },
    { key: "produtosPorRaca", label: "Produtos por raça", endpoint: "produtos-por-raca" },
    { key: "servicosPorRaca", label: "Serviços por raça", endpoint: "servicos-por-raca" },
    { key: "produtosPorTipo", label: "Produtos por tipo", endpoint: "produtos-por-tipo" },
    { key: "servicosPorTipo", label: "Serviços por tipo", endpoint: "servicos-por-tipo" }
];

function ListaRelatorios() {
    const [dados, setDados] = useState<any[]>([]);
    const [relatorioSelecionado, setRelatorioSelecionado] = useState(RELATORIOS[0].key);

    useEffect(() => {
        const endpoint = RELATORIOS.find(r => r.key === relatorioSelecionado)?.endpoint;
        if (!endpoint) return;
        fetch(`http://localhost:3000/relatorios/${endpoint}`)
            .then(res => res.json())
            .then(data => setDados(data))
            .catch(() => setDados([]));
    }, [relatorioSelecionado]);

    const handleRelatorioChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRelatorioSelecionado(e.target.value);
    };

    function renderRelatorio() {
        if (relatorioSelecionado === "topValor") {
            return (
                <>
                    <h4 className="mb-3">Top 5 clientes que mais consumiram em valor</h4>
                    <ol>
                        {dados.map((c: any, i) => (
                            <li key={i}>
                                {c.nome} - R$ {Number(c.valorTotal || c.valortotal).toFixed(2)}
                            </li>
                        ))}
                    </ol>
                </>
            );
        }

        if (relatorioSelecionado === "topQtd") {
            return (
                <>
                    <h4 className="mb-3">Top 10 clientes que mais consumiram em quantidade</h4>
                    <ol>
                        {dados.map((c: any, i) => (
                            <li key={i}>
                                {c.nome} - {c.quantidadeTotal || c.quantidadetotal} itens
                            </li>
                        ))}
                    </ol>
                </>
            );
        }

        if (relatorioSelecionado === "produtosMais") {
            return (
                <>
                    <h4 className="mb-3">Produtos mais consumidos</h4>
                    <ul>
                        {dados.map((p: any, i) => (
                            <li key={i}>
                                {p.nome} - {p.total} unidades
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "servicosMais") {
            return (
                <>
                    <h4 className="mb-3">Serviços mais consumidos</h4>
                    <ul>
                        {dados.map((s: any, i) => (
                            <li key={i}>
                                {s.nome} - {s.total} vezes
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "produtosPorRaca") {
            return (
                <>
                    <h4 className="mb-3">Produtos mais consumidos por raça</h4>
                    <ul>
                        {dados.map((p: any, i) => (
                            <li key={i}>
                                {p.nome} - Raça: {p.raca} - {p.total} unidades
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "servicosPorRaca") {
            return (
                <>
                    <h4 className="mb-3">Serviços mais consumidos por raça</h4>
                    <ul>
                        {dados.map((s: any, i) => (
                            <li key={i}>
                                {s.nome} - Raça: {s.raca} - {s.total} vezes
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "produtosPorTipo") {
            return (
                <>
                    <h4 className="mb-3">Produtos mais consumidos por tipo</h4>
                    <ul>
                        {dados.map((p: any, i) => (
                            <li key={i}>
                                {p.nome} - Tipo: {p.tipo} - {p.total} unidades
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        if (relatorioSelecionado === "servicosPorTipo") {
            return (
                <>
                    <h4 className="mb-3">Serviços mais consumidos por tipo</h4>
                    <ul>
                        {dados.map((s: any, i) => (
                            <li key={i}>
                                {s.nome} - Tipo: {s.tipo} - {s.total} vezes
                            </li>
                        ))}
                    </ul>
                </>
            );
        }

        return null;
    }

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <h2 className="mb-4 text-center">Relatórios de Consumo</h2>
            <div className="mb-4" style={{ minWidth: 320 }}>
                <label className="form-label fw-bold">Escolha o relatório:</label>
                <select
                    className="form-select"
                    value={relatorioSelecionado}
                    onChange={handleRelatorioChange}
                >
                    {RELATORIOS.map(r => (
                        <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                </select>
            </div>
            <div className="w-100 d-flex flex-column align-items-center">
                <div style={{ minWidth: 320, maxWidth: 600 }}>
                    {renderRelatorio()}
                </div>
            </div>
        </div>
    );
}

export default ListaRelatorios;