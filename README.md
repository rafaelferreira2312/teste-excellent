# Especificações do Teste da Excellent 
## Introdução

Neste projeto, desenvolveremos um sistema de gerenciamento para uma empresa, incluindo funcionalidades para clientes pessoa jurídica, produtos e pedidos. O sistema será dividido em dois componentes principais: backend e frontend. Utilizaremos as seguintes tecnologias e ferramentas:

    >Docker para gerenciamento de contêineres
    >Banco de dados MySQL e interface de administração PHPMyAdmin
    >Laravel 8 como framework PHP para o backend
    >React 18 com Bootstrap para o frontend

## Passo 1: Configuração do Ambiente
### 1.1 Configuração do Docker

    > Criar um arquivo docker-compose.yml para configurar os serviços Docker, incluindo o backend, frontend, banco de dados e PHPMyAdmin.

### 1.2 Configuração do Backend

    > Criar um projeto Laravel 8 e configurar o ambiente Docker para ele.
    > Configurar a conexão com o banco de dados MySQL.
    > Implementar endpoints para as funcionalidades de clientes pessoa jurídica, produtos e pedidos.

### 1.3 Configuração do Frontend

    > Configurar um projeto React 17 com Bootstrap.
    > Configurar o ambiente Docker para o frontend.
    > Implementar as interfaces de usuário para as funcionalidades de clientes, produtos e pedidos.

## Passo 2: Desenvolvimento das Funcionalidades
### 2.1 Funcionalidades do Cliente Pessoa Jurídica
### Tela de Cadastro de Cliente (Tela 1)

    > Implementar uma página para exibir todos os clientes cadastrados.
    > Incluir um botão para acessar a tela de cadastro de clientes.
    > Campos: ID (gerado automaticamente), Razão Social, CNPJ, E-mail.
    > Implementar a integração com a API pública https://publica.cnpj.ws para preencher os campos automaticamente ao informar o CNPJ.

## 2.2 Funcionalidades de Produto
### Tela de Listagem de Produtos (Tela 2)

    > Implementar uma página para listar todos os produtos cadastrados.
    > Incluir um botão para acessar a tela de cadastro de produtos.
    > Para cada produto na lista, incluir botões de editar e excluir.

### Tela de Cadastro de Produto (Tela 3)

    > Implementar uma página para cadastrar novos produtos.
    > Campos: ID (gerado automaticamente), Descrição, Valor de Venda, Estoque, Imagens (upload de uma ou mais imagens).

### Tela de Edição de Produto (Tela 4)

    > Implementar uma página para editar as informações de um produto existente.

### Tela de Exclusão de Produto (Tela 5)

    > Implementar uma modal ou Sweetalert para confirmar a exclusão de um produto.

## 2.3 Funcionalidades de Pedido
### Tela de Listagem de Pedidos (Tela 6)

    > Implementar uma página para listar todos os pedidos realizados.
    > Incluir um botão para criar um novo pedido.
    > Para cada pedido na lista, incluir um botão para excluí-lo.

### Tela de Novo Pedido (Tela 7)

    > Implementar uma página para criar um novo pedido.
    > Permitir adicionar um ou mais produtos ao pedido, escolhendo a quantidade de cada produto.
    > Vincular o cliente ao pedido.

### Tela de Exclusão de Pedido (Tela 8)

    > Implementar uma modal ou Sweetalert para confirmar a exclusão de um pedido.

### Passo 3: Testes e Deploy

    > Realizar testes unitários e de integração para garantir o funcionamento correto das funcionalidades.
    > Realizar o deploy do sistema em um ambiente de produção.

## Conclusão

Este projeto seguirá uma abordagem de desenvolvimento ágil, dividindo-o em etapas específicas e priorizando as funcionalidades principais. Ao final, teremos um sistema robusto e eficiente para gerenciar clientes, produtos e pedidos de uma empresa.

## Estrutura do Banco de Dados
### Tabelas

    >Clientes
        .id (int, primary key, auto increment)
        .razao_social (varchar)
        .cnpj (varchar)
        .email (varchar)

    >Produtos
        .id (int, primary key, auto increment)
        .descricao (varchar)
        .valor_venda (decimal)
        .estoque (int)
        .imagens (json)

    >Pedidos
        .id (int, primary key, auto increment)
        .cliente_id (int, foreign key)
        .data_criacao (datetime)

    >Pedido_Produtos
        .id (int, primary key, auto increment)
        .pedido_id (int, foreign key)
        .produto_id (int, foreign key)
        .quantidade (int)
        
## Configuração do Docker
### Dockerfile (Backend)
```
# Dockerfile
FROM php:8.0-fpm
WORKDIR /var/www
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mbstring zip pdo_mysql
COPY . .
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install
CMD ["php-fpm"]
EXPOSE 8000
```

## Dockerfile (Frontend)
```
# Dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
```

