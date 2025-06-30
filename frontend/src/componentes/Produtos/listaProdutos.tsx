import { useState, useEffect } from "react";
import FormCadastroProduto from "./formCadastroProduto";

type Produto = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    categoria: string;
    tipo: string;
};

type Props = {
    tema: string;
};

function ListaProdutos({ tema }: Props) {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
    const [produtoVisualizando, setProdutoVisualizando] = useState<Produto | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/produtos")
            .then(res => res.json())
            .then(data => setProdutos(data))
            .catch(() => setProdutos([]));
    }, []);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setProdutoEditando(null);
    };

    const abrirModalEditar = (produto: Produto) => {
        setModalAberto(true);
        setProdutoEditando(produto);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setProdutoEditando(null);
    };

    const excluirProduto = (id: number) => {
        fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" })
            .then(() => setProdutos(prev => prev.filter(p => p.id !== id)));
    };

    const handleSubmitProduto = (dados: { nome: string; preco: number; descricao: string; categoria: string; tipo: string }) => {
        if (produtoEditando) {
            fetch(`http://localhost:3000/produtos/${produtoEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
                .then(res => res.json())
                .then(produtoAtualizado => {
                    setProdutos(prev =>
                        prev.map(p =>
                            p.id === produtoEditando.id
                                ? { ...p, ...produtoAtualizado }
                                : p
                        )
                    );
                    setModalAberto(false);
                    setProdutoEditando(null);
                });
        } else {
            fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
                .then(res => res.json())
                .then(novoProduto => {
                    setProdutos(prev => [...prev, novoProduto]);
                    setModalAberto(false);
                    setProdutoEditando(null);
                });
        }
    };

    const fecharVisualizacao = () => setProdutoVisualizando(null);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Produtos e Serviços</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Cadastro
                </button>
            </div>
            <ul className="list-group">
                {produtos.map(produto => (
                    <li
                        key={produto.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={produto.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{produto.nome}</strong>
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-info me-2"
                                onClick={() => setProdutoVisualizando(produto)}
                            >
                                Mais informações
                            </button>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(produto)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirProduto(produto.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {modalAberto && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {produtoEditando ? "Atualizar Produto/Serviço" : "Novo Produto/Serviço"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroProduto
                                    produto={produtoEditando ? {
                                        nome: produtoEditando.nome,
                                        preco: produtoEditando.preco,
                                        descricao: produtoEditando.descricao,
                                        categoria: produtoEditando.categoria,
                                        tipo: produtoEditando.tipo,
                                    } : undefined}
                                    onSubmit={handleSubmitProduto}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {produtoVisualizando && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Informações do Produto/Serviço</h5>
                                <button type="button" className="btn-close" onClick={fecharVisualizacao}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Nome:</strong> {produtoVisualizando.nome}</p>
                                <p><strong>Tipo:</strong> {produtoVisualizando.tipo}</p>
                                <p><strong>Categoria:</strong> {produtoVisualizando.categoria}</p>
                                <p><strong>Preço:</strong> R$ {produtoVisualizando.preco.toFixed(2)}</p>
                                <p><strong>Descrição:</strong> {produtoVisualizando.descricao}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={fecharVisualizacao}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaProdutos;