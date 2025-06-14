# Guia de Contribuição para o Projeto One

Para colaboradores diretos, com permissão de escrita

## Requisitos
- Python 3.10+
- Docker e Docker Compose
- Node.js 18.3+ e NPM (para o frontend)

## Instruções

### Clonar o repositório

```bash
git clone https://github.com/mauroalx/One.git
cd One
```

### Criar um branch a partir do `dev`

Antes de começar uma nova funcionalidade ou alteração, vá para o branch `dev` e crie um **branch específico** para o que você quer trabalhar:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/nome-da-funcionalidade
```

Alguns exemplos:
- `feature/backend-business-plans`
- `feature/frontend-user-profile`
- `bugfix/correcao-no-carrinho`

Isso evita que você mande um `PR` diretamente para o `main`.

### Rodar o Docker Compose

Depois que você já estiver no seu branch:

```bash
cd backend
docker-compose up --build
```

### Instalar as dependências do frontend

```bash
cd frontend
npm install
```

Isso sobe o ambiente de desenvolvimento junto com o banco de dados ou quaisquer outros serviços que você precisar.

---

Se tiver quaisquer dúvidas, abra uma _issue_ ou mande uma mensagem para a equipe! 🚀
