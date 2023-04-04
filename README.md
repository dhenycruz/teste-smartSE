# Teste Smart SE - Sisteam de Gestão de Frotas

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
      
   - Iniciando backend
    - Com banco de dados funcionando e com os arquivos .env criados e com seus conteúdos corretos, vamos iniciar o o backend
     - Na pasta principal rode o comando `npm run start:backend`, esse comando já vai rodar as migrations, as seed do prisma e inciar a aplicação
          `npm run start:backend`
 
  - Iniciando o frontend
    - Para rodar o nosso frontend segue o mesmo esquema do backend, precisamos rodar apenas o comando:
      `npm run start:frontend`
      
      -CPF E senha para poder logar na aplicação:
        CPF: 04223688146
        SENHA: 123df
  
  Assim a nossa aplicação estará rodando localmente

## 📦 Desenvolvimento
O desenvolvimento dessa aplicação foi utilizado a biblioteca Eslint para ter um padrão no código e também foi utilizado TypeScript, tanto para o backend, quanto para o frontend. a nossa Api foi desenvolvida utilizando classes e com a arquitetura MSC e alguns midlewares separado para realizar a verificação de dados recebidos da api ou do token, todos as rotas necessitam de autorização via token, menos a rota de login.
O Frontend foi utilizado React.js estilizado com Mui design, utilizamos hooks, contextAPI, axios para consumir a api, react-hook-forms para otimizar os formulários. 

## 🛠️ Construído com

- BACKEND
  - EXPRESS
  - PRISMA
  - BRCRYPTJS
  - DOTENV
  - JWTWEBTOKEN
  - POSTGRESQL
  - TYPESCRIPT
  - ESLINT

- FRONTEND
  - REAC.JS
  - AXIOS
  - MUI DESIGN
  - REACR-HOOK-FORMS
  - TYPESCRIPT
  - ESLINT
  
## Autor
---

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/26901028?s=400&u=d99619f0fcc7ff7d8407ff05a0e90a0149f959ee&v=4" width="100px;" alt=""/>
 
 Dheniarley Cruz 🚀

Desenvolvedor Full Stack 


Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Dheniarley-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/dheniarley/)](https://www.linkedin.com/in/dheniarley//) 
[![Gmail Badge](https://img.shields.io/badge/-dheniarley.ds@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:dheniarley.ds@gmail.com)](mailto:dheniarley.ds@gmail.com)
