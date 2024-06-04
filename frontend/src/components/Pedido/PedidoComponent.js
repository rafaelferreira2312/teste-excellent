import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PedidoComponent() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ cliente_id: '', produtos: [] });
  const [produtoForm, setProdutoForm] = useState({ produto_id: '', quantidade: '' });

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
    fetchProdutos();
  }, []);

  const fetchPedidos = async () => {
    const response = await axios.get('/api/pedidos');
    setPedidos(response.data);
  };

  const fetchClientes = async () => {
    const response = await axios.get('/api/clientes');
    setClientes(response.data);
  };

  const fetchProdutos = async () => {
    const response = await axios.get('/api/produtos');
    setProdutos(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleProdutoChange = (e) => {
    const { name, value } = e.target;
    setProdutoForm({ ...produtoForm, [name]: value });
  };

  const handleAddProduto = () => {
    setForm({ ...form, produtos: [...form.produtos, produtoForm] });
    setProdutoForm({ produto_id: '', quantidade: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/pedidos', form);
    fetchPedidos();
  };

  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>{pedido.cliente_id}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <select name="cliente_id" value={form.cliente_id} onChange={handleChange}>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>{cliente.razao_social}</option>
          ))}
        </select>
        <div>
          <select name="produto_id" value={produtoForm.produto_id} onChange={handleProdutoChange}>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.descricao}</option>
            ))}
          </select>
          <input type="text" name="quantidade" value={produtoForm.quantidade} onChange={handleProdutoChange} placeholder="Quantidade" />
          <button type="button" onClick={handleAddProduto}>Adicionar Produto</button>
        </div>
        <button type="submit">Cadastrar Pedido</button>
      </form>
    </div>
  );
}

export default PedidoComponent;
