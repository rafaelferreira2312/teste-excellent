import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProdutoComponent() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ descricao: '', valor_venda: '', estoque: '', imagens: [] });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const response = await axios.get('/api/produtos');
    setProdutos(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagens: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('descricao', form.descricao);
    formData.append('valor_venda', form.valor_venda);
    formData.append('estoque', form.estoque);
    Array.from(form.imagens).forEach((file, index) => {
      formData.append(`imagens[${index}]`, file);
    });
    await axios.post('/api/produtos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    fetchProdutos();
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>{produto.descricao}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
        <input type="text" name="valor_venda" value={form.valor_venda} onChange={handleChange} placeholder="Valor de Venda" />
        <input type="text" name="estoque" value={form.estoque} onChange={handleChange} placeholder="Estoque" />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ProdutoComponent;
