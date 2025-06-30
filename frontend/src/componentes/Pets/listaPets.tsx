import { useState, useEffect } from "react";
import FormCadastroPets from "./formCadastroPets";

type Pet = {
    id: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    clienteId: number;
};

type Cliente = {
    id: number;
    nome: string;
};

type Props = {
    tema: string;
};

function ListaPets({ tema }: Props) {
    const [pets, setPets] = useState<Pet[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [petEditando, setPetEditando] = useState<Pet | null>(null);
    const [petVisualizando, setPetVisualizando] = useState<Pet | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/pets")
            .then(res => res.json())
            .then(data => setPets(data))
            .catch(() => setPets([]));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/clientes")
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(() => setClientes([]));
    }, []);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setPetEditando(null);
    };

    const abrirModalEditar = (pet: Pet) => {
        setModalAberto(true);
        setPetEditando(pet);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setPetEditando(null);
    };

    const excluirPet = (id: number) => {
        fetch(`http://localhost:3000/pets/${id}`, { method: "DELETE" })
            .then(() => setPets(prev => prev.filter(p => p.id !== id)));
    };

    const handleSubmitPet = (dados: { nome: string; tipo: string; raca: string; genero: string; clienteId: number }) => {
        if (petEditando) {
            fetch(`http://localhost:3000/pets/${petEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
                .then(res => res.json())
                .then(petAtualizado => {
                    setPets(prev =>
                        prev.map(p =>
                            p.id === petEditando.id
                                ? { ...p, ...petAtualizado }
                                : p
                        )
                    );
                    setModalAberto(false);
                    setPetEditando(null);
                });
        } else {
            fetch("http://localhost:3000/pets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
                .then(res => res.json())
                .then(novoPet => {
                    setPets(prev => [...prev, novoPet]);
                    setModalAberto(false);
                    setPetEditando(null);
                });
        }
    };

    const fecharVisualizacao = () => setPetVisualizando(null);

    const getClienteNome = (clienteId: number) => {
        const cliente = clientes.find(c => c.id === clienteId);
        return cliente ? cliente.nome : "Desconhecido";
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Pets</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Pet
                </button>
            </div>
            <ul className="list-group">
                {pets.map(pet => (
                    <li
                        key={pet.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={pet.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{pet.nome}</strong>
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-info me-2"
                                onClick={() => setPetVisualizando(pet)}
                            >
                                Mais informações
                            </button>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(pet)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirPet(pet.id)}
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
                                    {petEditando ? "Atualizar Pet" : "Novo Pet"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroPets
                                    pet={petEditando ? {
                                        nome: petEditando.nome,
                                        tipo: petEditando.tipo,
                                        raca: petEditando.raca,
                                        genero: petEditando.genero,
                                        cliente: petEditando.clienteId,
                                    } : undefined}
                                    onSubmit={handleSubmitPet}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {petVisualizando && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Informações do Pet</h5>
                                <button type="button" className="btn-close" onClick={fecharVisualizacao}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Nome:</strong> {petVisualizando.nome}</p>
                                <p><strong>Tipo:</strong> {petVisualizando.tipo}</p>
                                <p><strong>Raça:</strong> {petVisualizando.raca}</p>
                                <p><strong>Gênero:</strong> {petVisualizando.genero}</p>
                                <p><strong>Dono:</strong> {getClienteNome(petVisualizando.clienteId)}</p>
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

export default ListaPets;