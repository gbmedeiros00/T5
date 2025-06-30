import React, { useState} from "react";
import type { ChangeEvent, FormEvent } from "react";

type Props = {
    produto?: {
        nome: string;
        preco: number;
        descricao: string;
        categoria: string;
        tipo: string;
    };
    onSubmit: (produto: { nome: string; preco: number; descricao: string; categoria: string; tipo: string }) => void;
    onCancel: () => void;
};

const FormCadastroProduto: React.FC<Props> = ({ produto, onSubmit, onCancel }) => {
    const [nome, setNome] = useState(produto?.nome || "");
    const [preco, setPreco] = useState(produto?.preco?.toString() || "");
    const [descricao, setDescricao] = useState(produto?.descricao || "");
    const [categoria, setCategoria] = useState(produto?.categoria || "");
    const [tipo, setTipo] = useState(produto?.tipo || "");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "nome") setNome(value);
        else if (name === "preco") setPreco(value);
        else if (name === "descricao") setDescricao(value);
        else if (name === "categoria") setCategoria(value);
        else if (name === "tipo") setTipo(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            nome,
            preco: parseFloat(preco),
            descricao,
            categoria,
            tipo,
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
            <div className="mb-3">
                <label className="form-label">Categoria</label>
                <select
                    className="form-select"
                    name="categoria"
                    value={categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Medicamentos">Medicamentos</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                    className="form-select"
                    name="tipo"
                    value={tipo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="Produto">Produto</option>
                    <option value="Serviço">Serviço</option>
                </select>
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

export default FormCadastroProduto;