## docker-compose.yml
```
version: '3.8'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend:/var/www
    ports:
      - "9000:9000"
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"
    networks:
      - app-network

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Implementação
### Backend
### Estrutura de Pastas do Laravel
```
backend/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── Dockerfile
├── composer.json
└── ...
```
## Configuração do Laravel (Configuração Inicial)
```
cd backend
composer create-project --prefer-dist laravel/laravel
```

## Criar Modelos e Migrações
```
php artisan make:model Cliente -m
php artisan make:model Produto -m
php artisan make:model Pedido -m
php artisan make:model PedidoProduto -m
```

## Definir Migrações
### Cliente Migration
```
public function up()
{
    Schema::create('clientes', function (Blueprint $table) {
        $table->id();
        $table->string('razao_social');
        $table->string('cnpj')->unique();
        $table->string('email')->unique();
        $table->timestamps();
    });
}
```

### Produto Migration
```
public function up()
{
    Schema::create('produtos', function (Blueprint $table) {
        $table->id();
        $table->string('descricao');
        $table->decimal('valor_venda', 10, 2);
        $table->integer('estoque');
        $table->json('imagens');
        $table->timestamps();
    });
}

```

### Pedido Migration
```
public function up()
{
    Schema::create('pedidos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('cliente_id')->constrained('clientes');
        $table->timestamp('data_criacao');
        $table->timestamps();
    });
}

```

### PedidoProduto Migration
```
public function up()
{
    Schema::create('pedido_produtos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('pedido_id')->constrained('pedidos');
        $table->foreignId('produto_id')->constrained('produtos');
        $table->integer('quantidade');
        $table->timestamps();
    });
}

```

### Criar Controladores
```
php artisan make:controller ClienteController
php artisan make:controller ProdutoController
php artisan make:controller PedidoController

```

### Definir Rotas
### routes/api.php
```
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\PedidoController;

Route::apiResource('clientes', ClienteController::class);
Route::apiResource('produtos', ProdutoController::class);
Route::apiResource('pedidos', PedidoController::class);

```

### Implementar Controladores
### ClienteController
```
namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ClienteController extends Controller
{
    public function index()
    {
        return Cliente::all();
    }

    public function store(Request $request)
    {
        $cliente = Cliente::create($request->all());
        return response()->json($cliente, 201);
    }

    public function show($id)
    {
        return Cliente::find($id);
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->update($request->all());
        return response()->json($cliente, 200);
    }

    public function destroy($id)
    {
        Cliente::destroy($id);
        return response()->json(null, 204);
    }

    public function consultaCNPJ($cnpj)
    {
        $response = Http::get("https://publica.cnpj.ws/cnpj/{$cnpj}");
        return $response->json();
    }
}

```

### ProdutoController
```
namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index()
    {
        return Produto::all();
    }

    public function store(Request $request)
    {
        $produto = Produto::create($request->all());
        return response()->json($produto, 201);
    }

    public function show($id)
    {
        return Produto::find($id);
    }

    public function update(Request $request, $id)
    {
        $produto = Produto::findOrFail($id);
        $produto->update($request->all());
        return response()->json($produto, 200);
    }

    public function destroy($id)
    {
        Produto::destroy($id);
        return response()->json(null, 204);
    }
}

```

### PedidoController
```
namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\PedidoProduto;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index()
    {
        return Pedido::all();
    }

    public function store(Request $request)
    {
        $pedido = Pedido::create($request->all());
        foreach ($request->produtos as $produto) {
            PedidoProduto::create([
                'pedido_id' => $pedido->id,
                'produto_id' => $produto['id'],
                'quantidade' => $produto['quantidade'],
            ]);
        }
        return response()->json($pedido, 201);
    }

    public function show($id)
    {
        return Pedido::with('produtos')->find($id);
    }

    public function update(Request $request, $id)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->update($request->all());
        return response()->json($pedido, 200);
    }

    public function destroy($id)
    {
        Pedido::destroy($id);
        return response()->json(null, 204);
    }
}

```

## Frontend
### Estrutura de Pastas do React
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Cliente/
│   │   ├── Produto/
│   │   ├── Pedido/
│   ├── App.js
│   ├── index.js
├── Dockerfile
├── package.json
└── ...

```
### Estrutura de Pastas

    >Crie a estrutura inicial do projeto React.
    >Adicione a configuração do Docker para o frontend.

### Passos:

    >Criar o projeto React:

```
npx create-react-app frontend
cd frontend
```

### Instalar Bootstrap:

```
npm install bootstrap
```
### Configurar o Docker para o frontend:
    > Crie um arquivo Dockerfile dentro da pasta frontend com o seguinte conteúdo:
        ```
        # Dockerfile
        FROM node:14
        WORKDIR /app
        COPY package*.json ./
        RUN npm install
        COPY . .
        CMD ["npm", "start"]
        EXPOSE 3000
        
        ```
### Adicionar Bootstrap ao projeto React:
    >No arquivo src/index.js, importe o Bootstrap:

### javascript
```
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Iniciar os containers Docker:

```
docker compose up -d
```

### Criar Componentes React
### ClienteComponent
```
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

```

### ProdutoComponent
```
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

```

### ProdutoComponent
```
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

```

### PedidoComponent
```
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

```
### Passos para Construir e Executar

    >Construa os containers:

```
docker compose build
```

### Suba os containers:

```
docker compose up
```
