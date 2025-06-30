import { useState } from "react";
import FormCadastroServico from "./formCadastroServico";

type Servico = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
};

type Props = {
    tema: string;
};

const ListaServicos: React.FC<Props> = ({ tema }) => {
    const [servicos, setServicos] = useState<Servico[]>([
        {
            id: 1,
            nome: "Banho",
            preco: 50.0,
            descricao: "Banho completo para pets de todos os portes.",
        },
        {
            id: 2,
            nome: "Tosa",
            preco: 70.0,
            descricao: "Tosa higiênica e estilizada para cães e gatos.",
        },
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setServicoEditando(null);
    };

    const abrirModalEditar = (servico: Servico) => {
        setModalAberto(true);
        setServicoEditando(servico);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setServicoEditando(null);
    };

    const excluirServico = (id: number) => {
        setServicos(prev => prev.filter(s => s.id !== id));
    };

    const handleSubmitServico = (dados: { nome: string; preco: number; descricao: string }) => {
        if (servicoEditando) {
            setServicos(prev =>
                prev.map(s =>
                    s.id === servicoEditando.id
                        ? { ...s, ...dados }
                        : s
                )
            );
        } else {
            const novoServico: Servico = {
                id: servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1,
                nome: dados.nome,
                preco: dados.preco,
                descricao: dados.descricao,
            };
            setServicos(prev => [...prev, novoServico]);
        }
        setModalAberto(false);
        setServicoEditando(null);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Serviços</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Serviço
                </button>
            </div>
            <ul className="list-group">
                {servicos.map(servico => (
                    <li
                        key={servico.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={servico.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{servico.nome}</strong> - R$ {servico.preco.toFixed(2)}
                            <br />
                            <small>{servico.descricao}</small>
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(servico)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirServico(servico.id)}
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
                                    {servicoEditando ? "Atualizar Serviço" : "Novo Serviço"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroServico
                                    servico={servicoEditando ? {
                                        nome: servicoEditando.nome,
                                        preco: servicoEditando.preco,
                                        descricao: servicoEditando.descricao,
                                    } : undefined}
                                    onSubmit={handleSubmitServico}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaServicos;