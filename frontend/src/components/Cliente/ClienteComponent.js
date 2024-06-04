import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClienteComponent() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ razao_social: '', cnpj: '', email: '' });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const response = await axios.get('/api/clientes');
    setClientes(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/clientes', form);
    fetchClientes();
  };

  const handleConsultaCNPJ = async () => {
    const response = await axios.get(`/api/clientes/consulta/${form.cnpj}`);
    setForm({ ...form, razao_social: response.data.nome, email: response.data.email });
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.razao_social}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="razao_social" value={form.razao_social} onChange={handleChange} placeholder="Razão Social" />
        <input type="text" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" />
        <button type="button" onClick={handleConsultaCNPJ}>Consultar CNPJ</button>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ClienteComponent;
