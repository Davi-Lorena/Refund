# 🚀 Refund API: O Núcleo Robusto de um Sistema de Reembolso

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge" style="margin: 5px;">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge" style="margin: 5px;">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge" style="margin: 5px;">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License Badge" style="margin: 5px;">
</div>

## ✨ Sobre o Projeto: Poder, Performance e Precisão

O projeto **Refund API** é o *back-end* que orquestra, com precisão e segurança, todas as operações de um sistema moderno de solicitação e gestão de reembolsos. Ele foi concebido para ser o cérebro da aplicação, garantindo rotas claras, validações rigorosas e uma persistência de dados eficiente, pronta para lidar com um alto volume de requisições.

### 🎯 Funcionalidades e Propósito

Esta API atende a duas personas principais — o **Colaborador** (que solicita o reembolso) e o **Administrador** (que gerencia e aprova as solicitações).

| Funcionalidade | Para que Serve | Como Funciona na Prática |
| :--- | :--- | :--- |
| **Autenticação e Autorização** | Garante que apenas usuários válidos acessem as rotas protegidas e com as permissões corretas (Colaborador/Admin). | Utiliza **JWT (JSON Web Tokens)** para gerar tokens após login, que são validados em cada requisição, controlando o acesso a rotas sensíveis. |
| **Gestão de Usuários** | Permite o cadastro e recuperação de usuários no sistema. | Rotas robustas para `POST /users` e `GET /users`, com tratamento de senhas seguro utilizando algoritmos de *hash*. |
| **Criação de Solicitações** | Permite que o colaborador envie um pedido de reembolso. | A rota `POST /refunds` recebe dados do pedido e, de forma crucial, lida com **upload de arquivos** (e.g., notas fiscais) para anexar a documentação necessária ao banco de dados. |
| **Controle de Status (Workflow)** | Mapeia o ciclo de vida da solicitação (Pendente, Aprovada, Rejeitada). | O administrador utiliza rotas como `PATCH /refunds/:id/status` para atualizar o estado do reembolso, acionando possivelmente notificações internas ou externas. |
| **Listagem e Filtragem** | Fornece visibilidade sobre todas as solicitações, com opções de busca avançada. | Rotas como `GET /refunds` permitem listar todos os pedidos, e parâmetros de *query* (e.g., `?status=pending`) permitem filtros, otimizando a experiência do administrador. |

-----

## 🛠️ O Arsenal de Tecnologia: Detalhes Turbinados

A arquitetura deste projeto foi cuidadosamente planejada, aplicando os conceitos de *Software Design* e a preferência por soluções modernas e tipadas, resultando em um código legível, manutenível e escalável.

### 🌐 Core Technologies & Framework

| Tecnologia | Função no Projeto | Detalhes Técnicos e Boas Práticas |
| :--- | :--- | :--- |
| **Node.js** | Ambiente de Execução do Servidor. | Escolhido pela sua performance *non-blocking* e por ser o padrão de mercado para APIs de alta velocidade. |
| **TypeScript (TS)** | Linguagem de Programação. | Fundamento para garantir **tipagem estática** em todo o código. Reduz a incidência de erros em tempo de execução e facilita a refatoração e a documentação interna. |
| **Express.js** (Assumido) | Framework Web para a API. | Utilizado para criar e gerenciar as rotas de forma **simples e poderosa**, sendo o padrão para a criação de APIs RESTful robustas. |

### 🗄️ Persistência de Dados e ORM

| Tecnologia | Função no Projeto | Detalhes Técnicos e Boas Práticas |
| :--- | :--- | :--- |
| **Prisma** | ORM (Object-Relational Mapper) de Próxima Geração. | O Prisma simplifica a interação com o banco de dados. Usado para definir o *Schema* de forma declarativa (`prisma/schema.prisma`), realizar **migrações** e garantir consultas tipadas e seguras, eliminando a escrita manual de SQL e prevenindo *SQL Injections*. |
| **Banco de Dados Relacional** | Armazenamento de Dados. | O projeto foi desenvolvido pensando na flexibilidade que o Prisma oferece, podendo ser conectado facilmente a PostgreSQL, MySQL, SQL Server, ou SQLite, garantindo a **integridade referencial** dos dados (Usuários, Solicitações, Anexos). |

### 🛡️ Ferramentas Essenciais e Bibliotecas

