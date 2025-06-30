import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Props = {
    cliente?: {
        nome: string;
        nomeSocial: string;
        cpf: string;
        rg: string;
        dataCadastro: string;
        email: string;
        telefone: string;
        genero: string;
    };
    onSubmit: (cliente: { nome: string; nomeSocial: string; cpf: string; rg: string; dataCadastro: string; email: string; telefone: string; genero: string }) => void;
    onCancel: () => void;
};

const FormCadastroCliente: React.FC<Props> = ({ cliente, onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        nome: cliente?.nome || "",
        nomeSocial: cliente?.nomeSocial || "",
        cpf: cliente?.cpf || "",
        rg: cliente?.rg || "",
        dataCadastro: cliente?.dataCadastro || "",
        email: cliente?.email || "",
        telefone: cliente?.telefone || "",
        genero: cliente?.genero || "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dados = {
            ...form,
            dataCadastro: form.dataCadastro ? new Date(form.dataCadastro).toISOString() : "",
        };
        onSubmit(dados);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nome Social</label>
                <input
                    type="text"
                    className="form-control"
                    name="nomeSocial"
                    value={form.nomeSocial}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Gênero</label>
                <select
                    className="form-control"
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">CPF</label>
                <input
                    type="text"
                    className="form-control"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">RG</label>
                <input
                    type="text"
                    className="form-control"
                    name="rg"
                    value={form.rg}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Data de Cadastro</label>
                <input
                    type="date"
                    className="form-control"
                    name="dataCadastro"
                    value={form.dataCadastro}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="exemplo@email.com"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input
                    type="text"
                    className="form-control"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                    placeholder="(99) 99999-9999"
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

export default FormCadastroCliente;