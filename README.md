# Especificações do Teste da Excellent 
## Introdução

Neste projeto, desenvolveremos um sistema de gerenciamento para uma empresa, incluindo funcionalidades para clientes pessoa jurídica, produtos e pedidos. O sistema será dividido em dois componentes principais: backend e frontend. Utilizaremos as seguintes tecnologias e ferramentas:

    > Docker para gerenciamento de contêineres
    > Banco de dados MySQL e interface de administração PHPMyAdmin
    > Laravel 8 como framework PHP para o backend
    > React 18 com Bootstrap para o frontend

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
