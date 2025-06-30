import React, { useState, ChangeEvent, FormEvent } from "react";

type Props = {
    servico?: {
        nome: string;
        preco: number;
        descricao: string;
    };
    onSubmit: (servico: { nome: string; preco: number; descricao: string }) => void;
    onCancel: () => void;
};

const FormCadastroServico: React.FC<Props> = ({ servico, onSubmit, onCancel }) => {
    const [nome, setNome] = useState(servico?.nome || "");
    const [preco, setPreco] = useState(servico?.preco?.toString() || "");
    const [descricao, setDescricao] = useState(servico?.descricao || "");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "nome") setNome(value);
        else if (name === "preco") setPreco(value);
        else if (name === "descricao") setDescricao(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            nome,
            preco: parseFloat(preco),
            descricao,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Preço</label>
                <input
                    type="number"
                    className="form-control"
                    name="preco"
                    value={preco}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                    className="form-control"
                    name="descricao"
                    value={descricao}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default FormCadastroServico;