| Ferramenta/Biblioteca | Função no Projeto | Detalhes Técnicos e Boas Práticas |
| :--- | :--- | :--- |
| **JWT (JSON Web Tokens)** | Segurança da API. | Implementado para gerenciar sessões de usuários de forma *stateless*, garantindo que a API seja escalável sem depender de armazenamento de sessão no servidor. |
| **Bcrypt** | Criptografia de Senhas. | Essencial para armazenar senhas de usuários de forma segura, utilizando uma função de *hash* lenta e robusta, protegendo contra ataques de força bruta e dicionário. |
| **Multer** (Assumido pela pasta `tmp/uploads`) | Middleware para Upload de Arquivos. | Utilizado para processar dados `multipart/form-data`, permitindo o upload seguro e eficiente de notas fiscais e comprovantes para a pasta temporária do servidor. |
| **Insomnia** (Arquivo `requests_insomnia`) | Teste e Documentação de Rotas. | O arquivo de requisições exportado demonstra que a API foi **testada exaustivamente**, com rotas e cenários bem definidos, facilitando a integração de outros desenvolvedores. |

-----

## 🎓 Meu Mergulho e Destaque de Aprendizado (Rocketseat)

Este projeto foi um marco significativo na minha trajetória, pois consolidei e **apliquei integralmente** o conhecimento adquirido no módulo de **Node.js** da trilha Fullstack da **Rocketseat**.

Desenvolver o **Refund API** me permitiu:

1.  **Dominar a Arquitetura em Camadas:** Pude colocar em prática a separação de responsabilidades (Controllers, Services e Repositories), garantindo que a lógica de negócio fosse desacoplada das regras de requisição e persistência. Isso elevou a qualidade do código para um padrão profissional.
2.  **Abraçar o Poder do TypeScript:** O uso de interfaces e tipos complexos em conjunto com o Express e o Prisma se tornou natural, resultando em uma API com *menos bugs* e *mais clareza* sobre os dados que trafegam entre as camadas.
3.  **Implementar Segurança Robusta:** O aprendizado prático sobre Autenticação (JWT) e a forma correta de realizar o *hash* de senhas (Bcrypt) foram aplicados desde o primeiro *commit*, garantindo que a API fosse segura por design.
4.  **Gerenciar Banco de Dados com ORM:** A experiência com **Prisma** foi transformadora. Saí do básico e desenvolvi um entendimento profundo sobre Migrations, *Schema Design* e a escrita de consultas complexas de forma ORM-Friendly, maximizando a produtividade sem sacrificar a performance.

Este projeto é a prova prática de que a metodologia e os conhecimentos da Rocketseat foram internalizados e transformados em uma **solução de *backend* real, escalável e de alto padrão técnico.**

-----

## ⚙️ Como Rodar a Aplicação (Passo a Passo)

Para ter esta API em funcionamento no seu ambiente local, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter instalado:

  * [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
  * [Git](https://git-scm.com/)
  * Um sistema de banco de dados (e.g., PostgreSQL, ou use SQLite para testes rápidos).

### Configuração

1.  **Clone o Repositório:**

    ```bash
    git clone https://github.com/Davi-Lorena/Refund.git
    cd Refund
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    # ou
    yarn
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e defina suas variáveis (exemplo, a URL de conexão com o banco de dados):

    ```env
    # Exemplo com PostgreSQL
    DATABASE_URL="postgresql://user:password@localhost:5432/refund_db"
    JWT_SECRET="sua_chave_secreta_aqui"
    ```

4.  **Execute as Migrations do Banco de Dados:**
    O Prisma cuidará da criação das tabelas no seu banco.

    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o Servidor:**

    ```bash
    npm run dev
    ```

    A API estará rodando em `http://localhost:3333` (ou a porta configurada).

### Rotas Principais (Endpoints)

Você pode importar o arquivo `requests_insomnia` para ver todas as rotas detalhadas, mas aqui estão as principais:

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/users` | Cria um novo usuário. |
| `POST` | `/sessions` | Realiza o login e retorna um JWT. |
| `POST` | `/refunds` | Envia uma nova solicitação de reembolso (requer token e `multipart/form-data`). |
| `GET` | `/refunds` | Lista todas as solicitações (filtrável por status). |
| `PATCH` | `/refunds/:id` | Atualiza o status da solicitação (Admin). |

-----

## ✍️ Autor e Contato

Este projeto foi desenvolvido com paixão e foco em excelência técnica.

**Davi Lorena**

Github: (https://github.com/Davi-Lorena)

LinkedIn: (https://www.linkedin.com/in/davi-lorena)

-----

*Feito com 💜 e TypeScript*
