import { useState, useEffect } from "react";
import FormCadastroCliente from "./formCadastroCliente";

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    rg: string;
    dataCadastro: string;
    email: string;
    telefone: string;
    genero: string;
};

type Props = {
    tema: string;
};

function ListaCliente({ tema }: Props) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
    const [clienteVisualizando, setClienteVisualizando] = useState<Cliente | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/clientes")
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(() => setClientes([]));
    }, []);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setClienteEditando(null);
    };

    const abrirModalEditar = (cliente: Cliente) => {
        setModalAberto(true);
        setClienteEditando(cliente);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setClienteEditando(null);
    };

    const excluirCliente = (id: number) => {
        fetch(`http://localhost:3000/clientes/${id}`, { method: "DELETE" })
            .then(() => setClientes(prev => prev.filter(c => c.id !== id)));
    };

    const handleSubmitCliente = (dados: { nome: string; nomeSocial: string; cpf: string; rg: string; dataCadastro: string; email: string; telefone: string; genero: string }) => {
        if (clienteEditando) {
            fetch(`http://localhost:3000/clientes/${clienteEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
                .then(res => res.json())
                .then(clienteAtualizado => {
                    setClientes(prev =>
                        prev.map(c =>
                            c.id === clienteEditando.id
                                ? { ...c, ...clienteAtualizado }
                                : c
                        )
                    );
                    setModalAberto(false);
                    setClienteEditando(null);
                });
        } else {
            fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
                .then(res => res.json())
                .then(novoCliente => {
                    setClientes(prev => [...prev, novoCliente]);
                    setModalAberto(false);
                    setClienteEditando(null);
                });
        }
    };

    const fecharVisualizacao = () => setClienteVisualizando(null);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Clientes</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Cliente
                </button>
            </div>
            <ul className="list-group">
                {clientes.map(cliente => (
                    <li
                        key={cliente.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={cliente.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{cliente.nome}</strong>
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-info me-2"
                                onClick={() => setClienteVisualizando(cliente)}
                            >
                                Ver informações
                            </button>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(cliente)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirCliente(cliente.id)}
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
                                    {clienteEditando ? "Atualizar Cliente" : "Novo Cliente"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroCliente
                                    cliente={clienteEditando ? {
                                        nome: clienteEditando.nome,
                                        nomeSocial: clienteEditando.nomeSocial,
                                        cpf: clienteEditando.cpf,
                                        rg: clienteEditando.rg,
                                        dataCadastro: clienteEditando.dataCadastro,
                                        email: clienteEditando.email,
                                        telefone: clienteEditando.telefone,
                                        genero: clienteEditando.genero
                                    } : undefined}
                                    onSubmit={handleSubmitCliente}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {clienteVisualizando && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Informações do Cliente</h5>
                                <button type="button" className="btn-close" onClick={fecharVisualizacao}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Nome:</strong> {clienteVisualizando.nome}</p>
                                <p><strong>Nome Social:</strong> {clienteVisualizando.nomeSocial}</p>
                                <p><strong>CPF:</strong> {clienteVisualizando.cpf}</p>
                                <p><strong>RG:</strong> {clienteVisualizando.rg}</p>
                                <p>
                                    <strong>Data de Cadastro:</strong>{" "}
                                    {new Date(clienteVisualizando.dataCadastro).toLocaleDateString("pt-BR")}
                                </p>
                                <p><strong>Email:</strong> {clienteVisualizando.email}</p>
                                <p><strong>Telefone:</strong> {clienteVisualizando.telefone}</p>
                                <p><strong>Gênero:</strong> {clienteVisualizando.genero}</p>
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

export default ListaCliente;