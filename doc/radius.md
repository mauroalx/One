# 📡 Integração do FreeRADIUS 3 com o projeto One (ERP)

Este guia tem como objetivo ensinar desenvolvedores a instalar e configurar o FreeRADIUS 3 para autenticação utilizando o banco de dados PostgreSQL do projeto One.

---

## ✅ Pré-requisitos

- Linux (Ubuntu/Debian)
- PostgreSQL acessível com as tabelas já migradas via Alembic
- Acesso à pasta docs/ do projeto One (para ver este guia)
- Acesso ao IP/porta do banco PostgreSQL

---

## 🧱 Instalação do FreeRADIUS 3

sudo apt update
sudo apt install freeradius freeradius-postgresql -y

---

## 🗂️ Arquivos que você irá configurar

| Caminho                                     | Função                        |
|--------------------------------------------|-------------------------------|
| /etc/freeradius/3.0/mods-available/sql      | Configura o banco PostgreSQL  |
| /etc/freeradius/3.0/sites-enabled/default   | Ativa o módulo SQL nas seções |

⚠️ Não é necessário configurar o clients.conf pois o projeto One usa read_clients = yes com o NAS gerenciado diretamente no banco de dados.

---

## 🔧 1. Habilite o módulo SQL

sudo ln -s /etc/freeradius/3.0/mods-available/sql /etc/freeradius/3.0/mods-enabled/

---

## 🔧 2. Configure a conexão com o banco

Edite /etc/freeradius/3.0/mods-available/sql e ajuste os seguintes campos:

driver = "rlm_sql_postgresql"
dialect = "postgresql"

server = "localhost"         # ou IP do banco
port = 5432
login = "postgres"
password = "postgres"
radius_db = "one_db"

read_clients = yes

Garanta que o PostgreSQL esteja aceitando conexões externas, se necessário (editar postgresql.conf e pg_hba.conf).

---

## 🔧 3. Ative o SQL nas seções do FreeRADIUS

Edite o arquivo /etc/freeradius/3.0/sites-enabled/default  
e adicione sql nas seguintes seções:

Seção authorize { ... }

authorize {
    ...
    sql
    ...
}

Seção accounting { ... }

accounting {
    ...
    sql
    ...
}

Seção post-auth { ... }

post-auth {
    ...
    sql
    ...
}

---

## 🧪 Testando com radtest

Execute o seguinte comando (substitua o IP e segredo conforme seu NAS):

radtest cliente01 senha123 127.0.0.1 0 testing123

Esperado: Received Access-Accept

---

## 📌 Estrutura de tabelas esperada no banco

As seguintes tabelas são obrigatórias (já criadas via Alembic):

- radcheck — credenciais
- radreply — respostas (ex: atributos como Framed-IP-Address)
- radacct — contabilidade
- radpostauth — log de tentativas
- nas — lista de clientes autorizados (se read_clients = yes)

---

## 🛠️ Dica: Ative modo debug para facilitar testes

Durante o desenvolvimento, você pode rodar o FreeRADIUS em modo debug:

sudo freeradius -X

---

## 📁 Extras

Caso precise resetar o serviço:

sudo systemctl restart freeradius

Verificar status:

sudo systemctl status freeradius

---

## 🧠 Observações finais

- O banco de dados é gerenciado totalmente pelo ERP One.
- O FreeRADIUS é apenas um consumidor do banco.
- Você pode rodar o FreeRADIUS dentro de uma VM, diretamente no host ou até em container se souber redirecionar portas corretamente.

Dúvidas? Consulte o arquivo alembic/versions/ para ver as migrações de estrutura de tabelas, ou abra um PR com ajustes.
