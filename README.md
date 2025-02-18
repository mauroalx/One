# One
One é um ERP gratuito, simples e fácil de utilizar, criado especialmente para pequenos provedores.

## 📌 Sobre o Projeto
Este projeto é um ERP gratuito e open-source voltado para provedores de internet (ISPs). O objetivo é fornecer uma solução acessível para pequenos provedores que necessitam de um sistema completo para gestão.

## 🚀 Tecnologias Utilizadas
### **Frontend:**
- ReactJS + NextJS
- TailAdmin Next.js - Free

### **Backend:**
- Python (FastAPI)
- PostgreSQL
- SQLAlchemy
- Alembic
- Autenticação via JWT/OAuth2

### **Infraestrutura:**
- Docker & Docker Compose

## 🏗 Estrutura do Projeto
```bash
/one
│── backend/
│   ├── app/
│   │   ├── api/  # Rotas da API
│   │   ├── models/  # Modelos do banco de dados
│   │   ├── services/  # Regras de negócio
│   │   ├── db/  # Configuração e migrations
│   │   ├── main.py  # Ponto de entrada
│   ├── tests/  # Testes unitários
│   ├── requirements.txt  # Dependências
│   ├── Dockerfile
│
│── frontend/
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/  # Páginas Next.js
│   │   ├── hooks/  # Hooks customizados
│   │   ├── services/  # Comunicação com API
│   ├── public/
│   ├── tests/  # Testes unitários
│   ├── Dockerfile
│   ├── package.json
│
│── infra/
│   ├── docker-compose.yml
│   ├── database/
│
│── README.md
```

## ⚡ Como Rodar o Projeto
### **Pré-requisitos**
- Docker e Docker Compose instalados
- Node.js e npm/yarn
- Python 3.10+

### **Passos**
1. Clone o repositório:
   ```bash
   git clone https://github.com/developerdevice/One
   cd One
   ```
2. Configure as variáveis de ambiente:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
3. Suba os serviços com Docker:
   ```bash
   docker-compose up --build
   ```
4. O frontend estará disponível em `http://localhost:3000` e a API em `http://localhost:8000`

## 🔗 Contribuindo
1. Faça um fork do projeto
2. Crie uma branch com sua feature (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Adicionando nova feature'`)
4. Envie para o repositório (`git push origin minha-feature`)
5. Abra um Pull Request 🚀

## 📜 Licença
Este projeto é licenciado sob a licença MIT. Sinta-se livre para usar e contribuir!

