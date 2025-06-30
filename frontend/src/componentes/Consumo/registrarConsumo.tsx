import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Cliente = {
    id: number;
    nome: string;
};

type Pet = {
    id: number;
    nome: string;
    clienteId: number;
};

type ProdutoOuServico = {
    id: number;
    nome: string;
    tipo: string;
};

function RegistrarConsumo() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [itens, setItens] = useState<ProdutoOuServico[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState("");
    const [petSelecionado, setPetSelecionado] = useState("");
    const [itemSelecionado, setItemSelecionado] = useState("");
    const [quantidade, setQuantidade] = useState("1");

    useEffect(() => {
        fetch("http://localhost:3000/clientes")
            .then(res => res.json())
            .then(setClientes);

        fetch("http://localhost:3000/pets")
            .then(res => res.json())
            .then(setPets);

        fetch("http://localhost:3000/produtos")
            .then(res => res.json())
            .then(setItens);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "clienteSelecionado") {
            setClienteSelecionado(value);
            setPetSelecionado("");
        } else if (name === "petSelecionado") {
            setPetSelecionado(value);
        } else if (name === "itemSelecionado") {
            setItemSelecionado(value);
        } else if (name === "quantidade") {
            setQuantidade(value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const item = itens.find(i => i.id === Number(itemSelecionado));
        if (!item) {
            alert("Selecione um produto ou serviço válido.");
            return;
        }

        const consumo: any = {
            clienteId: Number(clienteSelecionado),
            petId: Number(petSelecionado),
            quantidade: Number(quantidade),
        };
        if (item.tipo === "Produto") {
            consumo.produtoId = item.id;
        } else if (item.tipo === "Serviço") {
            consumo.produtoId = item.id; 
        }

        const resp = await fetch("http://localhost:3000/consumos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(consumo),
        });

        if (resp.ok) {
            alert("Consumo registrado com sucesso!");
            setClienteSelecionado("");
            setPetSelecionado("");
            setItemSelecionado("");
            setQuantidade("1");
        } else {
            const erro = await resp.json();
            alert("Erro ao registrar consumo: " + (erro.error || "Erro desconhecido"));
        }
    };

    const petsFiltrados = clienteSelecionado
        ? pets.filter(p => p.clienteId === Number(clienteSelecionado))
        : [];

    return (
        <div className="container-fluid mt-4 px-0" style={{ maxWidth: "100vw" }}>
            <h2>Registrar Consumo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select
                        className="form-select"
                        name="clienteSelecionado"
                        value={clienteSelecionado}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Pet</label>
                    <select
                        className="form-select"
                        name="petSelecionado"
                        value={petSelecionado}
                        onChange={handleChange}
                        required
                        disabled={!clienteSelecionado}
                    >
                        <option value="">Selecione o pet</option>
                        {petsFiltrados.map(pet => (
                            <option key={pet.id} value={pet.id}>
                                {pet.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Produto ou Serviço</label>
                    <select
                        className="form-select"
                        name="itemSelecionado"
                        value={itemSelecionado}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        {itens.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.nome} ({item.tipo})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantidade</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantidade"
                        value={quantidade}
                        min="1"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Registrar Consumo
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarConsumo;