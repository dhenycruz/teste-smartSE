# teste Smart SE - Sisteam de Gestão de Frotas

## Objetivo do Teste:

Criar um projeto modelo de API de um sistema de cadastro de veículos e abastecimentos, com as seguintes informações:

Sistema de login com autenticação via CPF e senha;
Cadastro de usuários - CRUD - com cpf e senha;
Cadastro de veículos - CRUD -  com descrição do veículo (placa, renavam, cor, potência, modelo, marca etc);
Cadastro de abastecimentos de veículos - CRUD -  com relacionamento do veículo, quantidade abastecida, tipo de combustível e valor;
Listagem de veículos e abastecimentos em Datagrid - permitindo selecionar/editar/remover na própria grid.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

- Nodejs, docker, docker-compose e git instalados na sua máquina.

### 🔧 Instalação

  - Com o terminal aberto, vamos clonar o repositório
    `git clone git@github.com:dhenycruz/teste-smartSE.git`
    
  - Instalando as dependências
    - Depois de ter clonado o repositório entra na pasta do projeto e instale as dependências tanto para o backend quanto o frontend da pasta principal rodando o comando:
        `npm run install:apps`
    
   - Banco de Dados Postgree
      - O banco de dados da aplicação está rodando em docker com o docker-compose, para subir o banco de dados usamos o comando:
        `npm run compose:up`
      - Para para o banco de dados e para o nosso container no docker, rodamos o comando:
        `npm run compose:down`
        
    - Arquivo .env no backend
      - Para a nossa aplicação rodar precisamos criar o arquivo .env ou alterar o arquivo .env-example para .env;

## 📦 Desenvolvimento
