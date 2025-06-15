# 📡 Integração do FreeRADIUS com o Projeto One

Este documento descreve como funciona a estrutura de autenticação do FreeRADIUS integrada ao ERP **One**, incluindo o relacionamento entre usuários, grupos (planos), atributos e os fluxos envolvidos.

---

## 🧱 Estrutura do Banco

O FreeRADIUS utiliza um conjunto específico de tabelas que devem existir no banco PostgreSQL. Estas tabelas estão mapeadas via SQLAlchemy e Alembic no One.

### Tabelas já existentes no projeto:

| Tabela           | Função                                                                 |
|------------------|------------------------------------------------------------------------|
| `radcheck`       | Armazena atributos de autenticação por **usuário** (ex: senha, IP fixo)|
| `radreply`       | Armazena atributos de resposta por **usuário** (ex: DNS, rota)         |
| `radacct`        | Log de conexões e consumo de rede                                      |
| `radpostauth`    | Log de tentativas de autenticação (sucesso ou falha)                   |
| `nas`            | Lista de clientes autorizados (ex: Mikrotik, Juniper)                  |
| `radusergroup`   | Liga usuários a **grupos (planos)**                                    |
| `radgroupcheck`  | Define atributos de controle por grupo (download/upload, simultâneos)  |
| `radgroupreply`  | Define atributos de resposta por grupo (DNS, IP pool, rota)            |

---

## 🔁 Fluxo de Autenticação

1. O cliente (ex: Mikrotik) envia uma requisição RADIUS com usuário e senha.
2. O FreeRADIUS busca o usuário na tabela `radcheck`:
   - Se encontrar o usuário e os atributos de verificação estiverem corretos (ex: senha), continua.
3. Busca atributos de resposta em:
   - `radreply` (usuário específico)
   - `radusergroup` → `radgroupcheck` / `radgroupreply` (grupo/plano)
4. Se tudo estiver correto, responde com Access-Accept e os atributos apropriados.

---

## 📦 Fluxo de Criação de Planos (Grupos)

1. O desenvolvedor ou administrador **cria um plano** no ERP (tabela `plans`).
2. O backend deve:
   - Criar um **grupo com o nome do plano**.
   - Inserir os atributos de controle (velocidade, simultâneos) em `radgroupcheck`.
   - Inserir os atributos de resposta (DNS, rota, etc) em `radgroupreply`.

3. Para associar um usuário ao plano:
   - Inserir uma linha em `radusergroup` com `username` e `groupname`.

---

## 📌 Exemplos de uso

### Usuário com IP fixo

```sql
INSERT INTO radcheck (username, attribute, op, value)
VALUES ('cliente01', 'Cleartext-Password', ':=', 'senha123');

INSERT INTO radreply (username, attribute, op, value)
VALUES ('cliente01', 'Framed-IP-Address', '=', '192.168.1.100');
